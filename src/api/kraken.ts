

let api: Promise<KrakenApi> | null = null;

class KrakenApi {
    socket: WebSocket;
    channelMap: Record<string, number>;
    channelListener: Record<number, [(message: any) => void]>;
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
            let socket = new WebSocket('wss://ws.kraken.com/');
            socket.addEventListener('open', () => resolve(new KrakenApi(socket)));
        })
    }

    private handleOpen() {
        //this.socket.send('{"event":"subscribe", "reqid": 1337, "subscription":{"name":"ticker"}, "pair":["BTC/USD"]}');
    }

    private handleMessage(event: MessageEvent<any>) {
        const message = JSON.parse(event.data);

        if ('reqid' in message) {
            let handler = this.reqPromiseMap[message.reqid];
            handler && handler.resolve(message);
        }
        if (Array.isArray(message)) {
            let handlers = this.channelListener[message[0]] || [];
            handlers.forEach(handler => handler(message));
        }

        console.log('Message from server ', message);
    }

    private request(payload: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let reqid = this.reqCnt++;

            let message = { 
                ...payload,
                reqid
            }
            this.reqPromiseMap[reqid] = { resolve, reject };
            this.socket.send(JSON.stringify(message));
        })
    }

    private addChannelListener(channelId: number, listener: (message: any) => void) {
        let listenerArray = this.channelListener[channelId] || [];
        listenerArray.push(listener);
        this.channelListener[channelId] = listenerArray;
    }

    async subscribe(symbol: string, listener: (message: any) => void) {
        let response = await this.request({
            event:"subscribe", 
            subscription: {"name":"ticker"},
            pair:[symbol]
        });

        this.channelMap[symbol] = response.channelID;
        this.addChannelListener(response.channelID, listener);
    }
}

export function connect() {
    if (!api) {
        api = KrakenApi.connect();
    }
    return api;
}
