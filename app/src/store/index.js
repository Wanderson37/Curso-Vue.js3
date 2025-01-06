import { createStore } from 'vuex'
//import axios from 'axios';


export default createStore({
  state: {
    todos: JSON.parse(localStorage.getItem('todos')) || []
  },
  mutations: {
    storeTodos (state, todos) {
      state.todos = todos
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    storeTodo (state, todo) {
      state.todos.push(todo)
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    updateTodo (state, updatedTodo) {
      const index = state.todos.findIndex(todo => todo.id === updatedTodo.id)
      if (index !== -1) {
        state.todos.splice(index, 1, updatedTodo)
        localStorage.setItem('todos', JSON.stringify(state.todos))
      }
    },
    deleteTodo (state, id) {
      const index = state.todos.findIndex(todo => todo.id === id)
      if (index >= 0) {
        state.todos.splice(index, 1)
        localStorage.setItem('todos', JSON.stringify(state.todos))
      }
    }
  },
  actions: {
    getTodos({ commit }) {
      return new Promise((resolve) => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || []
        commit('storeTodos', storedTodos)
        resolve()
      })
    },
    addTodo ({ commit }, data) {
      const newTodo = {
        id: Date.now(),
        ...data
      }
      commit('storeTodo', newTodo)
    },
    updateTodo ({ commit }, { id, data }) {
      const updatedTodo = {
        id,
        ...data
      }
      commit('updateTodo', updatedTodo)
    },
    deleteTodo ({ commit }, id) {
      commit('deleteTodo', id)
    }
  },
  modules: {}
})
// export default createStore({
//   state: {
//     todos: []
//   },
//   getters: {
//   },
//   mutations: {
//     storeTodos(state, payload) {
//       state.todos = payload
//     },

//     storeTodo(state, payload) {
//       const index = state.todos.findIndex(todo => todo.id === payload.id)
//       if (index >= 0) {
//         state.todos.splice(index, 1, payload)
//         return
//       } else { state.todos.push(payload) }
//     },
//     deleteTodo (state, id) {
//       const index = state.todos.findIndex(todo => todo.id === id)
//       if (index >= 0) {
//         state.todos.splice(index, 1)
//         }
//       },
//   },
//   actions: {
//     getTodos({ commit }) {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           return axios.get('http://localhost:3000/todos')
//             .then((response) => {
//               commit('storeTodos', response.data)
//               resolve()
//             })
//         }, 1000)
//       })
//     },
//     addTodo({ commit }, data) {
//       return axios.post('http://localhost:3000/todos', data).then((response) => {
//           commit('storeTodo', response.data)
//       });
//     },
//     updateTodo({ commit }, { id, data }) {
//       return axios.put(`http://localhost:3000/todos/${id}`, data).then((response) => {
//         commit('storeTodo', response.data)
//       })
//     },
//     deleteTodo({ commit },  id) {
//       return axios.delete(`http://localhost:3000/todos/${id}`).then(() => {
//         commit('deleteTodo', id)
//       })
//     }
//   },
//   modules: {
//   },
// })