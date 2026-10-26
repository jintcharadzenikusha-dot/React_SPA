import { Routes, Route, Link } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './features/products/ProductsPage';
import AddProductPage from './features/products/AddProductPage';
import ProductDetailPage from './features/products/ProductDetailPage';
export default function App(){return <Layout><Routes>
<Route path="/" element={<HomePage/>}/><Route path="/products" element={<ProductsPage/>}/>
<Route path="/products/new" element={<AddProductPage/>}/><Route path="/products/:id" element={<ProductDetailPage/>}/>
<Route path="*" element={<div className="container page-space not-found"><h1>გვერდი ვერ მოიძებნა</h1><Link to="/">მთავარი</Link></div>}/>
</Routes></Layout>}
