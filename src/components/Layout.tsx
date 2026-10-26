import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Headphones, Heart, Menu, Package, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCartCount } from '../features/cart/cartSlice';


export function Layout({ children }: { children: React.ReactNode }) {
  const cartCount = useAppSelector(selectCartCount);
  const search = "";
  const activeUser = null;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = [ { href: '/', label: 'მთავარი' }, { href: '/products', label: 'პროდუქტები' }, { href: '/cart', label: 'კალათა' } ];
  return <>
    <div className="announcement">შეარჩიე შენი ახალი ფავორიტი <span>✦</span> უფასო მიწოდება 200 ₾-დან <ArrowRight size={13}/></div>
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="VELA მთავარი"><span className="brand-symbol">✳</span> VELA<span className="brand-dot">.</span></Link>
        <nav className="desktop-nav" aria-label="მთავარი ნავიგაცია">{nav.map(item => <NavLink key={item.href} to={item.href} end={item.href === '/'} className={({ isActive }) => isActive ? 'nav-active' : ''}>{item.label}</NavLink>)}</nav>
        <div className="header-actions">
          
          
          <Link to="/cart" className="icon-button cart-link" aria-label={`კალათა: ${cartCount} ნივთი`}><ShoppingBag size={21}/>{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}</Link>
          <button type="button" className="icon-button mobile-menu-toggle" onClick={() => setMobileOpen(v => !v)} aria-label="მენიუს გახსნა" aria-expanded={mobileOpen}>{mobileOpen ? <X size={23}/> : <Menu size={23}/>}</button>
        </div>
      </div>
      {mobileOpen && <nav className="mobile-nav container" aria-label="მობილური ნავიგაცია" key={location.pathname}>{[...nav, {href:'/cart',label:'კალათა'}].map(item => <Link key={item.href} to={item.href} onClick={() => setMobileOpen(false)}>{item.label}</Link>)}</nav>}
    </header>
    <main id="main-content">{children}</main>
    <footer className="site-footer"><div className="container footer-grid">
      <div><Link to="/" className="brand footer-logo"><span className="brand-symbol">✳</span> VELA<span className="brand-dot">.</span></Link><p>ყოველდღიური ნივთები, რომლებიც ყოველდღიურობას განსაკუთრებულს ხდის.</p></div>
      <div><h4>აღმოაჩინე</h4><Link to="/products">ყველა პროდუქტი</Link><Link to="/cart">ჩემი კალათა</Link></div>
      <div><h4>ანგარიში</h4><Link to="/checkout/contact">შეკვეთა</Link></div>
      <div><h4>VELA-ს უპირატესობა</h4><span><Package size={16}/> მარტივი შეკვეთა</span><span><Heart size={16}/> რჩეული პროდუქტები</span><span><Headphones size={16}/> მარტივი გამოყენება</span></div>
    </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} VELA. ყველა უფლება დაცულია.</span><span>შენი სტილი. შენი არჩევანი.</span></div></footer>
  </>;
}
