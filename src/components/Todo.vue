<template>
  <div>
    <h1>{{ getTodo(this.$route.params.id) }}</h1>
  </div>
</template>
<script>
  import { mapGetters } from "vuex";
  export default {
    computed: {
      ...mapGetters(["getTodo"]),
    },
  };
</script>
