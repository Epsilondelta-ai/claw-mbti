import { Navigate, useLocation, useParams } from 'react-router';
import { detectLocale } from '../data/i18n';

export default function RedirectToLocale() {
  const locale = detectLocale();
  const { type } = useParams<{ type: string }>();
  const { pathname, search } = useLocation();
  const params = new URLSearchParams(search);

  // /result?type=intp-t&ei=... → /:lang/result/intp-t?ei=...
  const queryType = params.get('type');
  if (!type && queryType && pathname === '/result') {
    params.delete('type');
    const remaining = params.toString();
    return <Navigate to={`/${locale}/result/${queryType.toLowerCase()}${remaining ? `?${remaining}` : ''}`} replace />;
  }

  return <Navigate to={`/${locale}${pathname === '/' ? '' : pathname}${search}`} replace />;
}
