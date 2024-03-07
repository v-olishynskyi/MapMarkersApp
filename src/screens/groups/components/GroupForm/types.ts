import { GroupPrivacyCodes } from '@common/types';
import { PublicFileModel } from '@models';
import { useFormik } from 'formik';

/**
 * @memberof GroupForm
 * @typedef {Object} GroupFormProps
 */
export type GroupFormProps = {
  avatar: PublicFileModel | null;
  setAvatar: React.Dispatch<React.SetStateAction<PublicFileModel | null>>;
  formik: ReturnType<typeof useFormik<FormState>>;
};

export type FormState = {
  name: string;
  description?: string;
  privacyCode: GroupPrivacyCodes;
};
