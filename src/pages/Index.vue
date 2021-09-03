<template>
  <q-page class="row">
    <div class="col-12 col-md-6 offset-md-3 q-pt-lg">
      <ConRapidaCliente />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import ConRapidaCliente from "components/consultas/ConRapidaCliente.vue";

export default defineComponent({
  components: { ConRapidaCliente },

  name: "PageIndex",
});
</script>
