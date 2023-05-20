import { useTheme } from '@react-navigation/native';
import { ITheme } from '@styles';

export const getTheme = useTheme as unknown as () => ITheme;
