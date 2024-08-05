import '../../../node_modules/modern-normalize/modern-normalize.css';
import '../../index.scss';
import { ClientOnly } from './client';

export function Page() {
  return <ClientOnly />;
}
