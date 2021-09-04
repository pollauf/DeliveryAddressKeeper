<template>
  <q-page class="row bg-blue">
    <div class="col-12 col-md-4 offset-md-4 q-pt-xl">
      <Login />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import Login from "src/components/Login.vue";

export default defineComponent({
  name: "login",

  data: function () {
    return {};
  },

  methods: {},

  components: {
    Login,
  },
});
</script>
