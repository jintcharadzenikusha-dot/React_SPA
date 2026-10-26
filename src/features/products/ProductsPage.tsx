import { useMemo } from 'react';
import { ArrowRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ProductCard } from '../../components/ProductCard';
import { categories } from '../../data/products';
import { resetFilters, setCategory, setSearch, setSort } from './productsSlice';

export default function ProductsPage() {
  const {items, category, search, sort} = useAppSelector(s => s.products);
  const dispatch = useAppDispatch();
  const filtered = useMemo(() => {
    const list = items.filter(item => (category === 'ყველა' || item.category === category) && `${item.name} ${item.subtitle} ${item.description}`.toLocaleLowerCase().includes(search.toLocaleLowerCase().trim()));
    if (sort === 'low') return list.sort((a,b) => a.price - b.price);
    if (sort === 'high') return list.sort((a,b) => b.price - a.price);
    return list.sort((a,b) => b.rating - a.rating);
  }, [items, category, search, sort]);
  return <div className="container page-space"><div className="breadcrumbs"><Link to="/">მთავარი</Link><ArrowRight size={12}/> პროდუქტები</div><div className="catalog-heading"><div><div className="section-eyebrow">აღმოაჩინე მეტი</div><h1>ჩვენი კოლექცია<span className="accent-point">.</span></h1><p>გამორჩეული ნივთები, შენი ყოველდღიური ცხოვრებისთვის.</p></div><Link to="/products/new" className="btn btn-dark">+ ახალი პროდუქტი</Link></div>
    <div className="catalog-toolbar"><div className="filter-categories" role="group" aria-label="პროდუქტის კატეგორია">{categories.map(cat => <button type="button" key={cat} className={cat === category ? 'filter-active' : ''} onClick={() => dispatch(setCategory(cat))}>{cat}</button>)}</div><div className="filter-right"><label className="toolbar-search"><Search size={17}/><input placeholder="ძებნა..." value={search} onChange={e => dispatch(setSearch(e.target.value))} aria-label="პროდუქტის ძებნა" /></label><label className="sort-label"><SlidersHorizontal size={17}/><select value={sort} onChange={e => dispatch(setSort(e.target.value as 'popular'|'low'|'high'))} aria-label="დალაგება"><option value="popular">პოპულარული</option><option value="low">ფასი: ზრდადობით</option><option value="high">ფასი: კლებადობით</option></select></label></div></div>
    <div className="results-count">ნაპოვნია <strong>{filtered.length}</strong> პროდუქტი</div>{filtered.length ? <div className="product-grid catalog-grid">{filtered.map(p => <ProductCard key={p.id} product={p}/>)}</div> : <div className="empty-filter"><Search size={29}/><h3>შედეგი ვერ მოიძებნა</h3><p>სცადე სხვა საძიებო სიტყვა ან კატეგორია.</p><button className="btn btn-dark" onClick={() => dispatch(resetFilters())}><X size={17}/> ფილტრების გასუფთავება</button></div>}
  </div>;
}
