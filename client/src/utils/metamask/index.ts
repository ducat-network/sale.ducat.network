import { WalletControllerInstance } from '@utils/wallet_controller';

(() => {
    try {
        WalletControllerInstance.ethereum.on('accountsChanged', () => location.reload());
        WalletControllerInstance.ethereum.on('chainChanged', () => location.reload());
        WalletControllerInstance.ethereum.on('disconnect', () => location.reload());
    } catch (e) {}
})();