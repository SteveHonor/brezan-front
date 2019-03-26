<template lang="html">
  <div class="photos">
    <router-link :to="'/admin/client/' + client_id + '/events/' + event_id + '/albums'" class="btn btn-light bg-white">
      voltar
    </router-link>
    <div class="mt-3">

        <!-- <div class="col-lg-3 mb-4 text-center" v-for="photo in photos">
        </div> -->

        <div v-masonry transition-duration="0.3s" item-selector=".item">
            <div v-masonry-tile class="item" v-for="(item, index) in photos">
              <img :src="item.image_url" class="img-thumbnail mr-2" />
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      photos: [],
      album_id: this.$route.params.album_id,
      client_id: this.$route.params.client_id,
      event_id: this.$route.params.event_id
    };
  },
  mounted() {
    this.$store.dispatch('setTitle', 'Fotos')
    this.getAlbums();
  },
  methods: {
    getAlbums() {
      this.$http.secured.get("/photos", {
          params: {
            album_id: this.album_id
          }
        })
        .then(response => {
          this.photos = response.data;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.photos {
  a {
    text-decoration: none;
    text-transform: none;
    color: grey;
  }
  .link {
    width: 260px;
    height: 17vh;
    background-color: #f5f5f5;
    line-height: 16vh;
    font-size: 20px;
    font-weight: bold;
    color: #999999;
  }
}
</style>
