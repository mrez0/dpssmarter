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
              <th>Position</th>
              <th>Permissions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(permission, id) of permissions" :key="id">
              <td>
                <q-checkbox class="q-ma-none" v-model="selection" :val="id" size="xs"></q-checkbox>
              </td>
              <td>{{getPositionById(permission.positionId).name}}</td>
              <td class="text-left">
                <div class="row q-pa-md">
                  <q-badge
                    color="blue"
                    class="col-auto q-mx-md q-my-sm"
                    v-for="(permission, id) of permission.permissions"
                    :key="id"
                  >{{permission}}</q-badge>
                </div>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>

    <q-dialog v-model="showSingle" persistent="persistent" class="singleDialog" full-width>
      <q-card style="width: 600px">
        <q-card-section>
          <div class="text-h6">
            <span class="text-capitalize">{{mode}}</span>
            Permissions
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row items-center">
            <q-select
              class="full-width"
              v-model="selectedPosition"
              :options="positionsOptionsList"
              label="Position"
            ></q-select>
            <div class="row">
              <div class="bg-grey-2 q-pa-sm rounded-borders q-ma-md col-auto">
                <span class="text-bold">Management Permissions:</span>
                <q-option-group
                  v-model="single.permissions"
                  :options="permissionsList.management"
                  type="checkbox"
                />
              </div>
              <div class="bg-grey-2 q-pa-sm rounded-borders q-ma-md col-auto">
                <span class="text-bold">SMARTER Permissions:</span>
                <q-option-group
                  v-model="single.permissions"
                  :options="permissionsList.smarter"
                  type="checkbox"
                />
              </div>
            </div>
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
        positionId: '',
        permissions: []
      },
      selectedPosition: ''
    }
  },
  methods: {
    ...mapActions('permissions', ['addUpdate', 'delete']),
    add() {
      this.resetData()
      this.showSingle = true
    },
    edit() {
      this.mode = 'Edit'
      this.single = { ...this.permissions[this.selection[0]] }
      this.selectedPosition = {
        label: this.getPositionById(this.single.positionId).name,
        value: this.single.positionId
      }
      this.showSingle = true
    },
    save() {
      const payload = {}
      payload.data = {
        positionId: this.selectedPosition.value,
        permissions: this.single.permissions
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
      this.selectedPosition = ''
      this.mode = 'Add'
      this.single = {
        positionId: '',
        permissions: []
      }
    }
  },
  computed: {
    ...mapGetters({ permissions: 'permissions/getAll' }),
    ...mapGetters({ getPositionById: 'positions/getById' }),
    ...mapGetters({ positionsOptionsList: 'positions/getOptionsList' }),
    ...mapGetters({ permissionsList: 'permissions/getPermissionsList' })
  },
  watch: {
    selectAll(val) {
      if (val) {
        this.selection = Object.keys(this.permissions)
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
