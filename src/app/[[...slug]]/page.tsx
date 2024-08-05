import '../../../node_modules/modern-normalize/modern-normalize.css';
import '../../index.scss';
import { ClientOnly } from './client';

export function generateStaticParams() {
  return [{ slug: [''] }];
}

export default function Page() {
  return <ClientOnly />;
}
