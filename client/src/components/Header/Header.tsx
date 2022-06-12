import { FC, useContext, useEffect, useState } from 'react';
import ThemeChange from './components/ThemeChange';
import BaseTitle from '../../components/common/BaseTitle';
import {
  BSCLogo,
  ETHLogo,
  AvaxLogo,
  PolygonLogo,
  MetaMaskLogo,
  CoinBaseLogo,
  WalletConnectLogo,
} from './Logos';
import styles from './Header.module.scss';
import ReactModal from '../../components/common/ReactModal';
import BaseText from '../../components/common/BaseText';
import { useWalletConnect } from 'components/Providers/ProviderWeb3/ProviderWeb3';

// coins api https://api.coinpaprika.com/v1/coins

const Header: FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { state, connectWithMetamask }: any = useWalletConnect();

  const handleModalConnectWallet = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const closeModalModalConnectWallet = () => {
    setModalIsOpen(false);
  };

  const handleConnectMetamask = () => {
    connectWithMetamask();
    closeModalModalConnectWallet();
  };

  const handleWalletConnect = () => {
    connectWalletConnect();
    closeModalModalConnectWallet();
  };

  const handleCoinBase = () => {
    connectCoinbase();
    closeModalModalConnectWallet();
  };

  return (
    <div data-testid="header-app" className={styles.header}>
      <BaseTitle size={32} title="Saifu" />
      <div className={styles.containerActions}>
        <div className={styles.containerAccountWallet}>
          <div className={styles.balance}>
            <ETHLogo />
            {state.balance}
          </div>
          <div className={styles.walletConnect}>{state.account}</div>
        </div>
        {/* {state.account && (
          <button onClick={() => getOwnBalance(state.account)}>get balance</button>
        )} */}
        <button onClick={handleModalConnectWallet}>Connect Wallet</button>
        {/* <button
          onClick={() =>
            sendTransaction('H5XUMBWZDWLf9Eu4eiPNSRC7Ao6ZbcVfgEssFo2QLaQs', 1000)
          }
          className={styles.walletButton}
        >
          <BaseText text="send monay" />
        </button> */}
        <ThemeChange />
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        title="Connect a Wallet"
        closeModal={closeModalModalConnectWallet}
      >
        <div className={styles.walletsConnectios}>
          <button onClick={handleConnectMetamask} className={styles.walletButton}>
            <BaseText text="MetaMask" />
            <MetaMaskLogo />
          </button>
          <button className={styles.walletButton} onClick={handleWalletConnect}>
            <BaseText text="Wallet Connect" />
            <WalletConnectLogo />
          </button>
          <button onClick={handleCoinBase} className={styles.walletButton}>
            <BaseText text="Coinbase Wallet" />
            <CoinBaseLogo />
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default Header;

const menuItems = [
  {
    key: '0x1',
    value: 'Ethereum',
    icon: <ETHLogo />,
  },
  {
    key: '0x539',
    value: 'Local Chain',
    icon: <ETHLogo />,
  },
  {
    key: '0x3',
    value: 'Ropsten Testnet',
    icon: <ETHLogo />,
  },
  {
    key: '0x4',
    value: 'Rinkeby Testnet',
    icon: <ETHLogo />,
  },
  {
    key: '0x2a',
    value: 'Kovan Testnet',
    icon: <ETHLogo />,
  },
  {
    key: '0x5',
    value: 'Goerli Testnet',
    icon: <ETHLogo />,
  },
  {
    key: '0x38',
    value: 'Binance',
    icon: <BSCLogo />,
  },
  {
    key: '0x61',
    value: 'Smart Chain Testnet',
    icon: <BSCLogo />,
  },
  {
    key: '0x89',
    value: 'Polygon',
    icon: <PolygonLogo />,
  },
  {
    key: '0x13881',
    value: 'Mumbai',
    icon: <PolygonLogo />,
  },
  {
    key: '0xa86a',
    value: 'Avalanche',
    icon: <AvaxLogo />,
  },
];
