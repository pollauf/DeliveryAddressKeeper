<template>
  <q-page class="row">
    <div class="col-12 col-md-10 offset-md-1 q-pt-lg">
      <q-card width="100%" flat bordered class="my-card bg-transparent">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col-12 text-center">
              <div class="text-h6 text-bold">CONSULTA DE USUÁRIO</div>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <q-table
            title=""
            :filter="filter"
            :loading="loading"
            no-data-label="Nenhum registro encontrado"
            :rows="rows"
            :columns="columns"
            row-key="index"
            :pagination="pagination"
          >
            <template v-slot:top-right>
              <q-input
                borderless
                dense
                debounce="300"
                v-model="filter"
                placeholder="Pesquise"
                outlined
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:no-data="">
              <div class="full-width row flex-center text-accent q-gutter-sm">
                <span v-show="!loading" class="text-grey-10">
                  Nenhum registro encontrado
                </span>
                <span v-show="loading" class="text-grey-10">
                  Carregando...
                </span>
              </div>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

import { api } from "boot/axios";

export default defineComponent({
  name: "conUsuario",

  data: function () {
    return {
      rows: [],
      loading: false,
      filter: "",
    };
  },

  created() {
    this.getRows();
  },

  methods: {
    getRows() {
      this.loading = true;

      setTimeout(() => {
        api.get("/users").then((result) => {
          this.rows = result.data;

          this.rows.forEach((row, index) => {
            row.index = index + 1;
          });

          this.loading = false;
        });
      }, 500);
    },
  },

  setup() {
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 5,
    });

    const columns = [
      {
        name: "desc",
        label: "#",
        field: "index",
        align: "center",
        required: true,
        sortable: true,
      },
      {
        name: "nome",
        label: "Nome",
        align: "left",
        field: "nome",
        sortable: true,
      },
      {
        name: "login",
        label: "Login",
        align: "left",
        field: "login",
        sortable: true,
      },
    ];

    return {
      pagination,
      columns,
    };
  },
});
</script>
