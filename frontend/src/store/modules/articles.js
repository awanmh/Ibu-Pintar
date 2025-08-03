// src/store/modules/articles.js
import ApiService from '@/services/ApiService';

const state = {
  allArticles: [],
  status: 'idle', // 'idle', 'loading', 'success', 'error'
};

const getters = {
  allArticles: (state) => state.allArticles,
  articleStatus: (state) => state.status,
};

const mutations = {
  SET_ARTICLES(state, articles) {
    state.allArticles = articles;
  },
  SET_STATUS(state, status) {
    state.status = status;
  },
};

const actions = {
  async fetchArticles({ commit }) {
    commit('SET_STATUS', 'loading');
    try {
      // Mengambil data dari API, bukan lagi dari dummy data
      const response = await ApiService.getArticles();
      commit('SET_ARTICLES', response.data);
      commit('SET_STATUS', 'success');
    } catch (error) {
      console.error("Error fetching articles:", error);
      commit('SET_STATUS', 'error');
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
