<template>
  <q-layout class="shadow-2" view="lHh lpr lFf" container="container" style="height: 100vh">
    <q-header>
      <ApplicationCommands />
      <Header />
    </q-header>
    <Sidebar />
    <q-page-container>
      <router-view />
      <!-- // @todo to remove -->
    </q-page-container>
  </q-layout>
</template>

<script>
import ApplicationCommands from 'components/ApplicationCommands'
import Header from 'components/Header'
import Sidebar from 'components/Sidebar'

export default {
  name: 'MainLayout',
  components: { ApplicationCommands, Header, Sidebar },
  data() {
    return {}
  }
}
</script>
