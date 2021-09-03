<template>
  <q-page class="row">
    <div class="col-12 col-md-6 offset-md-3 q-pt-lg">
      <CadCliente titulo="CADASTRO" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import CadCliente from "src/components/cadastros/CadCliente.vue";

export default defineComponent({
  name: "cadClienteExt",

  data: function () {
    return {};
  },

  methods: {},

  components: {
    CadCliente,
  },
});
</script>
