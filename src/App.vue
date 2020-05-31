<template>
  <div class="outer">
    <div class="container">
      <h3>Yet Another Todo</h3>
      <app-new-todo @todoAdded="newTodo"></app-new-todo>
      <hr />
      <app-todos :todos="todos" @todoDeleted="deleteTodo"></app-todos>
    </div>
  </div>
</template>

<script>
import NewTodo from "./components/NewTodo";
import Todos from "./components/Todos";
export default {
  data() {
    return {
      todos: []
    };
  },
  methods: {
    newTodo(todo) {
      this.todos.push(todo);
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    }
  },
  components: {
    appNewTodo: NewTodo,
    appTodos: Todos
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}
.outer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fafafa;
}
.container {
  width: 300px;
  background-color: white;
  box-shadow: 0px 5px 10px gray;
  padding: 20px;
}
h3 {
  text-align: center;
  margin: 10px 0;
}
hr {
  margin: 20px 0;
  height: 0.5px;
  border-width: 0;
  color: #ccc;
  background-color: #ccc;
}
</style>
