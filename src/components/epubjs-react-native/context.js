import React, { createContext, useReducer, useRef } from 'react';

const CHANGE_THEME = 'CHANGE_THEME';
const CHANGE_FONT_SIZE = 'CHANGE_FONT_SIZE';
const CHANGE_FONT_FAMILY = 'CHANGE_FONT_FAMILY';
const SET_AT_START = 'SET_AT_START';
const SET_AT_END = 'SET_AT_END';
const SET_KEY = 'SET_KEY';
const SET_TOTAL_LOCATIONS = 'SET_TOTAL_LOCATIONS';
const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION';
const SET_PROGRESS = 'SET_PROGRESS';
const SET_LOCATIONS = 'SET_LOCATIONS';
const SET_IS_LOADING = 'SET_IS_LOADING';
const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';

export const defaultTheme = {
  body: {
    background: '#fff',
  },
  span: {
    color: '#000 !important',
  },
  p: {
    color: '#000 !important',
  },
  li: {
    color: '#000 !important',
  },
  h1: {
    color: '#000 !important',
  },
  a: {
    color: '#000 !important',
    'pointer-events': 'auto',
    cursor: 'pointer',
  },
  '::selection': {
    background: 'lightskyblue',
  },
};

const initialState = {
  theme: defaultTheme,
  fontFamily: 'Helvetica',
  fontSize: '12pt',
  atStart: false,
  atEnd: false,
  key: '',
  totalLocations: 0,
  currentLocation: null,
  progress: 0,
  locations: [],
  isLoading: false,
  searchResults: [],
};

function bookReducer(state, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case CHANGE_FONT_SIZE:
      return {
        ...state,
        fontSize: action.payload,
      };
    case CHANGE_FONT_FAMILY:
      return {
        ...state,
        fontFamily: action.payload,
      };
    case SET_AT_START:
      return {
        ...state,
        atStart: action.payload,
      };
    case SET_AT_END:
      return {
        ...state,
        atEnd: action.payload,
      };
    case SET_KEY:
      return {
        ...state,
        key: action.payload,
      };
    case SET_TOTAL_LOCATIONS:
      return {
        ...state,
        totalLocations: action.payload,
      };
    case SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload,
      };
    case SET_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };
    case SET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
      };
    default:
      return state;
  }
}

const ReaderContext = createContext({
  registerBook: () => {},
  setAtStart: () => {},
  setAtEnd: () => {},
  setTotalLocations: () => {},
  setCurrentLocation: () => {},
  setProgress: () => {},
  setLocations: () => {},
  setIsLoading: () => {},

  goToLocation: () => {},
  goPrevious: () => {},
  goNext: () => {},
  getLocations: () => [],
  getCurrentLocation: () => null,
  search: () => {},

  changeTheme: () => {},
  changeFontFamily: () => {},
  changeFontSize: () => {},

  addMark: () => {},
  removeMark: () => {},

  setKey: () => {},
  key: '',

  theme: defaultTheme,
  atStart: false,
  atEnd: false,
  totalLocations: 0,
  currentLocation: null,
  progress: 0,
  locations: [],
  isLoading: false,

  searchResults: [],
  setSearchResults: () => {},
});

const ReaderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);
  const book = useRef(null);

  function registerBook(bookRef) {
    book.current = bookRef;
  }

  function changeTheme(theme) {
    book.current?.injectJavaScript(`
      window.THEME = ${JSON.stringify(theme)};
      window.rendition.themes.register({ theme: window.THEME });
        window.rendition.themes.select('theme');
        window.rendition.views().forEach(view => view.pane ? view.pane.render() : null)
    `);
    dispatch({ type: CHANGE_THEME, payload: theme });
  }

  function changeFontFamily(fontFamily) {
    book.current?.injectJavaScript(`
      rendition.themes.font('${fontFamily}');
    `);
    dispatch({ type: CHANGE_FONT_FAMILY, payload: fontFamily });
  }

  function changeFontSize(size) {
    book.current?.injectJavaScript(`
      rendition.themes.fontSize('${size}'); true
    `);
    dispatch({ type: CHANGE_FONT_SIZE, payload: size });
  }

  function setAtStart(atStart) {
    dispatch({ type: SET_AT_START, payload: atStart });
  }

  function setAtEnd(atEnd) {
    dispatch({ type: SET_AT_END, payload: atEnd });
  }

  function setTotalLocations(totalLocations) {
    dispatch({ type: SET_TOTAL_LOCATIONS, payload: totalLocations });
  }

  function setCurrentLocation(location) {
    dispatch({ type: SET_CURRENT_LOCATION, payload: location });
  }

  function setProgress(progress) {
    dispatch({ type: SET_PROGRESS, payload: progress });
  }

  function setLocations(locations) {
    dispatch({ type: SET_LOCATIONS, payload: locations });
  }

  function setIsLoading(isLoading) {
    dispatch({ type: SET_IS_LOADING, payload: isLoading });
  }

  function goToLocation(target) {
    book.current?.injectJavaScript(`rendition.display('${target}'); true`);
  }

  function goPrevious() {
    book.current?.injectJavaScript(`rendition.prev(); true`);
  }

  function goNext() {
    book.current?.injectJavaScript(`rendition.next(); true`);
  }

  function getLocations() {
    return state.locations;
  }

  function getCurrentLocation() {
    return state.currentLocation;
  }

  // Works
  function search(query) {
    book.current?.injectJavaScript(`
      Promise.all(
        window.book.spine.spineItems.map((item) => {
          return item.load(window.book.load.bind(window.book)).then(() => {
            let results = item.find('${query}'.trim());
            item.unload();
            return Promise.resolve(results);
          });
        })
      ).then((results) =>
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: 'onSearch', results: [].concat.apply([], results) })
        )
      ); true
    `);
  }

  function setSearchResults(results) {
    dispatch({ type: SET_SEARCH_RESULTS, payload: results });
  }

  // Works
  function addMark(type, cfiRange, data, callback, className, styles) {
    const defaultStyles = { fill: 'yellow' };

    book.current?.injectJavaScript(`
      rendition.annotations.add('${type}', '${cfiRange}', ${JSON.stringify(
      data ?? {},
    )}, ${JSON.stringify(
      callback ? callback() : () => {},
    )}, '${className}', ${JSON.stringify(defaultStyles ?? styles)}); true
    `);
  }

  // Works
  function removeMark(cfiRange, type) {
    book.current?.injectJavaScript(`
      rendition.annotations.remove('${cfiRange}', '${type}'); true
    `);
  }

  // Works
  function setKey(key) {
    dispatch({ type: SET_KEY, payload: key });
  }
  return (
    <ReaderContext.Provider
      value={{
        registerBook,
        setAtStart,
        setAtEnd,
        setTotalLocations,
        setCurrentLocation,
        setProgress,
        setLocations,
        setIsLoading,

        goToLocation,
        goPrevious,
        goNext,
        getLocations,
        getCurrentLocation,
        search,

        addMark,
        removeMark,

        setKey,
        key: state.key,

        changeTheme,
        changeFontFamily,
        changeFontSize,
        theme: state.theme,

        atStart: state.atStart,
        atEnd: state.atEnd,
        totalLocations: state.totalLocations,
        currentLocation: state.currentLocation,
        progress: state.progress,
        locations: state.locations,
        isLoading: state.isLoading,

        searchResults: state.searchResults,
        setSearchResults,
      }}>
      {children}
    </ReaderContext.Provider>
  );
};

export { ReaderProvider, ReaderContext };
