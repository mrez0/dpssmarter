<template>
  <q-expansion-item
    class="full-width"
    label="Filter by Status"
    expand-icon-class="white-icon"
    dense
    :disable="false"
    ref="filterExpansion"
    expand-icon="mdi-chevron-up"
  >
    <div class="row justify-evenly">
      <div class="col-auto" v-for="item of nav" :key="item.tooltip">
        <q-btn dense flat>
          <img
            :class="'lighten-hover toggle-filter-' + item.filterName"
            :src="item.image"
            height="45"
          />
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
import ClosedImage from 'assets/filterClosed.png'
import OverdueImage from 'assets/filterOverdue.png'
import OpenImage from 'assets/filterOpen.png'

export default {
  data() {
    return {
      nav: [
        {
          image: ClosedImage,
          filterName: 'closed',
          tooltip: 'Closed'
        },
        {
          image: OverdueImage,
          filterName: 'overdue',
          tooltip: 'Overdue'
        },
        {
          image: OpenImage,
          filterName: 'open',
          tooltip: 'Open'
        }
      ]
    }
  }
}
</script>
