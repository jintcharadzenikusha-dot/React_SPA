import { useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { ArrowLeft, ArrowRight, CheckCircle2, LockKeyhole, PackageCheck } from 'lucide-react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FormField } from '../../components/FormField';
import { money } from '../../data/products';
import { completeOrder, selectCartCount, selectCartTotal } from './cartSlice';

export const checkoutSchema = Yup.object({
  recipient: Yup.string().trim().required('სახელი სავალდებულოა').min(2, 'მინიმუმ 2 სიმბოლო'),
  address: Yup.string().trim().required('მისამართი სავალდებულოა').min(5, 'მიუთითე სრული მისამართი'),
  postalCode: Yup.number().typeError('შეიყვანე რიცხვითი ინდექსი').required('საფოსტო ინდექსი სავალდებულოა').integer('ინდექსი უნდა იყოს მთელი რიცხვი').min(1, 'ინდექსი უნდა იყოს დადებითი'),
  email: Yup.string().trim().email('შეიყვანე სწორი ელფოსტა').required('ელფოსტა სავალდებულოა')
});
export default function CheckoutPage() {
  const { step } = useParams<{ step: string }>(); // დინამიკური მარშრუტი /checkout/:step
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');
  const items = useAppSelector(s => s.cart.items);
  const total = useAppSelector(selectCartTotal);
  const count = useAppSelector(selectCartCount);
  const user = useAppSelector(s => s.auth.users.find(u => u.id === s.auth.activeUserId));
  const shipping = total >= 200 ? 0 : 15;
  const formik = useFormik({
    initialValues: { recipient: user?.name ?? '', address: '', postalCode: '', email: user?.email ?? '' },
    validationSchema: checkoutSchema,
    onSubmit: values => {
      setError('');
      try {
        dispatch(completeOrder({
          id: `VEL-${Date.now().toString().slice(-8)}`,
          recipient: values.recipient.trim(), address: values.address.trim(),
          postalCode: Number(values.postalCode), email: values.email.trim(),
          items: items.map(item => ({ ...item })), total: total + shipping, date: new Date().toISOString()
        }));
        navigate('/order-success', { replace: true });
      } catch { setError('შეკვეთა ვერ გაფორმდა. სცადე ხელახლა.'); }
    }
  });
  if (step !== 'contact') return <Navigate to="/checkout/contact" replace/>;
  if (items.length === 0) return <Navigate to="/cart" replace/>;
  return <div className="container page-space">
    <div className="breadcrumbs"><Link to="/cart">კალათა</Link><ArrowRight size={12}/> შეკვეთის გაფორმება</div>
    <div className="page-heading"><div><span className="section-eyebrow">VELA / შეკვეთა</span><h1>შეკვეთის გაფორმება<span className="accent-point">.</span></h1><p>შეავსე მიწოდების დეტალები და გადაამოწმე შენაძენი.</p></div></div>
    <div className="checkout-grid"><section className="form-panel checkout-form"><div className="form-panel-heading"><span className="form-step">01 / საკონტაქტო ინფორმაცია</span><h2>მიწოდების დეტალები</h2></div>
      <FormikProvider value={formik}><form className="styled-form" onSubmit={formik.handleSubmit} noValidate>
        <FormField label="მიმღების სახელი *" name="recipient" placeholder="სახელი და გვარი"/>
        <FormField label="სრული მისამართი *" name="address" placeholder="ქალაქი, ქუჩა, სახლი"/>
        <div className="form-row"><FormField label="საფოსტო ინდექსი *" name="postalCode" type="number" min="1" placeholder="0100"/><FormField label="ელფოსტა *" name="email" type="email" placeholder="you@example.com"/></div>
        <div className="form-tip"><LockKeyhole size={17}/> სატესტო შეკვეთა — თანხა არ ჩამოგეჭრება.</div>
        {error && <small className="field-error" role="alert">{error}</small>}
        <button className="btn btn-dark btn-submit" type="submit">შეკვეთის დადასტურება <ArrowRight size={17}/></button>
      </form></FormikProvider><Link to="/cart" className="back-link"><ArrowLeft size={17}/> უკან, კალათაში</Link>
      </section><aside className="summary-panel checkout-summary"><span className="form-step">შეკვეთის მიმოხილვა</span><h2>შენი შენაძენი</h2><div className="summary-line"><span>პროდუქტები ({count})</span><strong>{money(total)}</strong></div><div className="summary-line"><span>მიწოდება</span><strong>{shipping ? money(shipping) : 'უფასო'}</strong></div><div className="summary-divider"/><div className="summary-grand"><span>სულ</span><strong>{money(total + shipping)}</strong></div><div className="summary-trust"><CheckCircle2 size={18}/> გადაამოწმე მონაცემები დადასტურებამდე</div></aside></div>
  </div>;
}
export function OrderSuccessPage() {
  const latestOrder = useAppSelector(s => s.cart.orders[0]);
  if (!latestOrder) return <Navigate to="/products" replace/>;
  return <div className="container page-space"><div className="success-page"><div className="success-symbol"><PackageCheck size={51}/></div><div className="section-eyebrow">შეკვეთა დასრულებულია</div><h1>გილოცავ, {latestOrder.recipient.split(' ')[0]}!</h1><p>შეკვეთა დაფიქსირდა! ეს ვერსია რეალურ გადახდასა და მიწოდებას არ ახორციელებს.</p><div className="success-meta"><span>შეკვეთის №</span><strong>{latestOrder.id}</strong><span>ჯამი</span><strong>{money(latestOrder.total)}</strong></div><Link className="btn btn-dark" to="/products">გააგრძელე შოპინგი <ArrowRight size={18}/></Link></div></div>;
}
