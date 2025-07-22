import ApiService from '@/services/ApiService';
import StorageService from '@/services/StorageService';

// Ambil data awal dari localStorage secara aman
const user = StorageService.get('user');
const token = StorageService.get('token');

const state = {
  user: user,
  token: token,
  status: 'idle', // idle | loading | success | error
};

const getters = {
  isLoggedIn: state => !!state.token,
  isAdmin: state => state.user && state.user.role === 'admin',
  authStatus: state => state.status,
  currentUser: state => state.user,
};

const actions = {
  async register({ commit }, userData) {
    commit('SET_STATUS', 'loading');
    try {
      const response = await ApiService.register(userData);
      const { id, name, email, role, token } = response.data;

      if (!token || !id) throw new Error('Invalid registration response');

      const userPayload = { id, name, email, role };

      StorageService.set('user', userPayload);
      StorageService.set('token', token);

      commit('AUTH_SUCCESS', { user: userPayload, token });
      return response;
    } catch (error) {
      commit('AUTH_ERROR');
      StorageService.remove('user');
      StorageService.remove('token');
      throw error;
    }
  },

  async login({ commit }, userData) {
    commit('SET_STATUS', 'loading');
    try {
      const response = await ApiService.login(userData);
      const { id, name, email, role, token } = response.data;

      if (!token || !id) throw new Error('Invalid login response');

      const userPayload = { id, name, email, role };

      StorageService.set('user', userPayload);
      StorageService.set('token', token);

      commit('AUTH_SUCCESS', { user: userPayload, token });
      return response;
    } catch (error) {
      commit('AUTH_ERROR');
      StorageService.remove('user');
      StorageService.remove('token');
      throw error;
    }
  },

  logout({ commit }) {
    commit('LOGOUT');
    StorageService.remove('user');
    StorageService.remove('token');
  },
};

const mutations = {
  SET_STATUS(state, status) {
    state.status = status;
  },
  AUTH_SUCCESS(state, { user, token }) {
    state.status = 'success';
    state.user = user;
    state.token = token;
  },
  AUTH_ERROR(state) {
    state.status = 'error';
    state.user = null;
    state.token = null;
  },
  LOGOUT(state) {
    state.status = 'idle';
    state.user = null;
    state.token = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
