import { useField } from 'formik';
import type { InputHTMLAttributes } from 'react';
type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; name: string; hint?: string };
export function FormField({ label, hint, ...props }: Props) {
  const [field, meta] = useField(props.name);
  const invalid = Boolean(meta.touched && meta.error);
  return <div className="field">
    <label htmlFor={props.name}>{label}</label>
    <input {...field} {...props} id={props.name} aria-invalid={invalid} aria-describedby={invalid ? `${props.name}-error` : undefined} className={invalid ? 'input-error' : ''} />
    {invalid ? <small className="field-error" id={`${props.name}-error`}>{meta.error}</small> : hint ? <small className="field-hint">{hint}</small> : null}
  </div>;
}
