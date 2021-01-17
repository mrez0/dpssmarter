<template>
  <q-expansion-item
    class="full-width"
    label="Actions"
    expand-icon-class="white-icon"
    :disable="false"
    dense
    ref="actionsExpansion"
    expand-icon="mdi-chevron-up"
  >
    <div class="row justify-evenly items-center">
      <div class="col-auto" v-for="item of nav" :key="item.tooltip" :ref="item.tooltip + 'Btn'">
        <q-btn dense flat round :icon="item.icon" size="lg" class="lighten-hover">
          <q-tooltip
            content-class="bg-primary text-white text-subtitle1"
            anchor="top middle"
            self="bottom middle"
            transition-show="scale"
            transition-hide="scale"
            :hide-delay="0"
          >{{item.tooltip}}</q-tooltip>
        </q-btn>
      </div>
    </div>
  </q-expansion-item>
</template>


<script>
import Management from 'assets/management.png'
import Drilling from 'assets/drilling.png'
import Barge from 'assets/barge.png'
import Aramco from 'assets/Aramco.png'
import Mechanical from 'assets/mechanic.png'
import Electrical from 'assets/electrician.png'
import Catering from 'assets/Catering.png'
import HSE from 'assets/HSE.png'

export default {
  data() {
    return {
      nav: [
        {
          icon: 'mdi-plus-circle-outline',
          tooltip: 'Add'
        },
        {
          icon: 'mdi-square-edit-outline',
          tooltip: 'Edit'
        },
        {
          icon: 'mdi-checkbox-marked-circle-outline',
          tooltip: 'Save'
        },
        {
          icon: 'mdi-share-variant',
          tooltip: 'Share'
        },
        {
          icon: 'mdi-trash-can-outline',
          tooltip: 'Delete'
        },
        {
          icon: 'mdi-import',
          tooltip: 'Import'
        },
        {
          icon: 'mdi-export',
          tooltip: 'Export'
        },
        {
          icon: 'mdi-close-circle-outline',
          tooltip: 'Close'
        }
      ]
    }
  }
}
</script>
