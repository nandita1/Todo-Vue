import Vue from 'vue'
import App from './App.vue'
import router from "./router";

export const eventBus = new Vue({
  data: {
    todos: []
  },
  methods: {
    addTodos(todo) {
      this.todos.push(todo)
      console.log(this.todos)
    },
    deleteTodos(index) {
      this.todos.splice(index, 1);
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')