<template lang="html">
  <div class="row">
    <div class="col-sm-4 offset-sm-2">
      <input type="password" class="form-control" v-model="password">
      <input type="password" class="form-control" v-model="password_confirmation">
      <button type="button" class="btn btn-primary" @click="send()">Enviar</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      password: '',
      password_confirmation: ''
    }
  },
  methods: {
    send () {
      const API_URL = '/'

      this.$http.plain.put(API_URL + '/confirmation', {
        password: this.password,
        password_confirmation: this.password_confirmation,
        token: this.$route.params.token
      }).then(response => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="css">
</style>
