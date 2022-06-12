import { useWallet } from 'hooks/useWallet';
import { FC, ReactElement, createContext, useContext } from 'react';

interface Props {
  children: ReactElement;
}

const Web3Context: any = createContext(null);
const ProviderWeb3: FC<Props> = ({ children }) => {
  const { state, connectWithMetamask, getOwnBalance, sendTransaction } = useWallet();

  return (
    <Web3Context.Provider
      value={{ state, connectWithMetamask, getOwnBalance, sendTransaction }}
    >
      {children}
    </Web3Context.Provider>
  );
};
export default ProviderWeb3;

export const useWalletConnect = () => useContext(Web3Context);
