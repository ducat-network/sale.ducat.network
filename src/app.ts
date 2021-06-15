import { server, currentPort } from './configureServer';

(async () => {
    try {
        server.listen(currentPort, () => console.log(`[SERVER]: Started on port ${currentPort}!`));
    } catch (error) {
        console.log('[INIT ERROR]:', error);
    }
})();
