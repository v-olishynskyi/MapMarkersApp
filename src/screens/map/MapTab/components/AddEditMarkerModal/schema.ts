import { object, string } from 'yup';

export const validationSchema = object().shape({
  name: string().required('Поле обовʼязкове'),
  description: string(),
});
