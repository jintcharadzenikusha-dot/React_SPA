import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { money } from '../../data/products';
import { EmptyState } from '../../components/EmptyState';
import { addToCart, decreaseQuantity, removeFromCart, selectCartCount, selectCartTotal } from './cartSlice';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(s => s.cart.items);
  const products = useAppSelector(s => s.products.items);
  const total = useAppSelector(selectCartTotal);
  const count = useAppSelector(selectCartCount);
  const shipping = total >= 200 ? 0 : 15;
  return <div className="container page-space"><div className="breadcrumbs"><Link to="/">მთავარი</Link><ArrowRight size={12}/> კალათა</div><div className="page-heading"><div><span className="section-eyebrow">VELA / შერჩეული ნივთები</span><h1>შენი კალათა<span className="accent-point">.</span></h1><p>შეამოწმე შერჩეული ნივთები და განაგრძე შეკვეთა.</p></div><span className="big-number">{String(count).padStart(2,'0')}</span></div>
    {items.length === 0 ? <EmptyState icon={<ShoppingBag size={32}/>} title="კალათა ცარიელია" body="აღმოაჩინე კოლექცია და დაამატე სასურველი პროდუქტები." link="/products" linkText="პროდუქტების ნახვა"/> : <div className="checkout-grid"><section className="cart-panel"><div className="cart-panel-top"><h2>პროდუქტები <span>({count})</span></h2><span>შენი შეკვეთა</span></div>{items.map(item => {const product = products.find(p => p.id === item.productId);if(!product)return null;return <article className="cart-row" key={item.productId}><Link to={`/products/${product.id}`} className="cart-thumb"><img src={product.image} alt={product.name}/></Link><div className="cart-info"><Link to={`/products/${product.id}`} className="cart-title">{product.name}</Link><span>{product.subtitle}</span><strong>{money(product.price)}</strong></div><div className="cart-actions"><button className="remove-button" type="button" onClick={() => dispatch(removeFromCart(product.id))} aria-label={`${product.name} წაშლა`}><Trash2 size={17}/></button><div className="quantity-control"><button type="button" onClick={() => dispatch(decreaseQuantity(product.id))} aria-label="რაოდენობის შემცირება"><Minus size={15}/></button><span>{item.quantity}</span><button type="button" onClick={() => dispatch(addToCart(product.id))} aria-label="რაოდენობის გაზრდა" disabled={item.quantity >= product.stock}><Plus size={15}/></button></div></div></article>;})}<Link to="/products" className="back-link">← შოპინგის გაგრძელება</Link></section><aside className="summary-panel"><span className="form-step">შეკვეთის შეჯამება</span><h2>ჯამური ღირებულება</h2><div className="summary-line"><span>პროდუქტები ({count})</span><strong>{money(total)}</strong></div><div className="summary-line"><span>მიწოდება</span><strong>{shipping ? money(shipping) : 'უფასო'}</strong></div><div className="summary-divider"/><div className="summary-grand"><span>სულ</span><strong>{money(total + shipping)}</strong></div><Link to="/checkout/contact" className="btn btn-dark btn-submit">შეკვეთის გაფორმება <ArrowRight size={18}/></Link><p className="summary-footnote"><Truck size={16}/> {shipping ? `უფასო მიწოდებამდე დარჩა ${money(Math.max(0, 200-total))}` : 'უფასო მიწოდება გააქტიურებულია'}</p></aside></div>}
  </div>;
}
