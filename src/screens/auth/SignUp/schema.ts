import { object, ref, string } from 'yup';

const validationSchema = object().shape({
  email: string().email('Invalid email address').required('Поле обовʼязкове'),
  firstName: string().required('Поле обовʼязкове'),
  lastName: string().required('Поле обовʼязкове'),
  middleName: string(),
  password: string()
    .required('Поле обовʼязкове')
    .min(6, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    ),
  confirmPassword: string()
    .required('Поле обовʼязкове')
    .oneOf([ref('password')], 'Паролі не співпадають'),
});

export default validationSchema;
