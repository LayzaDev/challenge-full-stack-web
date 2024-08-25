<!-- src/layouts/AppLayout.vue -->
<template>
  <v-layout ref="app" class="rounded rounded-md">
    <v-app-bar color="grey-lighten-2" name="app-bar">
      <child v-slot="{ print }">
        <v-btn class="mx-auto" @click="print('app-bar')"></v-btn>
      </child>
    </v-app-bar>

    <v-navigation-drawer name="drawer" style="background-color: gray">
      <div class="d-flex justify-center align-center h-100"></div>
    </v-navigation-drawer>

    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 300px"
    >
      <router-view />
    </v-main>
  </v-layout>
</template>

<script>
import { useLayout } from "vuetify";

const Child = {
  setup(props, ctx) {
    const { getLayoutItem } = useLayout();

    function print(key) {
      alert(JSON.stringify(getLayoutItem(key), null, 2));
    }

    return () => ctx.slots.default({ print });
  },
};

export default {
  components: {
    Child,
  },
};
</script>
