<template>
  <q-page class="row">
    <div class="col-12 col-md-8 offset-md-2 q-pt-lg">
      <CadCliente />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import CadCliente from "src/components/cadastros/CadCliente.vue";

import { api } from "boot/axios";

export default defineComponent({
  name: "cadCliente",

  data: function () {
    return {};
  },

  methods: {},

  components: {
    CadCliente,
  },
});
</script>
