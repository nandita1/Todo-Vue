import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        todos: []
    },
    getters: {
        todos: state => state.todos,
        getTodo: state => index => state.todos[index]
    },
    mutations: {
        addTodo: (state, payload) => {
            state.todos.push(payload)
        },
        deleteTodo: (state, index) => {
            state.todos.splice(index, 1)
        }
    }
});