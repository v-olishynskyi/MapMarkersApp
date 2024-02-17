import { number, object, string } from 'yup';

export const validationSchema = object().shape({
  name: string().required('Поле обовʼязкове'),
  description: string(),
  latitude: number().required('Поле обовʼязкове'),
  longitude: number().required('Поле обовʼязкове'),
});
