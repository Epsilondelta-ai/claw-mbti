import { Navigate, useLocation } from 'react-router';
import { detectLocale } from '../data/i18n';

export default function RedirectToLocale() {
  const locale = detectLocale();
  const { pathname, search } = useLocation();
  return <Navigate to={`/${locale}${pathname === '/' ? '' : pathname}${search}`} replace />;
}
