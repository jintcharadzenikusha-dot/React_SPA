import { ArrowRight, CalendarDays, LogOut, Mail, ShieldCheck, UserRound } from 'lucide-react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logoutUser } from './authSlice';

export default function ProfilePage({ publicView = false }: { publicView?:boolean }) {
  const { userId } = useParams<{userId:string}>();
  const activeUserId = useAppSelector(s => s.auth.activeUserId);
  const user = useAppSelector(s => s.auth.users.find(u => u.id === (publicView ? userId : activeUserId)));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  if (!publicView && !activeUserId) return <Navigate to="/login" replace/>;
  if (!user) return <div className="container page-space not-found"><h1>მომხმარებელი ვერ მოიძებნა</h1><Link to="/register" className="btn btn-dark">რეგისტრაცია</Link></div>;
  return <div className="container page-space"><div className="breadcrumbs"><Link to="/">მთავარი</Link><ArrowRight size={12}/>{publicView ? 'მომხმარებლის გვერდი' : 'ჩემი პროფილი'}</div><div className="page-heading"><div><span className="section-eyebrow">VELA / წევრობის სივრცე</span><h1>{publicView ? 'მომხმარებელი' : 'ჩემი პროფილი'}<span className="accent-point">.</span></h1><p>შენი მონაცემები და ანგარიშის ინფორმაცია ერთ სივრცეში.</p></div></div><section className="profile-card"><div className="profile-cover"><span>✳ VELA MEMBERS</span><span>EST. 2026</span></div><div className="profile-content"><div className="profile-avatar"><UserRound size={37}/></div><div className="profile-name-row"><div><span className="section-eyebrow">VELA MEMBER</span><h2>{user.name}</h2><span className="verified"><ShieldCheck size={16}/> დარეგისტრირებული მომხმარებელი</span></div>{!publicView && <button className="btn btn-outline" onClick={() => {dispatch(logoutUser()); navigate('/');}}><LogOut size={17}/> გამოსვლა</button>}</div><div className="profile-info-grid"><div><Mail size={20}/><span>ელფოსტა</span><strong>{user.email}</strong></div><div><UserRound size={20}/><span>ასაკი</span><strong>{user.age} წელი</strong></div><div><CalendarDays size={20}/><span>რეგისტრაციის თარიღი</span><strong>{new Date(user.joinedAt).toLocaleDateString('ka-GE')}</strong></div></div><div className="profile-links"><Link to={`/user/${user.id}`}>ჩემი საჯარო პროფილი <ArrowRight size={17}/></Link></div></div></section></div>;
}
