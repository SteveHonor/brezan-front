<template lang="html">
  <div class="albums">
    <div class="row">
      <div class="col-md-6">
        <router-link :to="'/admin/client/' + client_id + '/events'" class="btn btn-light bg-white">
          voltar
        </router-link>
      </div>
      <div class="col-md-6 text-right">
        <router-link :to="'albums/new'" class="btn btn-info">
          novo álbum
        </router-link>
      </div>
    </div>

    <div class="mt-3">
      <div class="row">
        <div class="col-lg-3 mb-4 text-center" v-for="album in albums">
          <span class="album-title">{{ album.name }}</span>
          <router-link
            :to="
              '/admin/client/' +
                client_id +
                '/events/' +
                event_id +
                '/albums/' +
                album.id
            "
          >
            <img :src="album.image_url" class="img-thumbnail mr-2" />
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      albums: [],
      client_id: this.$route.params.client_id,
      event_id: this.$route.params.event_id
    };
  },
  mounted() {
    this.getAlbums();
  },
  methods: {
    getAlbums() {
      this.$http
        .get("https://brezan.herokuapp.com/albums", {
          params: {
            event_id: this.event_id
          }
        })
        .then(response => {
          this.albums = response.body;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.albums {
  a {
    text-decoration: none;

  }
  .album-title {
    color: #424242;
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 5px;
    font-size: 18px;
    text-transform: lowercase;
    -webkit-box-shadow: inset 0px 0px 0 19px #ffffffa3;
    box-shadow: inset 0px 0px 0 19px #ffffffa3;
  }
}
</style>
