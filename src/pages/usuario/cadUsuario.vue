<template>
  <q-page class="row">
    <div class="col-12 col-md-6 offset-md-3 q-pt-lg">
      <CadUsuario />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import CadUsuario from "src/components/cadastros/CadUsuario.vue";

import { api } from "boot/axios";

export default defineComponent({
  name: "cadUsuario",

  data: function () {
    return {};
  },

  methods: {},

  components: {
    CadUsuario,
  },
});
</script>
