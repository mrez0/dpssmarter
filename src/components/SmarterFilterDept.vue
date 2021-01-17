<template>
  <q-expansion-item
    class="full-width"
    label="Filter by Dept."
    expand-icon-class="white-icon"
    dense
    :disable="false"
    ref="deptExpansion"
    expand-icon="mdi-chevron-up"
  >
    <div class="row justify-between items-center q-mx-sm" @click="filterByDepartment($event)">
      <div class="col-3" v-for="item of nav" :key="item.tooltip">
        <q-btn dense flat>
          <img
            :class="'lighten-hover toggle-filter-' + item.filterType"
            :src="item.image"
            :data-filter-type="item.filterType"
            style="height: 35px; width: 25px;"
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
          image: Management,
          filterType: 'Management',
          tooltip: 'Management'
        },
        {
          image: Drilling,
          filterType: 'Drilling',
          tooltip: 'Drilling'
        },
        {
          image: Barge,
          filterType: 'Barge',
          tooltip: 'Barge'
        },
        {
          image: Aramco,
          filterType: 'Aramco',
          tooltip: 'Aramco'
        },
        {
          image: Mechanical,
          filterType: 'Mechanical',
          tooltip: 'Rig Engineer - Mechanic'
        },
        {
          image: Electrical,
          filterType: 'Electrical',
          tooltip: 'E.T - Electrician'
        },
        {
          image: Catering,
          filterType: 'Catering',
          tooltip: 'Catering - Hygiene'
        },
        {
          image: HSE,
          filterType: 'HSE',
          tooltip: 'HSE'
        }
      ]
    }
  }
}
</script>
