<template>
  <div id="app">
    <div v-if="signin() == true && isAdmin() == true && client() == false" class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block sidebar">
          <div class="topbar-left">
            <div class="text-center">
              <a href="index.html" class="logo align-middle">
                <img src="./assets/logo.png" height="42" alt="logo" />
              </a>
            </div>
            <div class="sidebar-sticky">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <router-link class="nav-link active" to="'/clients'">
                    <i class="fa fa-user"></i> Clientes
                  </router-link>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="http://www.crescer.fot.br/index.html">
                    <i class="fa fa-cookie-bite"></i> Site
                  </a>
                </li>
                <li class="nav-item">
                  <button class="btn nav-link btn-link" @click="signOut()">
                    <i class="fa fa-power-off"></i> sair
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div class="col-md-10 col-md-9 ml-sm-auto col-lg-10 px-4">
          <div class="container p-3">
            <div class="topbar">
              <nav class="navbar-custom">
                <ul class="list-inline float-right mb-0">
                  <li class="list-inline-item dropdown notification-list"></li>

                  <li class="list-inline-item dropdown notification-list"></li>
                </ul>

                <ul class="list-inline menu-left mb-0">
                  <li class="hide-phone list-inline-item app-search">
                    <h3 class="page-title">{{ title() }}</h3>
                  </li>
                </ul>

                <div class="clearfix"></div>
              </nav>
            </div>

            <router-view />
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="(signin() == true && isAdmin() == false) || client() == true" class="container-fluid">
      <div class="text-center p-5">
        <img src="./assets/logo.png" height="42" alt="logo" />
      </div>
      <router-view />
    </div>

    <div class="container" v-else-if="signin() == false">
      <div class="row justify-content-md-center">
        <div class="col-lg-5">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../node_modules/bootstrap/dist/js/bootstrap.js";

export default {
  name: "App",
  methods: {
    signOut () {
      this.$store.dispatch('logout')
      this.$router.replace('/signin')
    },
    signin () {
      return this.$store.getters.signedIn
    },
    isAdmin () {
      return this.$store.getters.isAdmin
    },
    client () {
      return this.$store.getters.isClient
    },
    title () {
      return this.$store.getters.title
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:100,300,400");
@import "../node_modules/bootstrap/dist/css/bootstrap.css";
@import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
@import "./assets/css/style.scss";

html {
  overflow-x: hidden;
  position: relative;
  min-height: 100%;

  body {
    font-family: "Montserrat", sans-serif;
    background-color: #fafafa;

    .main {
      margin-left: 230px;
    }
    .sidebar {
      position: fixed;
      display: flex;
      flex-direction: column;
      padding-left: 0;
      margin-bottom: 0;
      background-color: #f0f1f4;
      min-height: 100vh;
    }

    .topbar {
      .navbar-custom {
        padding: 20px;
        background-color: #f0f1f4;
        border: none;
        margin-bottom: 15px;
      }
    }
  }
}
</style>
