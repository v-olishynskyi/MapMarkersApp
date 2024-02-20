import { number, object, string } from 'yup';

export const validationSchema = object().shape({
  name: string().required('Поле обовʼязкове'),
  description: string().max(
    255,
    'Довжина не повинна перевищувати 255 символів',
  ),
  latitude: number().required('Поле обовʼязкове'),
  longitude: number().required('Поле обовʼязкове'),
});
