<template>
  <q-layout class="shadow-2" view="lHh lpr lFf" container="container" style="height: 100vh">
    <q-header>
      <ApplicationCommands />
    </q-header>
    <q-page-container>
      <Login />
      <!-- // @todo to remove -->
      <q-btn :to="{name: 'splash'}">Splash</q-btn>
    </q-page-container>
  </q-layout>
</template>

<script>
import ApplicationCommands from 'components/ApplicationCommands'
import Login from 'pages/Login'

export default {
  name: 'MainLayout',
  components: { ApplicationCommands, Login },
  data() {
    return {}
  }
}
</script>
