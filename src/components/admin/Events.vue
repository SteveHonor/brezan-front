<template lang="html">
  <div class="events">
    <div class="row">
      <div class="col-md-6">
        <router-link :to="'/admin/clients'" class="btn btn-light bg-white">
          voltar
        </router-link>
      </div>
      <div class="col-md-6">
        <div class="float-right">
          <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#modalEvent"
          >
          Novo Evento
        </button>
      </div>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-body">
          <div class="uploader__box js-uploader__box">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Nome do Evento</th>
                  <th>Data do Evento</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="event in events">
                  <td valign="middle">{{ event.name }}</td>
                  <td>{{ event.data }}</td>
                  <td class="text-right">
                    <router-link
                    :to="
                    '/admin/client/' +
                    client_id +
                    '/events/' +
                    event.id +
                    '/albums'
                    "
                    class="btn btn-info"
                    >Albums</router-link
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
  class="modal fade"
  id="modalEvent"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalCenterTitle"
  aria-hidden="true"
  >
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">
          Adicionar Novo Evento
        </h5>
        <button
        type="button"
        class="close"
        data-dismiss="modal"
        aria-label="Close"
        >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label for="">Nome do Evento</label>
        <input type="text" class="form-control" v-model="name" required />
      </div>

      <div class="form-group">
        <label for="">Data</label>
        <input type="date" class="form-control" v-model="data" required />
      </div>
    </div>
    <div class="modal-footer">
      <button
      type="button"
      class="btn btn-secondary"
      data-dismiss="modal"
      >
      Fechar
    </button>
    <button type="button" class="btn btn-primary" @click="send()">
      Adicionar Evento
    </button>
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
      events: [],
      client_id: this.$route.params.client_id,
      name: "",
      data: ""
    };
  },
  mounted() {
    this.getClients();
  },
  methods: {
    getClients() {
      this.$http
      .get("https://brezan.herokuapp.com/events", {
        params: {
          client_id: this.client_id
        }
      })
      .then(response => {
        this.events = response.body;
      });
    },
    send() {
      this.$http
      .post("https://brezan.herokuapp.com/events", {
        event: {
          name: this.name,
          data: this.data,
          client_id: this.client_id
        }
      })
      .then(response => {
        this.getClients();
        $("#modalEvent").modal("hide");
      });
    }
  }
};
</script>

<style lang="css"></style>
