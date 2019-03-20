<template lang="html">
  <div class="clients">
    <div class="row">
      <div class="col-md-12 text-right mb-3">
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#myModal"
        >
          Adicionar Cliente
        </button>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <div class="card m-b-20">
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="client in clients">
                    <td class="text-uppercase">{{ client.name }}</td>
                    <td>{{ client.email }}</td>
                    <td class="text-right">
                      <router-link
                        :to="'/admin/client/' + client.id + '/events'"
                        class="btn btn-sm btn-info"
                      >
                        Eventos
                      </router-link>

                      <button type="button" class="btn btn-sm btn-outline-danger ml-3">
                        <i class="fa fa-trash"></i>
                      </button>
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
      id="myModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">
              Adicionar novo Cliente
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
              <label for="">Nome</label>
              <input type="text" class="form-control" v-model="name" required />
            </div>

            <div class="form-group">
              <label for="">Email</label>
              <input
                type="email"
                class="form-control"
                v-model="email"
                required
              />
            </div>

            <div class="form-group">
              <label for="">Senha</label>
              <input
                type="text"
                class="form-control"
                v-model="password"
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
            <button
              type="button"
              class="button button--big-bottom"
              @click="send()"
            >
              Adicionar Cliente
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
      clients: [],
      name: "",
      email: "",
      password: ""
    };
  },
  mounted() {
    localStorage.setItem("title", "Clientes");
    this.getClients();
  },
  methods: {
    getClients() {
      this.$http.get("https://brezan.herokuapp.com/clients").then(response => {
        this.clients = response.body;
      });
    },
    send() {
      this.$http
        .post("https://brezan.herokuapp.com/clients", {
          client: {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password
          }
        })
        .then(response => {
          console.log(response);
          this.getClients();
          $("#myModal").modal("hide");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.clients {
}
</style>
