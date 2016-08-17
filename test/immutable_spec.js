import {expect} from 'chai';
import {List, Map} from 'immutable';


describe('immutability', () => {
  describe('a number', () => {
    function increment(currentState){
      return currentState + 1;
      //you return a new number that is current + 1
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });


  describe('A list', () => {
    function addArtist(currentState, artist){
      return currentState.push(artist);
    }
    it('is immutable', () => {
      let state = List.of('The Avalanches', 'Sufjan Stevens');
      let nextState = addArtist(state, 'Shugo Tokumaru');


      expect(nextState).to.equal(List.of('The Avalanches', 'Sufjan Stevens', 'Shugo Tokumaru'));
      expect(state).to.equal(List.of('The Avalanches', 'Sufjan Stevens'));
    });

  });


  describe('A map', ()=>{
    function addArtist(currentState, artist){
      return currentState.set('artists', currentState.get('artists').push(artist));
    };

    it('is immutable', ()=>{
      let state = Map({'artists': List.of('The Avalanches', 'Sufjan Stevens')});
      let nextState = addArtist(state, 'Shugo Tokumaru');

      expect(state).to.equal(Map({'artists': List.of('The Avalanches', 'Sufjan Stevens')}))
      expect(nextState).to.equal(Map({'artists': List.of('The Avalanches', 'Sufjan Stevens', 'Shugo Tokumaru')}))

    })

  })


});
