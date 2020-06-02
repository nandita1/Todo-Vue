import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {
  v4 as uuidv4
} from "uuid";

Vue.use(Vuex);


function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const idA = a.id;
  const idB = b.id;

  let comparison = 0;
  if (idA > idB) {
    comparison = 1;
  } else if (idA < idB) {
    comparison = -1;
  }
  return comparison * -1;
}

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
      state.todos.unshift(newTodo);
    },
    deleteTodo: (state, index) => {
      state.todos.splice(index, 1);
    },
    fetchTodos: (state, payload) => {
      payload.sort(compare)
      state.todos = [...payload];
      //console.log(state.todos);
    },
    updateTodo: (state, payload) => {
      Vue.set(state.todos, 0, {
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
    }, obj) => {
      console.log(obj);
      commit("deleteTodo", obj.index);
      fetch("https://rocky-anchorage-71862.herokuapp.com/todos/" + obj.id, {
          method: "DELETE",
        })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});