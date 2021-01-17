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
              <th>DPS Number</th>
              <th>Name</th>
              <th>Position</th>
              <th>Rig</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, id) of users" :key="id">
              <td>
                <q-checkbox class="q-ma-none" v-model="selection" :val="id" size="xs" />
              </td>
              <td>{{user.dpsNumber}}</td>
              <td>{{user.name}}</td>
              <td>{{getPositionById(user.positionId).name}}</td>
              <td>{{getRigById(user.rigId).rig}}</td>
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
            User
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row items-center">
            <q-select
              v-model="selectedRig"
              :options="getRigOptionsList"
              label="Rig"
              class="full-width"
            />
            <q-select
              v-model="selectedPosition"
              :options="getPositionOptionsList"
              label="Position"
              class="full-width"
            />
            <q-input class="full-width" label="DPS Number" v-model="single.dpsNumber" />
            <q-input class="full-width" label="Name" v-model="single.name" />
            <q-input
              class="full-width"
              label="Password"
              v-model="single.password"
              v-if="mode=='Add'"
            />
            <q-btn color="brown-5" label="Change Password" v-if="mode=='Edit'" />
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
import hash from 'hash.js'

export default {
  data() {
    return {
      selectAll: false,
      showSingle: false,
      mode: 'Add',
      selection: [],
      single: {
        dpsNumber: '',
        name: '',
        password: '',
        positionId: '',
        rigId: ''
      },
      selectedRig: '',
      selectedPosition: ''
    }
  },
  methods: {
    ...mapActions('users', ['addUpdate', 'delete']),
    add() {
      this.resetData()
      this.showSingle = true
    },
    edit() {
      this.mode = 'Edit'
      this.single = { ...this.users[this.selection[0]] }
      this.selectedRig = {
        label: this.getRigById(this.single.rigId).rig,
        value: this.single.rigId
      }
      this.selectedPosition = {
        label: this.getPositionById(this.single.positionId).name,
        value: this.single.positionId
      }
      this.showSingle = true
    },
    save() {
      const payload = {}

      payload.data = { ...this.single }
      payload.data.password = hash
        .sha256()
        .update(payload.data.password)
        .digest('hex')
      payload.data.rigId = this.selectedRig ? this.selectedRig.value : ''
      payload.data.positionId = this.selectedPosition.value

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
        dpsNumber: '',
        name: '',
        password: '',
        positionId: '',
        rigId: ''
      }
      this.selectedRig = ''
      this.selectedPosition = ''
    }
  },
  computed: {
    ...mapGetters({ users: 'users/getAll' }),
    ...mapGetters({ getPositionById: 'positions/getById' }),
    ...mapGetters({ getPositionOptionsList: 'positions/getOptionsList' }),
    ...mapGetters({ getRigById: 'rigs/getById' }),
    ...mapGetters({ getRigOptionsList: 'rigs/getActiveRigsOptionsList' })
  },
  watch: {
    selectAll(val) {
      if (val) {
        this.selection = Object.keys(this.users)
      } else {
        this.selection = []
      }
    }
  }
}
</script>
