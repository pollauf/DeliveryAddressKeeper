<template>
  <q-card width="100%" flat bordered class="my-card bg-transparent">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col-12 text-center">
          <div class="text-h6 text-bold">CONSULTA RÁPIDA DE CLIENTE</div>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <q-form ref="form" class="row q-col-gutter-sm">
        <q-input
          :loading="loading"
          class="col-12"
          outlined
          v-model="celular"
          label="Celular/WhatsApp"
          :mask="celular.length > 14 ? '(##) #####-####' : '(##) ####-#####'"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Preencha o Celular!']"
        >
          <template v-slot:after>
            <q-btn @click="load" type="submit" round dense flat icon="search" />
          </template>
        </q-input>
      </q-form>
      <br />
      <q-list v-show="model.id != 0 && !loading" bordered>
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle2">Nome</q-item-label>
            <q-item-label class="text-subtitle1">{{ model.nome }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="phone" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle2">Celular</q-item-label>
            <q-item-label class="text-subtitle1">{{
              model.celular
            }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle2">Endereço</q-item-label>
            <q-item-label class="text-subtitle1">{{ endereco }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";

import { api } from "boot/axios";

export default defineComponent({
  name: "ConRapidaCliente",

  data: function () {
    return {
      loading: false,
      celular: "",
      model: {
        id: 0,
        nome: "",
        celular: "",
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        origem: 0,
      },
    };
  },

  methods: {
    load() {
      if (this.celular.length < 14) {
        return;
      }

      this.loading = true;

      api
        .post("/deliverycustomer/from/phone", { phone: this.celular })
        .then((response) => {
          setTimeout(() => {
            if (Object.keys(response.data).length > 0) {
              this.model = {
                id: response.data.id,
                nome: response.data.nome,
                celular: response.data.celular,
                endereco: response.data.endereco,
                numero: response.data.numero,
                complemento: response.data.complemento,
                bairro: response.data.bairro,
                cidade: response.data.cidade,
                estado: response.data.estado,
                origem: 0,
              };
            } else {
              this.model.id = 0;
            }

            this.loading = false;
          }, 500);
        });
    },
  },

  computed: {
    endereco() {
      let endereco = [];

      endereco.push(this.model.endereco);
      endereco.push(this.model.numero);

      if (this.model.complemento != null && this.model.complemento != "") {
        endereco.push(this.model.complemento);
      }

      endereco.push(this.model.bairro);
      endereco.push(this.model.cidade + "/" + this.model.estado);

      endereco = endereco.join(", ");

      return endereco;
    },
  },
});
</script>
