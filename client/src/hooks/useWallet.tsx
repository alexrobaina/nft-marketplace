import { useEffect, useState } from 'react';
import Web3 from 'web3';
import WalletLink from 'walletlink';
import WalletConnectProvider from '@walletconnect/web3-provider';

let web3: any;
let provider: any;

if (typeof window !== 'undefined') {
  // @ts-ignore
  provider = window.ethereum;
}
web3 = new Web3(provider);

export const useWallet = () => {
  const [state, setState] = useState({
    balance: 0,
    account: '',
    isLoading: false,
    errorAccount: '',
    isInitialized: false,
    chainId: 0,
  });

  useEffect(() => {
    if (state.account) {
      getOwnBalance(state.account);
    }
  }, [state.account]);

  const getOwnBalance = async (address: string) => {
    web3.eth
      .getBalance(address)
      .then((balance: any) => {
        const balanceFormatted = web3.utils.fromWei(balance, 'ether');
        setState({ ...state, balance: balanceFormatted });
      })
      .catch((error: any) => {
        console.log(error);
        setState({ ...state, errorAccount: 'Something is wrong with MetaMask' });
      });
  };

  const sendTransaction = async (to: string, amount: string) => {
    try {
      setState({ ...state, errorAccount: '' });
      console.log('sendTransaction', state.account, to, amount);

      console.log(web3.utils.toWei(JSON.stringify(10), 'ether'));

      web3.eth
        .sendTransaction({
          from: state.account,
          to,
          value: web3.utils.toWei(amount, 'ether'),
        })
        .then((receipt: { account: string }) => {
          if (receipt) getOwnBalance(state.account);
          setState({ ...state, errorAccount: '' });
        })
        .catch((error: any) => {
          console.log('sendTransaction', error);
          setState({ ...state, errorAccount: error?.message || 'Something is wrong' });
        });
    } catch (error) {
      console.log(error);

      setState({ ...state, errorAccount: 'Check the destination address' });
    }
  };

  const getNetwork = async () => {
    web3.eth.net.getId().then((chainId: number) => {
      setState({ ...state, chainId });
    });
  };

  const connectWithMetamask = async () => {
    setState({ ...state, errorAccount: '' });
    if (typeof provider !== 'undefined') {
      provider
        .request({ method: 'eth_requestAccounts' })
        .then((accounts: [string]) => {
          setState({ ...state, account: accounts[0], isInitialized: true });
        })
        .catch(() => {
          setState({ ...state, errorAccount: 'Please connect with MetaMask' });
        });
    }
  };

  const connectWalletConnect = async () => {
    try {
      const RPC_URLS = {
        1: 'https://mainnet.infura.io/v3/36df55117f5e459ebf6186f0bd51effb',
        2: 'https://near-testnet.infura.io/v3/e211232528dd4bb0b945289373c4b4fd',
      };
      const provider: any = new WalletConnectProvider({
        rpc: {
          1: RPC_URLS[1],
          2: RPC_URLS[2],
        },
        qrcode: true,
        pollingInterval: 15000,
      });
      web3 = new Web3(provider);

      if (typeof provider !== 'undefined') {
        provider
          .request({ method: 'eth_requestAccounts' })
          .then((accounts: [string, string]) => {
            getNetwork();
            setState({ ...state, account: accounts[0], isInitialized: true });
          })
          .catch(() => {
            setState({ ...state, errorAccount: 'Please connect with MetaMask' });
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectCoinbase = async () => {
    try {
      // Initialize WalletLink
      const walletLink = new WalletLink({
        appName: 'dapp-exchange',
        darkMode: true,
      });

      const provider = walletLink.makeWeb3Provider(
        'https://mainnet.infura.io/v3/36df55117f5e459ebf6186f0bd51effb',
        4,
      );

      const accounts: any = await provider.request({
        method: 'eth_requestAccounts',
      });

      const account = accounts[0];
      getOwnBalance(account);
      web3 = new Web3(provider);
      setState({ ...state, account });
    } catch (ex) {
      console.log(ex);
    }
  };

  return {
    state,
    getNetwork,
    getOwnBalance,
    sendTransaction,
    connectCoinbase,
    connectWithMetamask,
    connectWalletConnect,
  };
};
