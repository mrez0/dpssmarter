<template>
  <div class="fixed-bottom q-pb-md">
    <SmarterView />
    <q-separator class="bg-white q-mx-auto" style="width: 80%; opacity: 0.4" />
    <SmarterFilterStatus />
    <q-separator class="bg-white q-mx-auto" style="width: 80%; opacity: 0.4" />
    <SmarterFilterDept />
    <q-separator class="bg-white q-mx-auto" style="width: 80%; opacity: 0.4" />
    <SmarterFilterOthers />
    <q-separator class="bg-white q-mx-auto" style="width: 80%; opacity: 0.4" />
    <SmarterEditMenu />
  </div>
</template>

<script>
import SmarterView from 'components/SmarterView'
import SmarterFilterStatus from 'components/SmarterFilterStatus'
import SmarterFilterDept from 'components/SmarterFilterDept'
import SmarterFilterOthers from 'components/SmarterFilterOthers'
import SmarterEditMenu from 'components/SmarterEditMenu'

export default {
  components: {
    SmarterView,
    SmarterFilterStatus,
    SmarterFilterDept,
    SmarterFilterOthers,
    SmarterEditMenu
  }
}
</script>
