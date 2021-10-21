import type { BitcoinNetwork } from '@interlay/interbtc-api';
import { createInterbtc, InterBtc } from '@interlay/interbtc';

const DEFAULT_PARACHAIN_ENDPOINT = 'wss://api.interlay.io/parachain';
const network: BitcoinNetwork = 'testnet';

let api: Promise<InterBtc> | null = null;

export function connect(): Promise<InterBtc> {
  if (!api) {
    api = createInterbtc(DEFAULT_PARACHAIN_ENDPOINT, network);
  }
  return api;
}