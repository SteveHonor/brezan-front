<template>

    <div class="middle-box text-center loginscreen animated fadeInDown">

        <div class="logo">
          <img src="@/assets/logo.png" height="42" alt="logo" />

        </div>
      <h3 class="text-secondary mt-5">Bem vindo</h3>

      <p class="text-white">Faça o login.</p>
      <form class="m-t" @submit.prevent="signin()">
        <div class="alert alert-danger" v-if="error">{{ error }}</div>
        <div class="form-group">
          <input type="email" name="teste" v-model="email" class="form-control" placeholder="Email" required="">
        </div>
        <div class="form-group">
          <input type="password" v-model="password" class="form-control" placeholder="Senha" required="">
        </div>
        <button type="submit" class="btn btn-primary btn-block">Entrar</button>


      </form>

    </div>
</template>

<script>
export default {
  name: 'signin',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  mounted () {
    this.$store.dispatch('unsetClient')

    if (this.$store.getters.signedIn) {
      this.$router.replace('/admin/clients')
    }
  },
  methods: {
    signin () {
      this.$http.plain.post('/signin', {
        email: this.email,
        password: this.password
      }).then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error))
    },
    signinSuccessful (response) {
      this.$store.dispatch('login')
      this.$store.dispatch('csrf', response.data.csrf)
      this.$store.dispatch('user', response.data.user)
      console.log('teste');

      this.$router.replace('/admin/clients')
    },
    signinFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      localStorage.setItem('logged', false)
      localStorage.removeItem('user')
    }
  }
}
</script>

<style lang="css" scoped>
.logo-element {
  font-family: Ubuntu !important;
  font-size: 42px;
  padding: 0;
}
.logo {
  font-family: Ubuntu;
  color: #FFF;
  font-size: 75px;
  line-height: 122px;
}
.logo-description {
  width: 100vh;
  color: #FFFFFF;
  font-size: 25px;
  text-align: center;
  font-weight: lighter;
}
.middle-box {
  padding: 10vh;
}
</style>
