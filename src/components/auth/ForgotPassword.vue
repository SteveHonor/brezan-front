<template lang="html">
  <div class="passwordBox animated fadeInDown">
    <div class="row">
      <div class="col-md-12">
        <div class="ibox-content">
          <h2 class="font-bold">Esqueci minha senha</h2>
          <p>
            Digite seu e-mail para recriar sua senha.
          </p>
          <div class="row">
            <div class="col-lg-12">
              <form class="m-t" role="form" action="index.html">
                <div class="form-group">
                  <input type="email" class="form-control" placeholder="Email" required="">
                </div>
                <button type="submit" class="btn btn-primary block full-width m-b">Enviar nova senha</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-md-6">
        eccleser system church
      </div>
      <div class="col-md-6 text-right">
        <small>© 2017 | by Honors </small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate () {
    document.body.className = 'gray-bg'
  }
}
</script>
