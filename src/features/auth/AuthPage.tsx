import { useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { ArrowRight, UserRound } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FormField } from '../../components/FormField';
import { hashDemoPassword, loginUser, registerUser } from './authSlice';

export const registerSchema = Yup.object({
  name: Yup.string().trim().required('სახელი სავალდებულოა').min(2, 'მინიმუმ 2 სიმბოლო'),
  age: Yup.number().typeError('შეიყვანე ასაკი').required('ასაკი სავალდებულოა').integer('ასაკი უნდა იყოს მთელი რიცხვი').min(18, 'რეგისტრაცია შესაძლებელია 18 წლიდან'),
  email: Yup.string().trim().email('შეიყვანე სწორი ელფოსტა').required('ელფოსტა სავალდებულოა'),
  password: Yup.string().required('პაროლი სავალდებულოა').min(6, 'პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს')
});
export const loginSchema = Yup.object({
  email: Yup.string().email('არასწორი ელფოსტა').required('ელფოსტა სავალდებულოა'),
  password: Yup.string().required('პაროლი სავალდებულოა')
});
function RegisterForm({ onError }: { onError: (error: string) => void }) {
  const users = useAppSelector(s => s.auth.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { name: '', age: '', email: '', password: '' },
    validationSchema: registerSchema,
    onSubmit: async values => {
      onError('');
      if (users.some(u => u.email.toLowerCase() === values.email.toLowerCase().trim())) { onError('ეს ელფოსტა უკვე რეგისტრირებულია. სცადე შესვლა.'); return; }
      try {
        const passwordHash = await hashDemoPassword(values.password);
        dispatch(registerUser({ id: `user-${Date.now()}`, name: values.name.trim(), age: Number(values.age), email: values.email.toLowerCase().trim(), passwordHash, joinedAt: new Date().toISOString() }));
        navigate('/profile');
      } catch { onError('რეგისტრაცია ვერ შესრულდა. გამოიყენე localhost ან HTTPS.'); }
    }
  });
  return <FormikProvider value={formik}><form className="styled-form" onSubmit={formik.handleSubmit} noValidate><FormField label="სახელი და გვარი *" name="name" placeholder="შენი სახელი"/><div className="form-row"><FormField label="ასაკი *" name="age" type="number" min="18" placeholder="18"/><FormField label="ელფოსტა *" name="email" type="email" placeholder="you@example.com"/></div><FormField label="პაროლი *" name="password" type="password" placeholder="სულ მცირე 6 სიმბოლო" hint="მინიმუმ 6 სიმბოლო"/><button className="btn btn-dark btn-submit" type="submit">რეგისტრაცია <ArrowRight size={18}/></button></form></FormikProvider>;
}
function LoginForm({ onError }: { onError: (error: string) => void }) {
  const users = useAppSelector(s => s.auth.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async values => {
      onError('');
      try {
        const hash = await hashDemoPassword(values.password);
        const user = users.find(u => u.email.toLowerCase() === values.email.toLowerCase().trim() && u.passwordHash === hash);
        if (!user) { onError('ელფოსტა ან პაროლი არასწორია.'); return; }
        dispatch(loginUser(user.id)); navigate('/profile');
      } catch { onError('შესვლა ვერ შესრულდა. გამოიყენე localhost ან HTTPS.'); }
    }
  });
  return <FormikProvider value={formik}><form className="styled-form" onSubmit={formik.handleSubmit} noValidate><FormField label="ელფოსტა *" name="email" type="email" placeholder="you@example.com"/><FormField label="პაროლი *" name="password" type="password" placeholder="შენი პაროლი"/><button className="btn btn-dark btn-submit" type="submit">შესვლა <ArrowRight size={17}/></button></form></FormikProvider>;
}
export default function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const activeUserId = useAppSelector(s => s.auth.activeUserId);
  const [error, setError] = useState('');
  if (activeUserId) return <Navigate to="/profile" replace/>;
  return <div className="container page-space auth-grid"><div className="auth-decor"><div className="auth-symbol">✳</div><div className="auth-decor-text"><span className="section-eyebrow">JOIN VELA COMMUNITY</span><h2>ყველაფერი კარგი<br/>აქედან იწყება<span className="accent-point">.</span></h2><p>შეინახე შენი არჩევანი, მართე პროფილი და აღმოაჩინე მეტი.</p></div><span className="auth-decor-index">EXPERIENCE MORE / 2026</span></div>
    <div className="auth-main"><span className="section-eyebrow">VELA / შენი ანგარიში</span><div className="auth-heading"><span className="auth-icon"><UserRound size={25}/></span><h1>{mode === 'register' ? 'შექმენი ანგარიში' : 'კეთილი იყოს შენი დაბრუნება'}</h1><p>{mode === 'register' ? 'შეავსე ინფორმაცია VELA-ს სამყაროში შესასვლელად.' : 'შეიყვანე შენი ელფოსტა და პაროლი.'}</p></div>
      {mode === 'register' ? <RegisterForm onError={setError}/> : <LoginForm onError={setError}/>}
      {error && <p className="field-error" role="alert">{error}</p>}
      <p className="auth-switch">{mode === 'register' ? 'უკვე გაქვს ანგარიში?' : 'ჯერ არ გაქვს ანგარიში?'} <Link to={mode === 'register' ? '/login' : '/register'} onClick={() => setError('')}>{mode === 'register' ? 'შესვლა' : 'რეგისტრაცია'}</Link></p>
    </div>
  </div>;
}
