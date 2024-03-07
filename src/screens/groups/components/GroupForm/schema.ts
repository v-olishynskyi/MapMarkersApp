import { object, string } from 'yup';

const validationSchema = object().shape({
  name: string().required('Поле обовʼязкове'),
  description: string(),
});

export default validationSchema;
