<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  created() {
    this.syncUsers()
    this.syncDepartments()
    this.syncPositions()
    this.syncPermissions()
    this.syncRigs()
    this.syncSmarterCategories()
    this.syncSmarter()
    this.syncRigSmarter()
  },
  methods: {
    ...mapActions({
      syncUsers: 'users/syncData',
      syncDepartments: 'departments/syncData',
      syncPositions: 'positions/syncData',
      syncPermissions: 'permissions/syncData',
      syncRigs: 'rigs/syncData',
      syncSmarterCategories: 'smarterCategories/syncData',
      syncSmarter: 'smarter/syncData',
      syncRigSmarter: 'rigSmarter/syncData'
    })
  }
}
</script>
