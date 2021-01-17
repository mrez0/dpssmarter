<template>
  <q-drawer :value="true" behavior="desktop" :persistent="true" :width="210">
    <div class="q-pt-md">
      <h2 class="text-h6 q-mb-sm text-center q-mt-lg">{{getById(getCurrentUser.positionId).name}}</h2>
      <q-separator class="q-mx-auto bg-white" style="width: 80%;" />
      <SmarterMainMenu />
      <ManagementMenu />
    </div>
    <SmarterBottomMenu />
  </q-drawer>
</template>

<script>
import SmarterMainMenu from 'components/SmarterMainMenu'
import SmarterBottomMenu from 'components/SmarterBottomMenu'
import ManagementMenu from 'components/ManagementMenu'
import { mapGetters } from 'vuex'

export default {
  components: { SmarterMainMenu, SmarterBottomMenu, ManagementMenu },
  computed: {
    ...mapGetters('users', ['getCurrentUser']),
    ...mapGetters('positions', ['getById'])
  }
}
</script>

<style>
.q-drawer {
  background: #4064cd;
  background: -webkit-radial-gradient(center, #4064cd, #0c121b);
  background: -moz-radial-gradient(center, #4064cd, #0c121b);
  background: radial-gradient(ellipse at center, #4064cd, #0c121b);
  color: #ececec;
}
</style>
