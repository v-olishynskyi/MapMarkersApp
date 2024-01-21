import { object, string } from 'yup';

const validationSchema = object().shape({
  first_name: string().required('Поле обовʼязкове'),
  last_name: string().required('Поле обовʼязкове'),
  middle_name: string(),
  username: string(),
});

export default validationSchema;
