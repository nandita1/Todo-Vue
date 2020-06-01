<template>
  <div class="outer">
    <div class="container">
      <h3>Yet Another Todo</h3>
      <app-new-todo @todoAdded="newTodo"></app-new-todo>
      <hr />
      <app-todos @todoDeleted="deleteTodo"></app-todos>
    </div>
  </div>
</template>

<script>
import NewTodo from "./NewTodo";
import Todos from "./Todos";
import { eventBus } from "../main";
export default {
  name: "home",
  methods: {
    newTodo(todo) {
      //this.todos.push(todo);
      //console.log(this.todos);
      eventBus.addTodos(todo);
    },
    deleteTodo(index) {
      //this.todos.splice(index, 1);
      eventBus.deleteTodos(index);
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
