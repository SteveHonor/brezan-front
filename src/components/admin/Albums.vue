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
          <div class="card">

            <div class="card-body">

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
            <span class="album-title float-left">{{ album.name }}</span>
            <button type="button" class="btn btn-sm btn-light float-right" @click="deleteAlbum(album.id)">
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>
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
    this.$store.dispatch('setTitle', 'Albums')
    this.getAlbums();
  },
  methods: {
    getAlbums() {
      this.$http.secured.get("/albums", {
        params: {
          event_id: this.event_id
        }
      })
      .then(response => {
        this.albums = response.data;

        if (this.albums.length == 0) {
          this.$router.replace('/admin/client/' + this.client_id + '/events/' + this.event_id + '/albums/new')
        }
      });
    },
    deleteAlbum(id) {
      this.$http.secured.delete("/albums/" + id).then(response => {
        this.getAlbums();
      });
    },
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
