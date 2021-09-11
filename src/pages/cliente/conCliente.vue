<template>
  <q-dialog v-model="showCustomerModal" persistent>
    <q-card style="width: 700px; max-width: 95vw">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-subtitle1 text-bold">EDIÇÃO DE CLIENTE</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <CadCliente
          style="width: 100%; height: 100%"
          :selectedModel="selectedRow"
          :modalMode="true"
        />
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-page class="row">
    <div class="col-12 col-md-10 offset-md-1 q-pt-lg">
      <q-card width="100%" flat bordered class="my-card bg-transparent">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col-12 text-center">
              <div class="text-h6 text-bold">CONSULTA DE CLIENTES</div>
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
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th auto-width />
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td auto-width>
                  <q-btn-dropdown size="sm" color="primary">
                    <q-list>
                      <q-item clickable v-close-popup @click="edit(props.row)">
                        <q-item-section avatar>
                          <q-icon color="primary" name="edit" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>Editar</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="remove(props.row)"
                      >
                        <q-item-section avatar>
                          <q-icon color="primary" name="delete" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>Remover</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                </q-td>
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.value }}
                </q-td>
              </q-tr>
            </template>

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

import CadCliente from "src/components/cadastros/CadCliente.vue";

import { api } from "boot/axios";

export default defineComponent({
  name: "conCliente",

  components: {
    CadCliente,
  },

  data: function () {
    return {
      rows: [],
      loading: false,
      filter: "",
      showCustomerModal: false,
      selectedRow: null,
    };
  },

  created() {
    this.getRows();
  },

  watch: {
    showCustomerModal(statusModal) {
      // Closed
      if (!statusModal) {
        this.getRows();
      }
    },
  },

  methods: {
    edit(row) {
      this.selectedRow = row;
      this.showCustomerModal = true;
    },
    remove(customer) {
      this.$q
        .dialog({
          title: "Remover Cliente",
          message: `Deseja remover ${customer.nome} - ${customer.celular}?`,
          ok: "Sim",
          cancel: "Não",
          persistent: true,
        })
        .onOk(() => {
          let rowIndex = this.rows.indexOf(customer);

          console.log(rowIndex);

          this.rows.splice(rowIndex, 1);

          api.get(`/deliverycustomer/${customer.id}/set/status/0`);
        });
    },
    getRows() {
      this.loading = true;

      setTimeout(() => {
        api
          .get("/deliverycustomers")
          .then((result) => {
            this.rows = result.data;

            this.rows.forEach((row, index) => {
              row.index = index + 1;
            });

            this.loading = false;
          })
          .catch((error) => {
            this.getRows();
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
        name: "celular",
        label: "Celular",
        align: "left",
        field: "celular",
        sortable: true,
      },
      {
        name: "endereco",
        label: "Rua",
        align: "left",
        field: "endereco",
        sortable: true,
      },
      {
        name: "numero",
        label: "Número",
        align: "left",
        field: "numero",
        sortable: true,
      },
      {
        name: "complemento",
        label: "Complemento",
        align: "left",
        field: "complemento",
        sortable: true,
      },
      {
        name: "bairro",
        label: "Bairro",
        align: "left",
        field: "bairro",
        sortable: true,
      },
      {
        name: "cidade",
        label: "Cidade",
        align: "left",
        field: "cidade",
        sortable: true,
      },
      {
        name: "estado",
        label: "UF",
        align: "left",
        field: "estado",
        sortable: true,
      },
      {
        name: "origem",
        label: "Origem",
        align: "left",
        field: "origem",
        format: (val) => (val == 0 ? "Interna" : "Externa"),
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
