import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
export function EmptyState({ icon, title, body, link, linkText }: { icon: ReactNode; title: string; body: string; link: string; linkText: string }) {
  return <div className="empty-state"><div className="empty-icon">{icon}</div><h3>{title}</h3><p>{body}</p><Link to={link} className="btn btn-dark">{linkText}</Link></div>;
}
