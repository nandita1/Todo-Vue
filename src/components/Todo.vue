<template>
  <div>
    <h1>{{todo}}</h1>
  </div>
</template>
<script>
import { eventBus } from "../main";
export default {
  data() {
    return {
      todo: ""
    };
  },
  created() {
    console.log(this.$route.params.id);
    this.todo = eventBus.todos[this.$route.params.id];
  }
};
</script>

