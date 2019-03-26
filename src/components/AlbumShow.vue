<template lang="html">
  <div class="photos container">
    <div class="row">
      <div class="col-md-6">
        <router-link :to="'/client/' + client_id + '/events/' + event_id + '/albums'" class="btn btn-light bg-white">
          voltar
        </router-link>
      </div>
      <div class="col-md-6">
        <img src="@/assets/ballon.png" class="ballon" />
      </div>
    </div>
    <div class="row justify-content-md-center mt-5">
      <div class="col-md-11 col-12">

        <viewer :images="photos">
          <div v-masonry transition-duration="0.3s" item-selector=".item">
            <div v-masonry-tile class="item" v-for="(item, index) in photos">
              <img :src="item.image_url" :key="item .image_url" class="img-thumbnail mr-2">
            </div>
          </div>
        </viewer>
      </div>
    </div>
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer)

export default {
  data () {
    return {
      photos: [],
      album_id: this.$route.params.album_id,
      client_id: this.$route.params.client_id,
      event_id: this.$route.params.event_id
    }
  },
  mounted () {
    this.getAlbums()
  },
  methods: {
    getAlbums () {
      this.$http.secured.get('/photos', {
        params: {
          album_id: this.album_id
        }
      }).then(response => {
        this.photos = response.data
      })
    }
  }
}
</script>

<style lang="scss">
.photos {
  .ballon {
    position: fixed;
    margin: -51px 0 0 176px;
    opacity: 0.7;
    z-index: 0;
  }
  a {
    text-decoration: none;
    text-transform: none;
    color: grey;
  }
  .link {
    width: 260px;
    height: 17vh;
    background-color: #F5F5F5;
    line-height: 16vh;
    font-size: 20px;
    font-weight: bold;
    color: #999999;
  }
  .img-thumbnail {
    // float: left;
    width: 15rem;
    margin-bottom: 30px;
    position: relative;
  }
}

@media (max-width: 575.98px) {
  .photos {
    .img-thumbnail {
      width: 100% !important;
    }
  }
}
</style>
