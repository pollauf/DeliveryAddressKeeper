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
            :loading="loading"
            no-data-label="Nenhum registro encontrado"
            :rows="rows"
            :columns="columns"
            row-key="index"
            v-model:pagination="pagination"
            hide-pagination
          >
            <template v-slot:no-data="{ icon, filter }">
              <div class="full-width row flex-center text-accent q-gutter-sm">
                <q-icon
                  v-show="!loading"
                  color="grey-10"
                  size="2em"
                  :name="filter ? 'filter_b_and_w' : icon"
                />
                <span v-show="!loading" class="text-grey-10">
                  Nenhum registro encontrado
                </span>
                <span v-show="loading" class="text-grey-10">
                  Carregando...
                </span>
              </div>
            </template>
          </q-table>

          <div class="row justify-center q-mt-md">
            <q-pagination
              v-model="pagination.page"
              color="grey-8"
              :max="pagesNumber"
              size="sm"
            />
          </div>
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
      }, 5000);
    },
  },

  computed: {
    pagesNumber() {
      return Math.ceil(this.rows.length / this.pagination.rowsPerPage);
    },
  },

  setup() {
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 5,
      loading: false,
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
