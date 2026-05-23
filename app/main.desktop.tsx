import './global.scss';
import './i18n/i18n';
import { createRoot } from 'react-dom/client';
import { AppDesktop } from './app.desktop';

async function main() {
    if (typeof window !== 'undefined' && import.meta.env.DEV) {
        await import('react-scan').then(m => m.scan({ enabled: true }));
    }

    createRoot(document.getElementById('root')!).render(<AppDesktop />);
}

main();
