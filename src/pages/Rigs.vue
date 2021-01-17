<template>
  <q-page class="flex q-pa-md">
    <div class="column full-width">
      <div class="col-auto row">
        <q-btn glossy="glossy" color="primary" @click="add" id="addBtn">Add</q-btn>
        <q-btn
          id="editBtn"
          glossy="glossy"
          color="warning"
          :disable="selection.length !== 1"
          @click="edit"
        >Edit</q-btn>
        <q-space></q-space>
        <q-btn
          glossy="glossy"
          color="negative"
          :disable="selection.length === 0"
          @click="remove"
          id="deleteBtn"
        >Delete</q-btn>
      </div>
      <div class="col q-my-md">
        <q-markup-table class="full-height text-center">
          <thead>
            <tr>
              <th>
                <q-checkbox class="q-ma-none" v-model="selectAll" size="xs"></q-checkbox>
              </th>
              <th>Rig</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rig, id) of rigs" :key="id">
              <td>
                <q-checkbox class="q-ma-none" v-model="selection" :val="id" size="xs" />
              </td>
              <td>{{rig.rig}}</td>
              <td>
                <q-badge color="blue" v-if="rig.active">Active</q-badge>
                <q-badge color="red" v-else>Not-Active</q-badge>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>

    <q-dialog v-model="showSingle" persistent="persistent" class="singleDialog">
      <q-card style="width: 600px">
        <q-card-section>
          <div class="text-h6">
            <span class="text-capitalize">{{mode}}</span>
            Rig
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row items-center">
            <q-input label="Rig" v-model="single.rig" class="full-width" />
            <q-checkbox class="full-width" v-model="single.active" label="Active" />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Save" color="primary" @click="save" id="saveBtn"></q-btn>
          <q-btn
            outline="outline"
            label="Cancel"
            color="negative"
            @click="resetData"
            id="cancelBtn"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { uid } from 'quasar'

export default {
  data() {
    return {
      selectAll: false,
      showSingle: false,
      mode: 'Add',
      selection: [],
      single: {
        rig: '',
        active: true
      }
    }
  },
  methods: {
    ...mapActions('rigs', ['addUpdate', 'delete']),
    add() {
      this.resetData()
      this.showSingle = true
    },
    edit() {
      this.mode = 'Edit'
      this.single = { ...this.rigs[this.selection[0]] }
      this.showSingle = true
    },
    save() {
      const payload = {}
      payload.data = {
        rig: this.single.rig,
        active: this.single.active
      }

      if (this.mode === 'Add') {
        payload.id = Date.now().toString() + '-' + uid()
      } else {
        payload.id = this.selection[0]
      }
      this.addUpdate(payload)
      this.selection = []
      this.resetData()
    },
    remove() {
      if (this.selection.length === 0) {
        return
      }
      for (let id of this.selection) {
        this.delete({ id })
      }
      this.selection = []
      this.selectAll = false
    },
    resetData() {
      this.showSingle = false
      this.mode = 'Add'
      this.single = {
        rig: '',
        active: true
      }
    }
  },
  computed: {
    ...mapGetters({ rigs: 'rigs/getAll' }),
    ...mapGetters({ getRigById: 'rigs/getById' }),
    ...mapGetters({ rigsOptionsList: 'rigs/getOptionsList' })
  },
  watch: {
    selectAll(val) {
      if (val) {
        this.selection = Object.keys(this.rigs)
      } else {
        this.selection = []
      }
    },
    selection() {
      if (this.selection.length === 0) {
        this.selectAll = false
      }
    }
  }
}
</script>
