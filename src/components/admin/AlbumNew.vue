<template>
  <section role="main" class="l-main">
    <div class="row">
      <div class="col-md-12">
        <router-link :to="'/admin/client/' + client_id + '/events/' + event_id + '/albums'" class="btn btn-light bg-white">
          voltar
        </router-link>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">

            <div class="form-group">
              <label for="">Título do Álbum</label>
              <input type="text" class="form-control title" required>
            </div>

            <h6></h6>
            <span class="button button--big-bottom btn-file">
              Foto de capa do Album <input type="file" id="imgInp">
            </span>
            <img id='img-upload' class="img-thumbnail mb-4"/>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12">

            <h4>Fotos do Album</h4>
            <div class="uploader__box js-uploader__box">

              <div class="uploader__contents">
                <label class="button button--secondary" for="fileinput">Select Files</label>
                <input id="fileinput" class="uploader__file-input" type="file" multiple value="Select Files">
              </div>
              <input class="button button--big-bottom" type="submit" value="Upload Selected Files">

            </div>
          </div>
        </div>
      </div>
    </div>
    <input type="hidden" id="event" :value="event_id">
  </section>
</template>

<script>

require('@/assets/js/imageuploader.js')

export default {
  data () {
    return {
      files: [],
      name: '',
      event_id: this.$route.params.event_id
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
