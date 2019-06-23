<template>
  <div class="brand" app>
    <h1>Feedler</h1>
    <div class="banner">
      <p class="banner-text">A simple and easy Feed Reader for your daily dose of news.</p>
      <router-link :to="{name: 'feed'}">
        <button class="banner-btn">Get Started</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",

  async created() {
    const url = "http://localhost:3000/api/syncFeed";

    await axios.get(url);
  }
};
</script>

<style>
.brand {
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 20px 30px;
}

.brand h1 {
  color: #ffc400;
  font-family: "Roboto", sans-serif;
  font-size: 6rem;
}

.banner {
  margin: 7.5rem auto;
  width: 50vw;

  text-align: center;
  font-family: "Open Sans", sans-serif;
}

.banner-text {
  font-size: 3.2rem;
  color: #545454;
  margin: 0;
}

.banner-btn {
  border: 3px solid #ffc400;
  color: #545454;
  border-radius: 10px;
  font-size: 2.2rem;
  padding: 1rem 2.5rem;
  margin: 10rem 0 0 0;
}
.banner-btn:hover {
  background: #ffc400;
}
</style>
