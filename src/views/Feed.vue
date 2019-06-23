<template>
  <v-app>
    <FeedComponent/>
  </v-app>
</template>

<script>
import FeedComponent from "../components/FeedComponent";

export default {
  name: "Feed",
  components: {
    FeedComponent
  }
};
</script>