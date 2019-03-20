<template>
  <div id="app">
    <div v-if="signin() == 'true' && isAdmin() == 'true'" class="container-fluid">
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
                  <a class="nav-link active" href="#">
                    <i class="fa fa-user"></i> Clientes
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <i class="fa fa-key"></i> Acessos
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <i class="fa fa-cookie-bite"></i> Site
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <i class="fa fa-power-off"></i> sair
                  </a>
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
                    <h3 class="page-title">{{ title }}</h3>
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
    <div v-else-if="signin() == 'true' && isAdmin() == 'false'" class="container-fluid">
      <div class="text-center p-5">
        <img src="./assets/logo.png" height="42" alt="logo" />
      </div>
      <router-view />
    </div>
    <div class="container" v-else>
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
  data() {
    return {
      title: localStorage.getItem("title")
    };
  },
  watch() {
    if (!this.signin()) {
      this.$router.replace("/signin");
    }
  },
  methods: {
    signin () {
      return localStorage.getItem("logged");
    },
    isAdmin () {
      return 'false'
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:100,300,400");
@import "../node_modules/bootstrap/dist/css/bootstrap.css";
@import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
@import "./assets/css/style.scss";

* {
  border-radius: 2px !important;
}

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
