export const REGISTER_THEME = 'REGISTER_THEME';
export const REGISTER_THEMES = 'REGISTER_THEMES';
export const SELECT_THEME = 'SELECT_THEME';

export const bookReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_THEME:
      return {
        ...state.themes,
        ...action.payload,
      };
    default:
      return state;
  }
};
