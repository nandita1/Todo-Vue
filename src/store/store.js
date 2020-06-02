import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {
  v4 as uuidv4
} from "uuid";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    todos: [],
  },
  getters: {
    todos: (state) => state.todos,
    getTodo: (state) => (id) => {
      //console.log(Array.from(state.todos))
      for (let todo of Array.from(state.todos)) {
        //console.log(todo.id)
        if (todo.id == id) {
          //console.log(id)
          return todo;
        }
      }
      //return state.todos.find(todo => todo.id === id)
    }
  },
  mutations: {
    addTodo: (state, payload) => {
      const newTodo = {
        id: uuidv4(),
        name: payload,
        completed: false,
        loading: true
      };
      state.todos.push(newTodo);
    },
    deleteTodo: (state, id) => {
      for (let i = 0; i < state.todos.length; i++) {
        if (state.todos[i].id == id) {
          state.todos.splice(i, 1);
          return;
        }
      }
    },
    fetchTodos: (state, payload) => {
      state.todos = [...payload];
      console.log(state.todos);
    },
    updateTodo: (state, payload) => {
      Vue.set(state.todos, state.todos.length - 1, {
        ...payload,
        loading: false
      })
    },
  },
  actions: {
    fetchTodos: ({
      commit
    }) => {
      axios
        .get("https://rocky-anchorage-71862.herokuapp.com/todos")
        .then((response) => {
          commit("fetchTodos", response.data);
          //console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addTodo: ({
      commit
    }, payload) => {
      commit("addTodo", payload);
      fetch("https://rocky-anchorage-71862.herokuapp.com/todos", {
          method: "POST",
          body: JSON.stringify({
            name: payload,
            completed: false,
          }),
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .then((response) => response.json())
        .then((response) => {
          commit("updateTodo", response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteTodo: ({
      commit
    }, id) => {
      console.log(id);
      fetch("https://rocky-anchorage-71862.herokuapp.com/todos/" + id, {
          method: "DELETE",
        })
        .then((response) => response.json())
        .then((response) => {
          commit("deleteTodo", id);
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});