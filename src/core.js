import {List, Map} from 'immutable';


export const INITIAL_STATE = Map();

export function setEntries(state, entries){
  return state.set('entries', List(entries));
  //makes the entries into a list before returning
}


export function next(state) {
  // find who is the winner and concats it to entries
  const entries = state.get('entries').concat(getWinners(state.get('vote')));
  //entries contains the next set of entries
  //cause you concatted the winner in the line above
  if(entries.size === 1){
    return state.remove('vote').remove('entries').set('winner', entries.first());
  } else {
    return state.merge({
      vote: Map({pair: entries.take(2)}),
      entries: entries.skip(2)
    });
  }
}


export function vote(state, entry) {

  //how to traverse it, what to put if it doesn't exist, the function to do to the value

  return state.updateIn(
    ['tally', entry],
    0,
    value => value + 1
  );
}



function getWinners(votes){
  if(!votes) return [];
  const[a, b] = votes.get('pair');
  //if it exists get the stuff in 'tally', a else 0
  const aResult = votes.getIn(['tally', a], 0);
  const bResult = votes.getIn(['tally', b], 0);
  if(aResult > bResult)
    return[a];
  else if(aResult < bResult)
    return[b];
  else
    return [a, b];
}
