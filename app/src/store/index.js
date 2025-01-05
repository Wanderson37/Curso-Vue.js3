import { createStore } from 'vuex'
import axios from 'axios';

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
          return axios.get('http://localhost:3000/todos')
            .then((response) => {
              commit('storeTodos', response.data)
              resolve()
            })
        }, 1000)
      })
    },
    addTodo({ commit }, data) {
      return axios.post('https://todo-list37.vercel.app/', data).then((response) => {
          commit('storeTodo', response.data)
      });
    },
    updateTodo({ commit }, { id, data }) {
      return axios.put(`https://todo-list37.vercel.app/${id}`, data).then((response) => {
        commit('storeTodo', response.data)
      })
    },
    deleteTodo({ commit },  id) {
      return axios.delete(`https://todo-list37.vercel.app/${id}`).then(() => {
        commit('deleteTodo', id)
      })
    }
  },
  modules: {
  },
})