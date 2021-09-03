<template>
  <q-card width="100%" flat bordered class="my-card bg-transparent">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col-12 text-center">
          <div class="text-h6 text-bold">{{ formTitle }}</div>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <q-form ref="form" @submit="onSubmit" class="row q-col-gutter-sm">
        <q-input
          class="col-12 col-sm-4"
          outlined
          v-model="model.celular"
          label="Celular/WhatsApp"
          :mask="
            model.celular.length > 14 ? '(##) #####-####' : '(##) ####-#####'
          "
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Preencha o Celular!']"
        />
        <q-input
          class="col-12 col-sm-8"
          outlined
          v-model="model.nome"
          label="Nome"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Preencha o Nome!']"
        />
        <q-input
          class="col-12"
          outlined
          v-model="model.endereco"
          label="Rua"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Preencha a Rua!']"
        />
        <q-input
          class="col-12 col-sm-3"
          outlined
          v-model="model.numero"
          label="Número"
          mask="##########"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Preencha o Número!']"
        />
        <q-input
          class="col-12 col-sm-9"
          outlined
          v-model="model.complemento"
          label="Complemento"
          lazy-rules
          :rules="[(val) => true || 'Preencha o Bairro!']"
        />
        <q-input
          class="col-12 col-sm-5"
          outlined
          v-model="model.bairro"
          label="Bairro"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Preencha o Bairro!']"
        />
        <q-input
          class="col-6 col-sm-5"
          outlined
          v-model="model.cidade"
          label="Cidade"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Preencha a Cidade!']"
        />
        <q-input
          class="col-6 col-sm-2"
          outlined
          v-model="model.estado"
          label="UF"
          mask="AA"
          lazy-rules
          :rules="[(val) => (val && val.length == 2) || 'Preencha a UF!']"
        />
        <div class="col-12" align="right">
          <q-separator />
          <br />

          <q-btn
            :loading="loading"
            :disabled="loading"
            type="submit"
            color="primary"
            >Salvar</q-btn
          >
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

import { api } from "boot/axios";

export default defineComponent({
  name: "CadCliente",

  props: {
    titulo: {
      type: String,
      default: "CADASTRO DE CLIENTE",
    },
  },

  data: function () {
    return {
      model: {
        id: 0,
        nome: "",
        celular: "",
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "Jaraguá do Sul",
        estado: "SC",
        origem: 0,
      },
      originalModel: "",
      isPwd: true,
      loading: false,
    };
  },

  created() {
    this.originalModel = JSON.stringify(this.model);
  },

  methods: {
    onSubmit() {
      this.loading = true;

      api.post("/deliverycustomer/register", this.model).then((response) => {
        this.$q.notify({
          type: response.data.ok ? "positive" : "negative",
          position: "bottom",
          message: response.data.msg,
          timeout: 2300,
        });

        setTimeout(() => {
          if (response.data.ok) {
            this.model = JSON.parse(this.originalModel);
            this.$refs.form.resetValidation();
          }

          this.loading = false;
        }, 2500);
      });
    },
  },

  computed: {
    formTitle() {
      if (this.model.id == 0) {
        return this.titulo;
      } else {
        return "EDIÇÃO DE CLIENTE";
      }
    },
  },
});
</script>
