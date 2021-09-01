<template>
  <q-card width="100%" flat bordered class="my-card bg-transparent">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col-12 text-center">
          <div class="text-h6 text-bold">CADASTRO DE USUÁRIO</div>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <q-form ref="form" @submit="onSubmit" class="q-gutter-y-sm row">
        <q-input
          class="col-12 col-md-12"
          outlined
          v-model="model.nome"
          label="Nome"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Preencha o Nome!']"
        />
        <q-input
          class="col-12 col-md-6"
          outlined
          v-model="model.login"
          label="Login"
          lazy-rules
          :rules="[(val) => (val && val.length >= 4) || 'Preencha o Login!']"
        />
        <q-input
          class="col-12 col-md-5 offset-md-1"
          outlined
          v-model="model.senha"
          :type="isPwd ? 'password' : 'text'"
          label="Senha"
          lazy-rules
          :rules="[(val) => (val && val.length >= 6) || 'Preencha a Senha!']"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
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
  name: "CadUsuario",

  data: function () {
    return {
      model: {
        id: 0,
        nome: "",
        login: "",
        senha: "",
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

      api.post("/user/register", this.model).then((response) => {
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
});
</script>
