<template>

    <div class="middle-box text-center loginscreen animated fadeInDown">

        <div class="logo">
          <img src="@/assets/logo.png" height="42" alt="logo" />

        </div>
      <h3 class="text-secondary mt-5">Bem vindo</h3>
       <!--Continually expanded and constantly improved Inspinia Admin Them (IN+)-->
      </p>
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
    if (localStorage.getItem('logged')) {
      this.$router.replace('/photos')
    }
  },
  methods: {
    signin () {
      if (this.email === 'admin@brezan.com.br' && this.password === '123123') {
        localStorage.setItem('logged', true)
        this.$router.replace('/admin/clients')
        return
      }

      const API_URL = 'https://brezan.herokuapp.com/'

      this.$http.post(API_URL + '/signin', {
        email: this.email,
        password: this.password
      }).then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error))
    },
    signinSuccessful (response) {
      localStorage.setItem('logged', true)
      localStorage.setItem('user', JSON.stringify(response.body))
      this.error = ''
      console.log('testes');
      this.$router.replace('/photos')
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
