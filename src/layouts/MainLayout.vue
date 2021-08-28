<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white" height-hint="58">
      <q-toolbar class="non-selectable">
        <q-btn
          class="q-mr-sm"
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
        />

        <!-- <q-separator vertical spaced dark /> -->

        <q-toolbar-title class="q-pt-sm">
          <span class="zaikoLogo text-h4">Zaiko</span>
          <span
            class="text-subtitle1 text-bold q-ml-sm desktop-only"
            style="font-family: Helvetica"
          >
            Controle de Endereços para Delivery
          </span>
        </q-toolbar-title>

        <q-btn flat icon="notifications">
          <q-badge color="red" floating>4</q-badge>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      class="non-selectable"
      :width="250"
      bordered
      persistent
      show-if-above
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <!-- TÓPICO -->
          <q-item class="q-pt-md q-pb-md">
            <q-item-section>
              <q-item-label class="text-center text-black text-bold">
                MENU
              </q-item-label>
            </q-item-section>
            <q-item-section class="mobile-only" side>
              <q-btn dense flat round icon="close" @click="toggleLeftDrawer" />
            </q-item-section>
          </q-item>

          <q-item to="/" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey-10" name="home" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-grey-10">Início</q-item-label>
            </q-item-section>
          </q-item>
          <!-- /TÓPICO -->

          <!-- TÓPICO -->
          <q-expansion-item
            v-for="(menu, key) in menus"
            :key="key"
            :icon="menu.icon"
            :label="menu.label"
            header-class="text-grey-10"
            class="q-pt-sm"
            clickable
          >
            <div class="q-pl-md">
              <q-item
                v-for="(child, key2) in menu.children"
                :key="key2"
                :to="child.route"
                exact
                v-ripple
                clickable
              >
                <q-item-section avatar>
                  <q-icon color="grey-10" :name="child.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-grey-10">
                    {{ child.label }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-expansion-item>
          <!-- /TÓPICO -->
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  name: "MainLayout",

  data: function () {
    return {
      menus: {
        Cadastros: {
          label: "Cadastros",
          icon: "create",
          children: [
            { label: "Usuário", icon: "person", route: "/cadUsuario" },
            { label: "Cliente", icon: "person_pin_circle", route: "" },
          ],
        },
        Consultas: {
          label: "Consultas",
          icon: "manage_search",
          children: [
            { label: "Usuário", icon: "person", route: "" },
            { label: "Cliente", icon: "person_pin_circle", route: "" },
          ],
        },
      },
    };
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
