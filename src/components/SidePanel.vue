<template>
  <div class="side-nav">
    <a href="http://localhost:8080/feed" class="brand-name">Feedler</a>

    <ul>
      <li v-for="provider in providers" :key="provider._id">
        <div class="tile">
          <!-- <button class="iconss" @click="changeIcon($event)">
            <v-icon color="#f2f2f2" size="1.25rem">visibility</v-icon>
          </button>-->
          <a
            :href="provider.websiteLink"
            target="_blank"
            class="title"
            :title="'Last Updated : ' + provider.lastUpdateDate + '\nLast Record Updated : ' + provider.lastRecordUD + '\nNo. of records updated : ' + provider.noOfRecords"
          >{{provider.name}}</a>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import Provider from "../services/ProviderService";

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
      this.providers = await Provider.getProviders();
    } catch (error) {
      this.error = error.message;
    }
  },
  methods: {
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
.brand-name {
  color: #ffc400;
  font-family: "Roboto", sans-serif;
  font-size: 5rem;
  margin: 30px;
}
.side-nav {
  display: inline-block;
  width: 20%;
  position: fixed;
  height: 100vh;
  background: #545454;
}
a {
  text-decoration: none;
}
ul {
  list-style: none;
  padding: 0;
}
.tile {
  background: #545454;
  padding: 0;
  margin: 1rem;
  margin-top: 1.5rem;
  font-size: 1.2rem;
  color: #f2f2f2;
}
.title {
  color: #f2f2f2;
  margin-top: 1.5rem;
}
.title:hover {
  color: #ffc400;
}
</style>