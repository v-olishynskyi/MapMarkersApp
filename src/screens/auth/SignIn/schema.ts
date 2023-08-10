import { object, string } from 'yup';

const validationSchema = object().shape({
  email: string().email('Invalid email address').required('Email is required'),
  password: string()
    .required('Password is required')
    .min(6, 'Password must be at least 8 characters long'),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
  //   'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  // ),
});

export default validationSchema;
