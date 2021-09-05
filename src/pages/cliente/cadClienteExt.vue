<template>
  <q-page class="row">
    <div class="col-12 col-md-6 offset-md-3 q-pt-lg">
      <CadCliente
        titulo="CADASTRO"
        :tenantuser="tenantuser"
        :exibirBannerSucesso="true"
        :origem="1"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import CadCliente from "src/components/cadastros/CadCliente.vue";

export default defineComponent({
  name: "cadClienteExt",

  data: function () {
    return {
      tenantuser: null,
    };
  },

  created() {
    this.tenantuser = this.$route.params.tenantuser;
  },

  methods: {},

  components: {
    CadCliente,
  },
});
</script>
