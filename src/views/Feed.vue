<template>
  <div>
    <!-- <div class="flex-feed"> -->
    <!-- <SidePanel app /> -->
    <!-- <v-spacing m-2 class="flex-item-right"></v-spacing> -->
    <FeedComponent app />
    <!-- </div> -->
  </div>
</template>

<script>
import FeedComponent from "../components/FeedComponent";
import SidePanel from "../components/SidePanel";

export default {
  name: "Feed",
  components: {
    FeedComponent,
    SidePanel
  }
};
</script>
<style>
div {
  background: #fff;
}
</style>