<template>
  <q-page class="row">
    <div class="col-12 col-md-6 offset-md-3 q-pt-lg">
      <div class="text-subtitle2 text-center full-width text-bold">
        LINK REGISTRO
      </div>
      <div class="q-pb-lg text-center">
        <q-btn
          @click="copyRegistryLink"
          flat
          color="transparent"
          text-color="blue-7"
          no-caps
        >
          {{ registryLink }}
          <q-space />
          <q-icon class="q-pl-sm" name="content_copy" color="blue-7" />
        </q-btn>
      </div>
      <ConRapidaCliente />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import { copyToClipboard } from "quasar";

import ConRapidaCliente from "components/consultas/ConRapidaCliente.vue";

export default defineComponent({
  components: { ConRapidaCliente },

  name: "PageIndex",

  data() {
    return {
      registryLink: "https://gec.pollauf.net/rafa/cad-cliente",
    };
  },

  methods: {
    copyRegistryLink() {
      let message = `Poderia cadastrar seu endereço pelo nosso link? ${this.registryLink}`;

      copyToClipboard(message)
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
  },
});
</script>
