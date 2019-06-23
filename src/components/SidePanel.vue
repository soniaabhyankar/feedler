<template>
  <!-- <v-toolbar fixed scroll-off-screen scroll-threshold="300" class="brand-nav">
    <v-toolbar-side-icon large class="brand-nav-icon"></v-toolbar-side-icon>
    <v-toolbar-title md- class="brand-name">Feedler</v-toolbar-title>
  </v-toolbar>-->
  <div class="side-nav">
    <p>test</p>
  </div>
</template>

<script>
export default {
  name: "SidePanel"
};
</script>

<style>
/* .brand-nav {
  border: 2px solid red;
  box-shadow: none;
  margin: 20px 0;
  padding: 30px;
}

.brand-nav-icon i {
  border: 2px solid red;
  font-size: 40px;
}
.brand-name {
  font-size: 4rem;
  margin: 40px 20px;
  border: 2px solid red;
} */
.side-nav {
  display: inline-block;
  width: 20%;
  border: 2px solid black;
  position: fixed;
  height: 100vh;
  /* position: relative; */
  /* height: 100vh; */
}
</style>