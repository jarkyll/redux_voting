import {Map, fromJS} from 'immutable'
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', ()=>{

  it('handles SET_ENTRIES', ()=>{
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['Sufjan Stevens']};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries:['Sufjan Stevens']
    }));
  });


  it('handles NEXT', ()=>{
    const initialState = fromJS({
      entries:['Sufjan Stevens', 'The Avalanches']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Sufjan Stevens', 'The Avalanches']
      },
      entries: []
    }));
  });


  it('handles VOTE', ()=>{
    const initialState = fromJS({
      vote:{
        pair: ['Sufjan Stevens', 'The Avalanches']
      },
      entries:[]
    });
    const action = {type: 'VOTE', entry:'Sufjan Stevens'}
    const nextState = reducer(initialState, action);


    expect(nextState).to.equal(fromJS({
      vote:{
        pair:['Sufjan Stevens', 'The Avalanches'],
        tally: {
          'Sufjan Stevens': 1
        }
      },
      entries: []
    }));
  });


  it('handles initial states', ()=>{
    const action = {type: 'SET_ENTRIES', entries:['Sufjan Stevens', 'The Avalanches']};
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries:['Sufjan Stevens', 'The Avalanches']
    }));
  });


  it('can be used with reduce', ()=>{
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Sufjan Stevens', 'The Avalanches']},
      {type: 'NEXT'},
      {type: 'VOTE', entry:'Sufjan Stevens'},
      {type: 'VOTE', entry:'The Avalanches'},
      {type: 'VOTE', entry:'Sufjan Stevens'},
      {type: 'NEXT'}
    ];
    //arr.reduce(callback function, initialvalue)
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'Sufjan Stevens'
    }));
  });

})
