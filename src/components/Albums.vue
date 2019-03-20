<template lang="html">
  <div class="albums container">
    <router-link :to="'/client/' + client_id + '/events'" class="btn btn-light bg-white">
      voltar
    </router-link>

    <div class="mt-3">
      <div class="row">

        <div class="col-lg-3 mb-4 album text-center" v-for="album in albums">
          <span class="album-title">{{ album.name }}</span>
          <router-link :to="'/client/' + client_id + '/events/' + event_id + '/albums/'+ album.id">
            <img :src="album.image_url" class="img-thumbnail mr-2" >
          </router-link>
        </div>

      </div>
    </div>
    <div class="footer">
      <img src="@/assets/footer.png" alt="logo" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      albums: [],
      client_id: this.$route.params.client_id,
      event_id: this.$route.params.event_id
    }
  },
  mounted () {
    this.getAlbums()
  },
  methods: {
    getAlbums () {
      this.$http.get('https://brezan.herokuapp.com/albums', {
        params: {
          event_id: this.event_id
        }
      }).then(response => {
        this.albums = response.body
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.albums {
  .album {
    z-index: 999;
  }
  a {
    text-decoration: none;
    text-transform: none;
    color: grey;
  }
  .link {
    width: 260px;
    height: 150px;
    background-color: #F5F5F5;
    line-height: 140px;
    font-size: 20px;
    font-weight: bold;
    color: #999999;
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

.footer {
  /* background-color: #f9f9f9; */
  /* border-top: 1px solid rgba(0, 0, 0, 0.05); */
  opacity: 0.2;
  bottom: 0;
  /* color: #1d1e3a; */
  text-align: center;
  /* padding: 20px 30px; */
  position: absolute;
  right: 0;
  position: fixed;
  /* left: 240px; */
  width: 100%;
  z-index: 0;
}
</style>
