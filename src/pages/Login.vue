<template>
  <q-page class="q-pa-md">
    <div class="text-center">
      <img src="../assets/dps_logo2.png" width="200" height="150" />
    </div>
    <div class="text-center">
      <q-input
        class="q-ma-lg q-mx-auto dpsNumber"
        label="DPS Number"
        dense="dense"
        style="width: 75%"
        v-model="dpsNumber"
      ></q-input>
    </div>
    <div class="text-center">
      <q-input
        class="q-ma-lg q-mx-auto password"
        label="Password"
        dense="dense"
        style="width: 75%"
        type="password"
        v-model="password"
        @keydown.enter="login"
      ></q-input>
    </div>
    <div class="text-center q-pa-lg">
      <q-btn color="primary" @click="login" class="login">
        <q-icon class="q-mr-md" name="mdi-login"></q-icon>Login
      </q-btn>
    </div>
    <div class="text-center q-pa-lg">
      <q-btn class="full-width" color="primary" flat="flat" @click="forgetPassword">Forget Password?</q-btn>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      dpsNumber: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('users', ['loginUser']),
    forgetPassword() {},
    login() {
      if (
        this.dpsNumber.trim().length == 0 ||
        this.password.trim().length == 0
      ) {
        this.$q.dialog({
          title: 'Error',
          message: 'Please fill all login details'
        })
        return
      }

      this.$q.loading.show()
      this.loginUser({ dpsNumber: this.dpsNumber, password: this.password })
    }
  }
}
</script>

