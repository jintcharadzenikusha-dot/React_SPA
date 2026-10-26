import { useState } from 'react';
import { FormikProvider, useFormik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ArrowLeft, ArrowRight, CheckCircle2, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { FormField } from '../../components/FormField';
import { addProduct } from './productsSlice';
import type { Product } from '../../data/products';

export const productSchema = Yup.object({
  name: Yup.string().trim().required('პროდუქტის დასახელება სავალდებულოა').min(2, 'მინიმუმ 2 სიმბოლო'),
  price: Yup.number().typeError('შეიყვანე რიცხვი').required('ფასი სავალდებულოა').min(1, 'ფასი უნდა იყოს სულ მცირე 1 ₾'),
  vendorEmail: Yup.string().trim().email('შეიყვანე სწორი ელფოსტა').required('ელფოსტა სავალდებულოა'),
  category: Yup.string().required('აირჩიე კატეგორია'),
  description: Yup.string().trim().required('აღწერა სავალდებულოა').min(10, 'მინიმუმ 10 სიმბოლო')
});
export default function AddProductPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  // შედეგი 6: useFormik Hook აბრუნებს values, handleChange, handleBlur, errors, touched და handleSubmit-ს.
  const formik = useFormik({
    initialValues: { name: '', price: '', vendorEmail: '', category: 'აუდიო', description: '' },
    validationSchema: productSchema,
    onSubmit: values => {
      setError('');
      try {
        const id = `product-${Date.now()}`;
        const image: Record<string, string> = {
          'აუდიო': '/products/headphones.svg', 'გაჯეტები': '/products/watch.svg',
          'კომპიუტერები': '/products/laptop.svg', 'ფოტო': '/products/camera.svg'
        };
        const product: Product = {
          id, name: values.name.trim(), subtitle: 'ახალი პროდუქტი', description: values.description.trim(),
          category: values.category as Product['category'], price: Number(values.price),
          image: image[values.category], rating: 5, stock: 10,
          vendorEmail: values.vendorEmail.trim(), badge: 'ახალი'
        };
        dispatch(addProduct(product));
        navigate('/products'); // ინსტრუქცია: ფორმის გაგზავნის შემდეგ კატალოგში გადასვლა
      } catch { setError('პროდუქტის დამატება ვერ მოხერხდა. სცადე ხელახლა.'); }
    }
  });
  return <div className="container page-space form-layout">
    <div className="breadcrumbs"><Link to="/products">პროდუქტები</Link><ArrowRight size={12}/> დამატება</div>
    <div className="form-layout-grid">
      <div className="form-sidebar"><div className="section-eyebrow">VELA / ახალი პროდუქტი</div><h1>დაამატე<br/>პროდუქტი<span className="accent-point">.</span></h1><p>შეავსე საჭირო მონაცემები და ახალი პროდუქტი მაშინვე გამოჩნდება კატალოგში.</p><div className="side-info"><CheckCircle2 size={19}/> შეავსე პროდუქტის ინფორმაცია</div><div className="side-info"><CheckCircle2 size={19}/> პროდუქტი გამოჩნდება კოლექციაში</div><Link to="/products" className="back-link"><ArrowLeft size={17}/> კატალოგზე დაბრუნება</Link></div>
      <div className="form-panel"><div className="form-panel-heading"><span className="form-step">01 / პროდუქტი</span><h2>პროდუქტის ინფორმაცია</h2><p>ველები, რომლებიც * ნიშნითაა მონიშნული, სავალდებულოა.</p></div>
        <FormikProvider value={formik}><form className="styled-form" onSubmit={formik.handleSubmit} noValidate>
          <FormField label="პროდუქტის დასახელება *" name="name" placeholder="მაგ.: Studio Air" />
          <div className="form-row"><FormField label="ფასი (₾) *" name="price" type="number" min="1" placeholder="249"/><FormField label="მომწოდებლის ელფოსტა *" name="vendorEmail" type="email" placeholder="example@mail.com"/></div>
          <div className="field"><label htmlFor="category">კატეგორია *</label><Field as="select" id="category" name="category"><option value="აუდიო">აუდიო</option><option value="გაჯეტები">გაჯეტები</option><option value="კომპიუტერები">კომპიუტერები</option><option value="ფოტო">ფოტო</option></Field><ErrorMessage name="category" component="small" className="field-error"/></div>
          <div className="field"><label htmlFor="description">პროდუქტის აღწერა *</label><Field as="textarea" id="description" name="description" rows={4} placeholder="აღწერე პროდუქტის მთავარი უპირატესობები"/><ErrorMessage name="description" component="small" className="field-error"/></div>
          <div className="form-tip"><Plus size={17}/> პროდუქტი დაემატება კოლექციას და შენახული დარჩება.</div>
          {error && <p className="field-error" role="alert">{error}</p>}
          <button className="btn btn-dark btn-submit" type="submit">პროდუქტის დამატება <ArrowRight size={17}/></button>
        </form></FormikProvider>
      </div>
    </div>
  </div>;
}
