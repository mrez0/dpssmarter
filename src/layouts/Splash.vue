<template>
  <div class="main-login row items-center">
    <q-linear-progress class="progress-loading" indeterminate color="white" size="xs" />
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$router.replace({ name: 'login' })
    }, 5000)
  }
}
</script>

<style scoped>
.q-page-container {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(240, 248, 255, 1) 100%
  );
}

.main-login {
  width: 434px;
  height: 545px;
  background-image: url('../assets/dpslogowhite.png');
  background-size: auto;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #273650 !important;
}

.progress-loading {
  /*margin-right: auto;*/
  /*margin-left: auto;*/
  /*top: 425px;*/
  /*left: 100px;*/
  width: 250px;
  margin: auto;
  margin-bottom: 200px;
}

body {
  overflow: hidden;
}
</style>
