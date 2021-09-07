<template>
  <q-card width="100%" flat bordered class="my-card bg-grey-2">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col-12 text-center">
          <div class="text-h6 text-bold">PAINEL ADMINISTRATIVO</div>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <q-form ref="form" @submit="onSubmit" class="q-gutter-y-sm row">
        <q-input
          class="col-12 col-md-12"
          outlined
          v-model="model.login"
          label="Login"
          lazy-rules
          :rules="[(val) => (val && val.length >= 4) || 'Preencha o Login!']"
        />
        <q-input
          class="col-12 col-md-12"
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
            >Entrar
          </q-btn>
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
        tenantID: 1,
        login: "",
        senha: "",
      },
      isPwd: true,
      loading: false,
    };
  },

  methods: {
    onSubmit() {
      this.loading = true;

      api
        .post("/auth/login", this.model)
        .then((response) => {
          this.$q.notify({
            type: response.data.ok ? "positive" : "warning",
            position: "bottom",
            message: response.data.msg,
            timeout: 2000,
          });

          setTimeout(() => {
            if (response.data.ok) {
              this.$q.localStorage.set("token", response.data.token);
              this.$router.push({ path: "/" });
            }

            this.loading = false;
          }, 550);
        })
        .catch((error) => {
          setTimeout(() => {
            this.onSubmit();
          }, 550);
        });
    },
  },
});
</script>
