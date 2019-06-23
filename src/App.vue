<template>
  <v-app>
    <Feed/>
  </v-app>
</template>

<script>
import Feed from "./views/Feed";

export default {
  name: "App",
  components: {
    Feed
  },
  data() {
    return {
      //
    };
  }
};
</script>
