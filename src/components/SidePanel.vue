<template>
  <!-- <v-toolbar fixed scroll-off-screen scroll-threshold="300" class="brand-nav">
    <v-toolbar-side-icon large class="brand-nav-icon"></v-toolbar-side-icon>
    <v-toolbar-title md- class="brand-name">Feedler</v-toolbar-title>
  </v-toolbar>-->
  <div class="side-nav">
    <!-- <v-list>
      <v-list-tile class="tile">
        <a href="http://localhost:8080/feed">
          <v-list-tile-title class="title">Feeds</v-list-tile-title>
        </a>

        <v-list-tile-action>
          <v-icon>add</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-tile v-for="item in items" :key="item.title" class="tile">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>-->
    <a href="http://localhost:8080/feed" class="brand-name">Feedler</a>

    <ul>
      <li v-for="provider in providers" :key="provider._id">
        <div class="tile">
          <button class="iconss" @click="changeIcon($event)">
            <!-- $emit('subscribe(provider._id, $event)'),'changeIcon($event)'" -->
            <v-icon color="#f2f2f2" size="1.25rem">visibility</v-icon>
          </button>
          <a :href="provider.link" target="_blank" class="title">{{provider.name}}</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Provider from "../services/ProviderService";
import Feed from "../FeedService";

export default {
  name: "SidePanel",
  data() {
    return {
      providers: {},
      error: "",
      flag: true
    };
  },
  async mounted() {
    try {
      //console.log("helooo");
      this.providers = await Provider.getProviders();
    } catch (error) {
      this.error = error.message;
    }
  },
  methods: {
    subscribe: async function(providerID, event) {
      // console.log(val);
      // Provider.subscribeProvider(val);
      // try {
      //   //console.log("helooo");
      //   this.providers = {};
      //   this.providers = Provider.getProviders();
      // } catch (error) {
      //   this.error = error.message;
      // }
      this.flag = !this.flag;
      await Feed.susbscribe();
      console.log(event.target);
      // try {
      //   console.log("in vue" + this.flag);
      //   this.providers = {};
      //   this.providers = await Provider.subscribeProvider(val, this.flag);
      // } catch (error) {
      //   this.error = error.message;
      // }
    },
    changeIcon: function(event) {
      if (event.target.innerHTML == "visibility_off") {
        event.target.innerHTML = "visibility";
      } else if (event.target.innerHTML == "visibility") {
        event.target.innerHTML = "visibility_off";
      }
    }
  }
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
.brand-name {
  color: #ffc400;
  font-family: "Roboto", sans-serif;
  font-size: 5rem;
  /* border: 2px solid red; */
  margin: 30px;
}
.side-nav {
  display: inline-block;
  width: 20%;
  /* border: 2px solid black; */
  position: fixed;
  height: 100vh;
  background: #545454;
  /* position: relative; */
  /* height: 100vh; */
}
a {
  text-decoration: none;
}
ul {
  list-style: none;
  padding: 0;
  /* border: 2px solid red; */
}
.tile {
  background: #545454;
  padding: 0;
  margin: 1rem;
  margin-top: 1.5rem;
  font-size: 1.2rem;
  color: #f2f2f2;
  /* border: 2px solid red; */
}
.iconss {
  /* margin-left: 1rem; */
  margin-right: 1rem;
  /* border: 2px solid blue; */
}
.title {
  color: #f2f2f2;
  margin-top: 1.5rem;
  /* padding: 1.5rem; */
}
.title:hover {
  color: #ffc400;
}
.title1 {
  color: #f2f2f2;
  margin: 1.5rem;
  font-size: 1.7rem;
}
.title1:hover {
  color: #ffc400;
}
#addFeed {
  color: blue;
}
</style>