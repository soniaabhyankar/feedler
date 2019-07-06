<template>
  <div class="card-container">
    <button class="visibility" @click="handleClick($event)">
      <v-icon color="#ffc400">visibility</v-icon>
    </button>
    <div class="card-grid" v-if="this.visibility==true">
      <div class="card" v-for="(feed, index) in feeds" :item="feed" :index="index" :key="feed._id">
        <a :href="feed.link" class="card-link" target="_blank">
          <img :src="feed.imgSrc" />
          <div class="card-text">
            <p class="card-title">{{feed.title}}</p>
            <p class="card-subtitle">
              <span>{{feed.name}}</span>
              <span>|</span>
              <span
                :title="'Received Date : ' + feed.receivedDate + '\nPublished Date : ' + feed.publishedDate"
              >{{feed.publishedDate}}</span>
            </p>
            <p class="card-content">
              {{(feed.content.length >= 500) ? feed.content.substring(0,500) : feed.content}}
              <a
                :href="feed.link"
                target="_blank"
              >Continue Reading..</a>
            </p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Feed from "../services/FeedService";

export default {
  name: "FeedComponent",

  data() {
    return {
      feeds: [],
      error: "",
      visibility: true,
      imgSrc: "../assets/jellyfish.png"
    };
  },
  async mounted() {
    try {
      this.feeds = await Feed.loadFeed();
      //   this.feeds.filter(a => a.content.length <= 500);
      console.log(this.feeds);
    } catch (error) {
      this.error = error.message;
    }
  },
  methods: {
    handleClick: function(event) {
      this.changeIcon(event);
    },
    changeIcon: function(event) {
      if (event.target.innerHTML == "visibility_off") {
        event.target.innerHTML = "visibility";
        this.visibility = true;
      } else if (event.target.innerHTML == "visibility") {
        event.target.innerHTML = "visibility_off";
        this.visibility = false;
      }
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap");

.card-container {
  display: inline-block;
  position: absolute;
  top: 0;
  right: 5vw;
  width: 90%;
  margin: 0;
  padding: 70px;
  background: #fff;
  /* border: solid 1px red; */
}
.visibility {
  /* border: solid 2px red; */
  top: 6px;
  right: 0;
  position: absolute;
  text-decoration: none;
}
button:focus {
  outline: none;
}
.visibility i {
  font-size: 2.8rem;
}
.card-grid {
  display: grid;
  width: 100%;

  grid-template-columns: 1fr 1fr;
  grid-gap: 80px 100px;
}
.card {
  box-sizing: border-box;
  border-radius: 5px;
  max-height: 100%;
  box-shadow: 0px 0px 10px #949494;
  transition: ease-in-out 0.1s;
  /* border: solid 1px red; */
}

.card-link {
  text-decoration: none;
}
.card-text {
  padding: 10px;
  font-family: "Open Sans", sans-serif;
}
.card-title {
  color: #141414;
  font-size: 1.5rem;
  font-weight: 700;
}
.card-subtitle {
  color: #aaaaaa;
  font-size: 0.9rem;
}
.card-subtitle span {
  margin: 0 5px 0 0;
}
.card-content {
  color: #383838;
  font-weight: 550;
}
.card-content a {
  color: #545454;
  text-decoration: underline solid #545454;
}
.card-content a:hover {
  color: #ffc400;
  text-decoration: underline solid #545454;
}
.card:hover {
  transform: translateY(-5px);
}

img {
  width: 100%;
  max-height: 250px;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
}

/* media queries */

@media screen and (min-width: 400px) {
  .card-container {
    width: 60%;
  }
  .card-grid {
    grid-template-columns: 1fr;
  }
}
@media screen and (min-width: 900px) {
  .card-container {
    width: 50%;
  }
  .card-grid {
    grid-template-columns: 1fr;
  }
}
@media screen and (min-width: 1280px) {
  .card-container {
    width: 70%;
  }
  .card-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
