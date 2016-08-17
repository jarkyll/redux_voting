import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';


describe('application logic', ()=> {

  describe('setEntries', ()=> {

    it('adds the entries to the state with string key', ()=> {
      const state = Map();
      const entries = List.of('The Avalanches', 'Sufjan Stevens');
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        'entries': List.of('The Avalanches', 'Sufjan Stevens')
     }));
    });

    it('adds the entries to the state with non string key', ()=> {
      const state = Map();
      const entries = List.of('The Avalanches', 'Sufjan Stevens');        const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('The Avalanches', 'Sufjan Stevens')
      }));
    });


    it('converts to immutable', ()=>{
      const state = Map();
      const entries = ['The Avalanches', 'Sufjan Stevens'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        'entries': List.of('The Avalanches', 'Sufjan Stevens')
      }))
    });
  });


  describe('next', ()=>{
    // grabs the two entries and puts them up to be voted on
    it('takes the next two entries under vote', ()=>{
      const state = Map({
        entries: List.of('Sufjan Stevens', 'The Avalanches', 'Shugo Tokumaru')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Sufjan Stevens', 'The Avalanches')
        }),
        entries: List.of('Shugo Tokumaru')
      }));
    });


    it('puts the winner back in entries', ()=>{
      const state = Map({
        vote: Map({
          pair: List.of('Sufjan Stevens', 'The Avalanches'),
          tally: Map({
            'Sufjan Stevens': 4,
            'The Avalanches': 2
          })
        }),
        entries: List.of('Shugo Tokumaru', 'Toe', 'Yoko Kanno')
      });
      const nextState = next(state);
      expect(nextState).to.equal( Map({
        vote: Map({
          pair: List.of('Shugo Tokumaru', 'Toe')
        }),
        entries: List.of('Yoko Kanno', 'Sufjan Stevens')
      }));
    });

    it('puts both if tied back in the entries', ()=>{
      const state = Map({
        vote: Map({
          pair: List.of('Sufjan Stevens', 'The Avalanches'),
          tally: Map({
            'Sufjan Stevens': 3,
            'The Avalanches': 3
          })
        }),
        entries: List.of('Yoko Kanno', 'Shugo Tokumaru')
      });
      const nextState = next(state);
      expect(nextState).to.equal( Map({
        vote: Map({
          pair: List.of('Yoko Kanno', 'Shugo Tokumaru')
        }),
        entries: List.of('Sufjan Stevens', 'The Avalanches')
      }));

    })

    it('determines the winner when there 0 more entries', ()=>{
      const state = Map({
        vote: Map({
          pair: List.of('Shugo Tokumaru', 'Toe'),
          tally: Map({
            'Shugo Tokumaru': 4,
            'Toe': 3
          })
        }),
        entries: List()
      });
      const nextState = next(state)
      expect(nextState).to.equal(Map({
        winner: 'Shugo Tokumaru'
      }));
    });

  });

  describe('vote', ()=>{
    //it(string, function)
    it('creates a tally for the selected artist', ()=> {
      const state = Map({
          pair: List.of('Sufjan Stevens', 'The Avalanches'),
        });
      const nextState = vote(state, 'Sufjan Stevens')
      expect(nextState).to.equal( Map({
          pair: List.of('Sufjan Stevens', 'The Avalanches'),
          tally: Map({
            'Sufjan Stevens' : 1
          })
        }));
    });


    it('adds a tally for the selected artist', ()=>{
      const state = Map({
          pair: List.of('Sufjan Stevens', 'The Avalanches'),
          tally:Map({
            'Sufjan Stevens': 5,
            'The Avalanches': 3
          })
        });
      const nextState = vote(state, 'Sufjan Stevens')
      expect(nextState).to.equal(Map({
          pair: List.of('Sufjan Stevens', 'The Avalanches'),
          tally:Map({
            'Sufjan Stevens': 6,
            'The Avalanches': 3
          })
        }));
    });
  })

});
