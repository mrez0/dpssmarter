<template>
  <div>
    <div class="row items-center q-mx-md">
      <div class="col q-ml-sm">
        <q-select
          class="select-rig"
          borderless
          dense
          hide-bottom-space
          :hide-dropdown-icon="false"
          popup-content-class="select-popup"
          color="indigo-10"
          value="All"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" dense>
              <q-item-section>
                <q-item-label class="text-indigo-10" v-html="scope.opt"></q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
    <q-list>
      <q-item :to="{name: 'smarter-dashboard'}" exact style="min-height: 0">DASHBOARD</q-item>
      <q-item :to="{name: 'smarter-sheet'}" exact style="min-height: 0">SMARTER</q-item>
      <q-item :to="{name: 'smarter-categories'}" exact style="min-height: 0">SMARTER CATEGORIES</q-item>
    </q-list>
  </div>
</template>

<style>
.router-link-exact-active,
.router-link-active,
.q-router-link--active {
  color: white !important;
  font-weight: bold;
  text-align: center;
  cursor: default;
}

.select-popup {
  /*background: #9C27B0;*/
  background: white;
}

.select-rig span,
.select-rig .q-select__dropdown-icon {
  color: yellow;
}
</style>
