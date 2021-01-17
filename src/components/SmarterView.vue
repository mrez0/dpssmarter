<template>
  <q-expansion-item
    class="full-width"
    label="View Mode"
    expand-icon-class="white-icon"
    dense
    :disable="false"
    ref="viewModeExpansion"
    expand-icon="mdi-chevron-up"
  >
    <div class="row justify-evenly">
      <div class="col-auto" v-for="item of nav" :key="item.tooltip">
        <q-btn dense flat :disable="item.disable">
          <img class="lighten-hover" :src="item.image" height="35" />
          <q-tooltip
            content-class="bg-primary text-white text-subtitle1"
            anchor="top middle"
            self="bottom middle"
            transition-show="scale"
            transition-hide="scale"
            :hide-delay="0"
          >{{ item.tooltip }}</q-tooltip>
        </q-btn>
      </div>
    </div>
  </q-expansion-item>
</template>

<script>
import SheetView from 'assets/sheetView.png'
import DetailsView from 'assets/detailView.png'

export default {
  data() {
    return {
      nav: [
        {
          disable: false,
          image: SheetView,
          tooltip: 'Sheet View'
        },
        {
          disable: false,
          image: DetailsView,
          tooltip: 'Details View'
        }
      ]
    }
  }
}
</script>
