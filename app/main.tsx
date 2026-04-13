import { createRoot } from 'react-dom/client';
import './global.scss';
import { AppDesktop } from './app.desktop';
import { initTranslations } from '@lam/frontend';

initTranslations();

createRoot(document.getElementById('root')!).render(<AppDesktop />);
