// src/store/modules/articles.js
import { dummyArticles } from '@/data/dummyArticles'; // Import your dummy data
// import ApiService from '@/services/ApiService'; // Keep this if you plan to use a real API later

const state = {
  allArticles: [],
  status: 'idle', // 'idle', 'loading', 'success', 'error'
};

const getters = {
  allArticles: (state) => state.allArticles,
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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Use dummy data directly
      commit('SET_ARTICLES', dummyArticles);
      commit('SET_STATUS', 'success');

      // If you were to use a real API, it would look like this:
      // const response = await ApiService.getAllArticles();
      // commit('SET_ARTICLES', response.data);
      // commit('SET_STATUS', 'success');

    } catch (error) {
      console.error("Error fetching articles:", error);
      commit('SET_STATUS', 'error');
    }
  },
  // You might also need an action for fetching a single article if your ApiService
  // handles it differently than your main fetch.
  // For now, ArticleDetailView uses ApiService directly, so no change needed here for that.
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};