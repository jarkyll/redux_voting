import {setEntries, vote, next, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action){
  //find out which function to call and call it
  // adding the INITIAL_STATE option makes it so if the state is undefined
  switch (action.type){
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
    // you want to update the vote key:value by updating what the state is after
    //running the vote function which only alters the vote jey:value
    return state.update('vote', state => vote(state, action.entry));
  }
  //none of those actions
  return state;
}
