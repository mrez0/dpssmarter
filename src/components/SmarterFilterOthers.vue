<template>
  <q-expansion-item
    class="full-width"
    label="Other Filters"
    expand-icon-class="white-icon"
    dense
    :disable="false"
    ref="otherExpansion"
    expand-icon="mdi-chevron-up"
  >
    <div class="row justify-evenly items-center">
      <div class="col-auto">
        <q-btn dense flat>
          <img
            class="lighten-hover toggle-filter-rig-move-tasks"
            src="../assets/trailer-truck.png"
            data-filter-type="Rig Move Tasks"
            style="height: 30px; width: 40px;"
          />
          <q-tooltip
            content-class="bg-primary text-white text-subtitle1 rmt"
            anchor="top middle"
            self="bottom middle"
            transition-show="scale"
            transition-hide="scale"
            :hide-delay="0"
          >Rig Move Tasks</q-tooltip>
        </q-btn>
      </div>
      <div class="col-auto">
        <q-btn dense flat data-filter-type="Advanced Filter">
          <q-icon
            class="lighten-hover toggle-filter-advanced-filter"
            name="mdi-text-box-search-outline"
            size="md"
          ></q-icon>
          <q-tooltip
            content-class="bg-primary text-white text-subtitle1"
            anchor="top middle"
            self="bottom middle"
            transition-show="scale"
            transition-hide="scale"
            :hide-delay="0"
          >Advanced Filter</q-tooltip>
        </q-btn>
      </div>
    </div>
    <div class="row justify-evenly items-center"></div>
  </q-expansion-item>
</template>
