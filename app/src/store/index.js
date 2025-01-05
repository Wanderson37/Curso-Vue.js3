import { createStore } from 'vuex'
import axios from 'axios';
const apiUrl = process.env.VUE_APP_API_URL;

export default createStore({
  state: {
    todos: []
  },
  getters: {
  },
  mutations: {
    storeTodos(state, payload) {
      state.todos = payload
    },

    storeTodo(state, payload) {
      const index = state.todos.findIndex(todo => todo.id === payload.id)
      if (index >= 0) {
        state.todos.splice(index, 1, payload)
        return
      } else { state.todos.push(payload) }
    },
    deleteTodo (state, id) {
      const index = state.todos.findIndex(todo => todo.id === id)
      if (index >= 0) {
        state.todos.splice(index, 1)
        }
      },
  },
  actions: {
    getTodos({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          return axios.get(`${apiUrl}/todos`)
            .then((response) => {
              commit('storeTodos', response.data)
              resolve()
            })
        }, 1000)
      })
    },
    addTodo({ commit }, data) {
      return axios.post(`${apiUrl}/todos`, data).then((response) => {
          commit('storeTodo', response.data)
      });
    },
    updateTodo({ commit }, { id, data }) {
      return axios.put(`${apiUrl}/todos/${id}`, data).then((response) => {
        commit('storeTodo', response.data)
      })
    },
    deleteTodo({ commit },  id) {
      return axios.delete(`${apiUrl}/todos/${id}`).then(() => {
        commit('deleteTodo', id)
      })
    }
  },
  modules: {
  },
})