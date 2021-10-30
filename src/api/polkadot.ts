import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';

export async function getAccounts(): Promise<InjectedAccountWithMeta[]> {
    const extensions = await web3Enable('vault-dashboard');

    // if (extensions.length === 0) {
    //     // no extension installed, or the user did not accept the authorization
    //     // in this case we should inform the use and give a link to the extension
    //     return;
    // }

    const accounts = await web3Accounts();
    console.log('Accounts', accounts)
    return accounts;
}
