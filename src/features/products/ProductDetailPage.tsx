
import { ArrowLeft, ArrowRight, CheckCircle2, PackageCheck, ShieldCheck, ShoppingBag, Star, Truck } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { money } from '../../data/products';
import { addToCart } from '../cart/cartSlice';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const product = useAppSelector(s => s.products.items.find(p => p.id === id));
  if (!product) return <div className="container page-space not-found"><h1>პროდუქტი ვერ მოიძებნა</h1><Link className="btn btn-dark" to="/products">კოლექციაში დაბრუნება</Link></div>;
  return <div className="container page-space"><div className="breadcrumbs"><Link to="/">მთავარი</Link><ArrowRight size={12}/><Link to="/products">პროდუქტები</Link><ArrowRight size={12}/>{product.name}</div><div className="detail-grid"><div className="detail-art"><span className="detail-art-label">VELA / SELECTED</span><img src={product.image} alt={product.name}/><span className="detail-art-index">EST. 2026 — 001</span></div><div className="detail-content"><div className="section-eyebrow">{product.category} / პროდუქტის დეტალები</div><div className="detail-stars"><Star size={16} fill="currentColor"/> {product.rating.toFixed(1)} <span>საუკეთესო არჩევანი</span></div><h1>{product.name}<span className="accent-point">.</span></h1><h2>{product.subtitle}</h2><p>{product.description}</p><div className="detail-price">{money(product.price)}{product.oldPrice && <s>{money(product.oldPrice)}</s>}</div><div className="availability"><CheckCircle2 size={17}/> მარაგშია — {product.stock} ერთეული</div><div className="detail-buttons"><button className="btn btn-dark btn-large" onClick={() => {dispatch(addToCart(product.id)); navigate("/cart");}}>კალათაში დამატება <ShoppingBag size={17}/></button></div><div className="detail-advantages"><span><Truck size={18}/> მოსახერხებელი მიწოდება</span><span><ShieldCheck size={18}/> შერჩეული ხარისხი</span><span><PackageCheck size={18}/> მარტივი შეკვეთა</span></div><div className="detail-seller">მომწოდებელი: <strong>{product.vendorEmail}</strong></div></div></div><Link to="/products" className="back-link"><ArrowLeft size={18}/> ყველა პროდუქტზე დაბრუნება</Link></div>;
}
