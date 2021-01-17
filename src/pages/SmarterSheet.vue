<template>
  <q-page>
    {{selectedSmarter}}
    <q-table
      :columns="columns"
      :data="Object.values(smarter)"
      row-key="name"
      dense
      virtual-scroll
      selection="single"
      :selected.sync="selectedSmarter"
    >
      <template v-slot:body-cell-actionParty="props">
        <q-td :props="props">
          <q-list dense>
            <q-item v-for="actionParty of props.row.actionParty" :key="actionParty">
              <q-item-section avatar>
                <q-icon color="primary" name="bluetooth" />
              </q-item-section>
              <q-item-section>{{getPositionById(actionParty).name}}</q-item-section>
            </q-item>
          </q-list>
        </q-td>
      </template>

      <template v-slot:body-cell-rigs="props">
        <q-td :props="props">
          <q-markup-table dense>
            <thead style="text-align: center">
              <th>Rig</th>
              <th>Priority</th>
              <th>ETA Date</th>
              <th>Closing Date</th>
              <th>Status</th>
            </thead>
            <tbody>
              <tr v-for="rig of props.row.rigs" :key="rig.rigId" style="text-align: center">
                <td>{{getRigById(rig.rigId).rig}}</td>
                <td>{{rig.priority}}</td>
                <td>{{rig.eta}}</td>
                <td>{{rig.closingDate}}</td>
                <td>{{rig.status}}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-td>
      </template>
    </q-table>
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
      },
      selectedSmarter: [],
      columns: [
        {
          name: 'observation',
          label: 'Observation',
          field: 'observation',
          align: 'center'
        },
        {
          name: 'category',
          label: 'Category',
          field: 'category',
          align: 'center'
        },
        {
          name: 'subCategory',
          label: 'Sub Category',
          field: 'subCategory',
          align: 'center'
        },
        {
          name: 'observationDate',
          label: 'Observation Date',
          field: 'observationDate',
          align: 'center'
        },
        {
          name: 'actionParty',
          label: 'Action Party',
          field: 'actionParty'
        },
        {
          name: 'rigs',
          label: '',
          field: 'rigs'
        }
      ]
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
    ...mapGetters({ smarter: 'smarter/getAll' }),
    ...mapGetters({ getRigById: 'rigs/getById' }),
    ...mapGetters({ getPositionById: 'positions/getById' }),
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
