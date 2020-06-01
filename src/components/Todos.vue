<template>
  <div>
    <ul v-if="todos.length > 0">
      <li v-for="(todo, i) in todos" :key="i">
        <router-link :to="'/todo/' + i" class="link" :key="i">{{
          todo
        }}</router-link>
        <span>
          <img src="../assets/dustbin.svg" @click="deleteTodo(i)" />
        </span>
      </li>
    </ul>
    <div class="noTodos" v-else>No Todos here yet!</div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    computed: {
      ...mapGetters(["todos"]),
    },
    methods: {
      deleteTodo(index) {
        this.$store.commit("deleteTodo", index);
      },
    },
  };
</script>

<style>
  li {
    list-style: none;
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    cursor: pointer;
  }
  .noTodos {
    text-align: center;
  }
  img {
    width: 15px;
    height: 20px;
    cursor: pointer;
  }
  .link {
    flex: 1;
    text-decoration: none;
  }
  .link:visited {
    color: black;
  }
</style>
