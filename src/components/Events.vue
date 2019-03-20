<template lang="html">
  <div class="events">
    <div class="row mt-3">
      <div class="col-md-3 text-right">
        <img src="@/assets/photographer1.png" alt="">
      </div>
      <div class="col-md-6">
        <div class="card">
          <h5 class="card-header">Eventos</h5>
          <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Nome do evento</th>
                <th>Data do evento</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="event in events">
                <td>{{ event.name }}</td>
                <td>{{ event.data | date('%d/%m/%Y') }}</td>
                <td class="text-right">
                  <router-link
                    :to="
                      '/client/' +
                        client.user.id +
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
        <img src="@/assets/header-box.jpg" alt="fotografo" class="photographer" width="100%"/>
      </div>
      <div class="col-md-3 pt-5">
        <img src="@/assets/photographer2.png" alt="">
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
              <input
                type="email"
                class="form-control"
                v-model="data"
                required
              />
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
      client: JSON.parse(localStorage.getItem("user")),
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
            email: this.client.user.email
          }
        })
        .then(response => {
          this.events = response.body;
        });
    }
  }
};
</script>

<style lang="scss">
.photographer {
  border-radius: 0 0 30px 85px !important;
  width: 100%;
}
</style>
