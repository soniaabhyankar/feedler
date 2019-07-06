<template>
  <div>
    <!-- <div class="flex-feed"> -->
    <SidePanel app />
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
.flex-feed {
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  /* align-items: center; */
  background: #000;
  border: solid 2px red;
}
.flex-item-left {
  display: flex;
  justify-content: center;
  /* align-items: center; */
  width: 30%;
  border: 2px solid black;
}
.flex-item-right {
  display: inline-block;
  width: 70%;
  margin: 0 0 0 40px;
  border: 2px solid red;
}
div {
  background: #fff;
}
</style>