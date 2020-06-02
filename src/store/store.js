import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    todos: [],
  },
  getters: {
    todos: (state) => state.todos.map((todo) => todo.title),
    getTodo: (state) => (index) => state.todos[index],
  },
  mutations: {
    addTodo: (state, payload) => {
      state.todos.push({
        title: payload,
        completed: false,
      });
    },
    deleteTodo: (state, index) => {
      state.todos.splice(index, 1);
    },
    fetchTodos: (state, payload) => {
      state.todos = [
        ...payload.slice(0, 10).map((todo) => {
          return {
            title: todo.title,
            completed: todo.completed,
          };
        }),
      ];
      console.log(state.todos);
    },
  },
  actions: {
    fetchTodos: ({ commit }) => {
      axios
        .get("http://jsonplaceholder.typicode.com/todos")
        .then((response) => {
          commit("fetchTodos", response.data);
          //console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
