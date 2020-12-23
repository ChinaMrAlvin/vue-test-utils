const _store = {
  state: {
    count: 0,
  },
  getters: {
    ['COUNT'](state) {
      return state.count;
    }
  },
  mutations: {
    ['M_INCREASE_COUNT'](state) {
      state.count++;
    },
    ['M_SET_COUNT'](state, payload) {
      state.count = payload;
    }
  },
  actions: {
    ['A_COUNT2_PAYLOAD']({ state, commit, rootState }, payload) {
      setTimeout(() => {
        commit('M_SET_COUNT', payload);
      })
    },
  }
};

module.exports = _store; // 这里用cjs规范，esm的引用传递会导致store不断变更
