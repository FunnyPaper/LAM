import './global.scss';
import './i18n/i18n';
import { createRoot } from 'react-dom/client';
import { AppDesktop } from './app.desktop';

createRoot(document.getElementById('root')!).render(<AppDesktop />);
