import {createStore} from 'redux';

import reducer from './reducer';


export default function makeStore(){
  return createStore(reducer);
  //has the 3 actions now built in
  /*Because we have a generic reducer function, that's the only thing we need
   to let Redux know about. The rest is all in our own,
    non-framework-specific, highly portable
    and purely functional code! */
}
