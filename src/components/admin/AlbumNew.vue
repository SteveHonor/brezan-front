<template>
  <section role="main" class="l-main">
    <div class="row">
      <div class="col-md-12">
        <router-link :to="'/admin/client/' + client_id + '/events/'" class="btn btn-light bg-white">
          voltar
        </router-link>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <span class="font-weight-bolder mr-4 h4">1º</span> Título do Album
          </div>
          <div class="card-body">
            <div class="form-group">
              <label for="">Título do Álbum</label>
              <input type="text" class="form-control title" required v-model="name">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <span class="font-weight-bolder mr-4 h4">2º</span> Foto de Capa
          </div>
          <div class="card-body">
            <span class="btn btn-warning btn-file">
              Foto de capa do Album <input type="file" id="imgInp">
            </span>
            <div class="row mt-4">
              <div class="col-md-12">
                <img id='img-upload' width="300" />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="uploader__box js-uploader__box"></div>

    <input type="hidden" id="event" :value="event_id">
  </section>
</template>

<script>
import $ from 'jquery'
import 'block-ui'
require('@/assets/js/imageuploader.js')

export default {
  data () {
    return {
      files: [],
      name: '',
      event_id: this.$route.params.event_id,
      client_id: this.$route.params.client_id,
    }
  },
  mounted () {
    var _self = this
    $(document).on('change', '.btn-file :file', function() {
      var input = $(this),
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
      input.trigger('fileselect', [label]);
    });

    $('.btn-file :file').on('fileselect', function(event, label) {

      var input = $(this).parents('.input-group').find(':text'),
      log = label;

      if( input.length ) {
        input.val(log);
      } else {
        if( log ) console.log(log);
      }

    });

    $("#imgInp").change(function(){
      _self.readURL(this);
    });

    var options = {};
    $('.js-uploader__box').uploader(options);
  },
  methods: {
    readURL (input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $('#img-upload').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.thumbnail  {
  width: 445px;
  display: list-item;
  margin-top: 30px;
}
.btn-file {
  position: relative;
  overflow: hidden;
}
.btn-file input[type=file] {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  font-size: 100px;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  background: white;
  cursor: inherit;
  display: block;
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

</style>
