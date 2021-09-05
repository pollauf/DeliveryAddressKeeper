<template>
  <q-layout view="hHh lpR fFf">
    <div
      v-if="showPageContainer"
      class="text-black"
      style="background-color: #ffaa1c; width: 100%"
    >
      <q-toolbar class="non-selectable">
        <q-toolbar-title class="q-pt-sm">
          <q-avatar size="3em">
            <img src="logorafa.png" />
          </q-avatar>
          <span
            class="text-subtitle1 text-bold q-ml-sm"
            style="font-family: Helvetica"
          >
            Cantinho Paulista da Rafa
          </span>
        </q-toolbar-title>
      </q-toolbar>
    </div>
    <q-page-container v-if="showPageContainer">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ExtLayout",

  data: function () {
    return {
      showPageContainer: false,
    };
  },

  created() {
    let tenantuser = this.$route.params.tenantuser;

    if (tenantuser == "rafa") {
      this.showPageContainer = true;
    }
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>

<style scoped>
.zaikoLogo {
  font-family: Gaz;
  src: url(assets/Gaz.ttf);
}
</style>
