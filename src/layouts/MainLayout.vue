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
          <span class="zaikoLogo text-h4">{P}</span>
          <span
            class="text-subtitle1 text-bold q-ml-sm desktop-only"
            style="font-family: Helvetica"
          >
            GEC - Gerenciador de Endereços de Clientes
          </span>
        </q-toolbar-title>

        <q-btn-dropdown
          dropdown-icon="notifications"
          color="white"
          flat
          no-icon-animation
        >
          <template v-if="notificationsLength > 0" v-slot:label>
            <q-badge color="red">
              {{ notificationsLength }}
            </q-badge>
          </template>
          <q-list class="non-selectable">
            <q-item
              v-for="(notification, key) in notifications"
              :key="key"
              clickable
              v-close-popup
            >
              <q-item-section avatar>
                <q-avatar icon="new_releases" size="4em" text-color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label> Um novo cliente se cadastrou! </q-item-label>
                <q-item-label caption>
                  {{ notification.nome + " | " + notification.celular }}
                </q-item-label>
                <q-item-label caption>
                  {{ stringFromTimestamp(notification.created_at) }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn-dropdown flat icon="account_circle">
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>Alterar senha</q-item-label>
              </q-item-section>
            </q-item>
            <q-item @click="logout" clickable v-close-popup>
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
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

          <q-item
            to="/"
            @click="toggleLeftDrawerIfMobile"
            active-class="menu-active"
            v-ripple
            clickable
          >
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Início</q-item-label>
            </q-item-section>
          </q-item>
          <!-- /TÓPICO -->

          <!-- TÓPICO -->
          <q-expansion-item
            v-for="(menu, key) in menus"
            :key="key"
            :icon="menu.icon"
            :label="menu.label"
            class="q-pt-sm"
            clickable
            exact
          >
            <div class="q-pl-md">
              <q-item
                v-for="(child, key2) in menu.children"
                :key="key2"
                :to="child.route"
                @click="toggleLeftDrawerIfMobile"
                active-class="menu-active"
                exact
                v-ripple
                clickable
              >
                <q-item-section avatar>
                  <q-icon :name="child.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
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
import { useQuasar } from "quasar";
import { ref } from "vue";

import Formatters from "../js/formatters.js";

import { api } from "boot/axios";

export default {
  name: "MainLayout",

  computed: {
    notificationsLength() {
      return this.notifications.length;
    },
  },

  data: function () {
    return {
      notifications: [],
      stringFromTimestamp: Formatters.formatStringFromTimestamp,
      menus: {
        Cadastros: {
          label: "Cadastros",
          icon: "create",
          children: [
            { label: "Usuário", icon: "person", route: "/cadUsuario" },
            {
              label: "Cliente",
              icon: "person_pin_circle",
              route: "/cadCliente",
            },
          ],
        },
        Consultas: {
          label: "Consultas",
          icon: "manage_search",
          children: [
            { label: "Usuário", icon: "person", route: "/conUsuario" },
            {
              label: "Cliente",
              icon: "person_pin_circle",
              route: "/conCliente",
            },
          ],
        },
      },
    };
  },

  created() {
    this.getNotifications();

    setInterval(() => {
      this.getNotifications(true);
    }, 10000);
  },

  methods: {
    getNotifications(compare = false) {
      api.get("/notification/status/0").then((response) => {
        if (compare) {
          let newNotifications = [];
          newNotifications = response.data.map((notification) => {
            if (!this.notifications.includes(notification)) return notification;
          });

          if (newNotifications.length > 0) {
            let msg = "Um novo cliente se cadastrou!";

            if (newNotifications.length > 1)
              msg = `${newNotifications.length} novos clientes se cadastraram!`;

            this.$q.notify({
              type: "positive",
              position: "bottom",
              message: msg,
              timeout: 2000,
            });
          }
        }

        this.notifications = response.data;
      });
    },
    logout() {
      this.$q.notify({
        type: "warning",
        position: "bottom",
        message: "Saindo",
        timeout: 1200,
      });

      setTimeout(() => {
        this.$q.localStorage.clear();
        this.$router.push({ path: "/login" });
      }, 1000);
    },
  },

  setup() {
    const $q = useQuasar();
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      toggleLeftDrawerIfMobile() {
        if ($q.platform.is.mobile) leftDrawerOpen.value = !leftDrawerOpen.value;
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
