<template>
  <q-bar class="q-electron-drag bg-white text-primary">
    <q-space></q-space>
    <q-btn
      color="black"
      class="minimizeBtn"
      dense="dense"
      flat="flat"
      icon="minimize"
      @click="minimize"
    ></q-btn>
    <q-btn
      color="black"
      class="maximizeBtn"
      dense="dense"
      flat="flat"
      icon="crop_square"
      @click="maximize"
    ></q-btn>
    <q-btn color="black" class="closeBtn" dense="dense" flat="flat" icon="close" @click="closeApp"></q-btn>
  </q-bar>
</template>

<script>
export default {
  methods: {
    minimize() {
      this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
    },
    maximize() {
      const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()

      if (win.isMaximized()) {
        win.unmaximize()
      } else {
        win.maximize()
      }
    },
    closeApp() {
      this.$q
        .dialog({
          title: 'Confirm',
          message: `Are you sure to exit?`,
          cancel: true
        })
        .onOk((result) => {
          this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
        })
    }
  }
}
</script>
