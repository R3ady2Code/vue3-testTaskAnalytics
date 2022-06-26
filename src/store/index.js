import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    data: [],
  },
  getters: {
    getData(state) {
      return state.data;
    },
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    },
  },
  actions: {
    async fetchData({ commit }) {
      return axios('http://localhost:3001/data').then((res) => {
        const data = res.data.map((i) => ({ ...i, date: new Date(i.date) }));
        commit('setData', data);
      });
    },
  },
});
