<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$store.dispatch("fetchTodos");
    },
  };
</script>

<style></style>
