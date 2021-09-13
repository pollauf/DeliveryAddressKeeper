<template>
  <q-card width="100%" flat :bordered="!modoModal" class="my-card bg-white">
    <q-card-section v-show="!modoModal">
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
          type="tel"
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
      <div v-show="nadaEncontrado" class="text-h6 text-center q-pb-md">
        Nenhum registro encontrado
      </div>
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

        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="sticky_note_2" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <q-btn
                @click="copyCustomerInfo"
                flat
                color="transparent"
                text-color="blue-7"
              >
                Informações
                <q-icon class="q-pl-sm" name="content_copy" color="blue-7" />
              </q-btn>
              <q-btn @click="copyConfirmationMessage" flat color="blue-7">
                Confirmação
                <q-icon class="q-pl-sm" name="content_copy" color="blue-7" />
              </q-btn>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

import { copyToClipboard } from "quasar";

import { api } from "boot/axios";

export default defineComponent({
  name: "ConRapidaCliente",

  props: {
    celularInicial: {
      type: String,
      default: "",
    },
    modoModal: {
      type: Boolean,
      default: false,
    },
  },

  data: function () {
    return {
      loading: false,
      celular: "",
      celularSearch: "",
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
      nadaEncontrado: false,
    };
  },

  created() {
    let celini = this.celularInicial;

    if (celini != "") {
      if (celini.length == 10) {
        celini =
          "(" +
          celini[0] +
          celini[1] +
          ") " +
          celini[2] +
          celini[3] +
          celini[4] +
          celini[5] +
          "-" +
          celini[6] +
          celini[7] +
          celini[8] +
          celini[9];
      } else if (celini.length == 11) {
        celini =
          "(" +
          celini[0] +
          celini[1] +
          ") " +
          celini[2] +
          celini[3] +
          celini[4] +
          celini[5] +
          celini[6] +
          "-" +
          celini[7] +
          celini[8] +
          celini[9] +
          celini[10];
      }

      this.celular = celini;
    }

    this.load();
  },

  watch: {
    celular(newValue) {
      this.celularSearch = newValue;
    },
  },

  methods: {
    copyCustomerInfo() {
      let customerInfo = `Nome: ${this.model.nome}, Celular: ${this.model.celular}, Endereço: ${this.endereco}`;

      copyToClipboard(customerInfo)
        .then(() => {
          this.$q.notify({
            type: "positive",
            position: "bottom",
            message: "Copiado",
            timeout: 550,
          });
        })
        .catch(() => {
          // catch
        });
    },
    copyConfirmationMessage() {
      copyToClipboard(this.confirmationMessage)
        .then(() => {
          this.$q.notify({
            type: "positive",
            position: "bottom",
            message: "Copiado",
            timeout: 550,
          });
        })
        .catch(() => {
          // catch
        });
    },
    load() {
      if (this.celularSearch.length < 14) {
        return;
      }

      this.nadaEncontrado = false;

      this.loading = true;

      api
        .post("/deliverycustomer/from/phone", { phone: this.celularSearch })
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

              this.celular = this.celularSearch;
            } else {
              if (this.celularSearch.length == 14) {
                let celularNewDigit = this.celular.split(" ").join(" 9");
                this.celularSearch = celularNewDigit;
                this.load();

                return;
              } else {
                this.model.id = 0;
                this.nadaEncontrado = true;
              }
            }

            this.loading = false;
          }, 500);
        })
        .catch((error) => {
          setTimeout(() => {
            this.load();
          }, 550);
        });
    },
  },

  computed: {
    confirmationMessage() {
      return `O seu endereço é na "${this.endereco}"?`;
    },
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
