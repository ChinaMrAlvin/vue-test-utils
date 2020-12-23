import { expect } from 'chai';
import Vue from 'vue';
import Vuex from 'vuex';

const _store = require('../../store'); // 克隆一份_store

// mutations
describe('mutations', () => {
  let mutations;
  let store;

  beforeEach(() => {
    mutations = _store.mutations;
    Vue.use(Vuex);
    store = new Vuex.Store(_store);
  })
  it('mutations: increase', () => {
    mutations.M_INCREASE_COUNT(store.state);
    expect(store.state.count).to.equal(1);
  })
});

// getters
describe('getters', () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = _store.getters;
    Vue.use(Vuex);
    store = new Vuex.Store(_store);
  })

  it( "getters:count", () => {
    expect(getters.COUNT(store.state)).equal(1)
  })
})

// actions
describe('actions', () => {
  let actions;
  let store;
  beforeEach(() => {
    actions = _store.actions;
    Vue.use(Vuex);
    store = new Vuex.Store(_store);
  });
  
  const testAction = (action, payload, state, expectedMutations, done) => {

    let mumber = 0;

    const commit = (type, payload) => {
      const mutation = expectedMutations[mumber]
      try {
        expect(type).to.equal(mutation.type)
        expect(payload).to.deep.equal(mutation.payload)
      } catch (error) {
        done(error)
      }
  
      mumber++
      if (mumber >= expectedMutations.length) {
        done()
      }
    }
  
    // call the action with mocked store and arguments
    action({ commit, state }, payload)
  
    // check if no mutations should have been dispatched
    if (expectedMutations.length === 0) {
      expect(count).to.equal(0)
      done()
    }
  }
  it("actions: count", done => {
    testAction(actions.A_COUNT2_PAYLOAD, 10, store.state, [
      { type: 'M_SET_COUNT', payload: 10 } // 10: mocked-api-response 
    ], done);
  })
})
