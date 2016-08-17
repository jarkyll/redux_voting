import makeStore from './src/store';
import startServer from './src/server';


// our store that we make
export const store = makeStore;
startServer(store);


//load in the json
store.dispatch({
  type: 'SET_ENTRIES',
  entries: './artists.json'
});
//fetch the two choices
store.dispatch({
  type: 'NEXT'
});
