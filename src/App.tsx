import { Routes, Route, Link } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './features/products/ProductsPage';
import AddProductPage from './features/products/AddProductPage';
import ProductDetailPage from './features/products/ProductDetailPage';
import AuthPage from './features/auth/AuthPage';
import ProfilePage from './features/auth/ProfilePage';
export default function App(){return <Layout><Routes>
<Route path="/" element={<HomePage/>}/><Route path="/products" element={<ProductsPage/>}/>
<Route path="/products/new" element={<AddProductPage/>}/><Route path="/products/:id" element={<ProductDetailPage/>}/>
<Route path="/register" element={<AuthPage mode="register"/>}/><Route path="/login" element={<AuthPage mode="login"/>}/><Route path="/profile" element={<ProfilePage/>}/><Route path="/user/:userId" element={<ProfilePage publicView/>}/><Route path="*" element={<div className="container page-space not-found"><h1>გვერდი ვერ მოიძებნა</h1><Link to="/">მთავარი</Link></div>}/>
</Routes></Layout>}
