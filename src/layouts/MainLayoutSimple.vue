<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white" height-hint="58">
      <q-toolbar class="non-selectable">
        <q-toolbar-title class="q-pt-sm">
          <span class="zaikoLogo text-h4">{P}</span>
          <span
            class="text-subtitle1 text-bold q-ml-sm desktop-only"
            style="font-family: Helvetica"
          >
            GEC - Gerenciador de Endereços de Clientes
          </span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  name: "MainLayoutSimple",

  data: function () {
    return {};
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
