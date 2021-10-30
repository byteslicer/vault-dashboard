import { ref, Ref, watch } from "vue";
import { nanoid } from 'nanoid'
import { del } from "@vueuse/core/node_modules/vue-demi";

let api: Promise<KrakenApi> | null = null;

class KrakenApi {
    socket: WebSocket;
    channelMap: Record<string, number>;
    channelListener: Record<number, Record<string, (message: any) => void>>;
    reqCnt: number;
    reqPromiseMap: Record<number, any>;

    constructor(socket: WebSocket) {
        this.socket = socket;
        this.channelMap = {};
        this.channelListener = {};
        this.reqPromiseMap = {};
        this.reqCnt = 0;

        // Connection opened
        this.handleOpen()

        // Listen for messages
        this.socket.addEventListener('message', this.handleMessage.bind(this))
    }

    static connect(): Promise<KrakenApi> {
        return new Promise((resolve, reject) => {
            const socket = new WebSocket('wss://ws.kraken.com/');
            socket.addEventListener('open', () => resolve(new KrakenApi(socket)));
        })
    }

    private handleOpen() {
        //this.socket.send('{"event":"subscribe", "reqid": 1337, "subscription":{"name":"ticker"}, "pair":["BTC/USD"]}');
    }

    private handleMessage(event: MessageEvent<any>) {
        const message = JSON.parse(event.data);

        if ('reqid' in message) {
            const handler = this.reqPromiseMap[message.reqid];
            handler && handler.resolve(message);
        }
        if (Array.isArray(message)) {
            const handlers = this.channelListener[message[0]] || [];
            Object.values(handlers).forEach(handler => handler(message));
        }

        //console.log('Message from server ', message);
    }

    private request(payload: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const reqid = this.reqCnt++;

            const message = { 
                ...payload,
                reqid
            }
            this.reqPromiseMap[reqid] = { resolve, reject };
            this.socket.send(JSON.stringify(message));
        })
    }

    private addChannelListener(channelId: number, listener: (message: any) => void): string {
        const listenerId = nanoid();
        const listeners = this.channelListener[channelId] || {};
        listeners[listenerId] = listener;
        this.channelListener[channelId] = listeners;

        return listenerId;
    }

    private removeChannelListener(channelId: number, listenerId: string) {
        const listeners = this.channelListener[channelId];
        delete listeners[listenerId];
    }

    async subscribe(symbol: string, listener: (message: any) => void): Promise<() => void> {
        const response = await this.request({
            event:"subscribe", 
            subscription: {"name":"ticker"},
            pair:[symbol]
        });

        this.channelMap[symbol] = response.channelID;
        const listenerId = this.addChannelListener(response.channelID, listener);

        return () => {
            this.removeChannelListener(response.channelID, listenerId);
        }
    }

}

export function connect() {
    if (!api) {
        api = KrakenApi.connect();
    }
    return api;
}


export function useStreaming(symbol: Ref<string>) {
    const close: Ref<number | null> = ref(null);
    let unsubscribe: (() => void) | null = null;
    connect().then((api) => {
        watch(symbol, () => {
            if (unsubscribe) {
                unsubscribe();
            }
            api.subscribe(symbol.value, ([channelId, payload]) => {
                close.value = Number(payload.c[0]);
            }).then(x => unsubscribe = x)
        }, { immediate: true })
     
    })

    return {
        close
    }
}
