import {Routes,Route,Link} from 'react-router-dom';
import {Layout} from './components/Layout';
import CartHome from './pages/CartHome';import CartShowcase from './pages/CartShowcase';
import CartProduct from './pages/CartProduct';
import CartPage from './features/cart/CartPage';
import CheckoutPage,{OrderSuccessPage} from './features/cart/CheckoutPage';
export default function App(){return <Layout><Routes><Route path="/" element={<CartHome/>}/><Route path="/products" element={<CartShowcase/>}/><Route path="/products/:id" element={<CartProduct/>}/><Route path="/cart" element={<CartPage/>}/><Route path="/checkout/:step" element={<CheckoutPage/>}/><Route path="/order-success" element={<OrderSuccessPage/>}/><Route path="*" element={<div className="container page-space"><h1>გვერდი ვერ მოიძებნა</h1><Link to="/">მთავარი</Link></div>}/></Routes></Layout>}
