import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, ShoppingBag, Star } from 'lucide-react';
import type { Product } from '../data/products';
import { money } from '../data/products';



export function ProductCard({ product }: { product: Product }) {
  
  return <article className="product-card">
    <Link className="product-image-wrap" to={`/products/${product.id}`} aria-label={`${product.name} — დეტალები`}>
      {product.badge && <span className="product-tag">{product.badge}</span>}
      <img src={product.image} alt={product.name} loading="lazy"/>
      <span className="image-link"><ArrowUpRight size={19}/></span>
    </Link>
    <div className="product-card-bottom">
      <div className="product-rating"><Star size={13} fill="currentColor"/> {product.rating.toFixed(1)} <span> / 5.0</span></div>
      <Link to={`/products/${product.id}`} className="product-title">{product.name}</Link>
      <div className="product-subtitle">{product.subtitle}</div>
      <div className="product-purchase"><div className="product-prices"><strong>{money(product.price)}</strong>{product.oldPrice && <s>{money(product.oldPrice)}</s>}</div>
        <Link className="product-add" to={`/products/${product.id}`} aria-label="პროდუქტის დეტალები"><ArrowUpRight size={20}/></Link>
      </div>
    </div>
  </article>;
}
