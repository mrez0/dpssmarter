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
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(department, id) of departments" :key="id">
              <td>
                <q-checkbox class="q-ma-none" v-model="selection" :val="id" size="xs"></q-checkbox>
              </td>
              <td>{{department.name}}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>

    <q-dialog v-model="showSingle" persistent="persistent" class="singleDialog">
      <q-card style="width: 600px">
        <q-card-section>
          <div class="text-h6">
            <span class="text-capitalize">{{mode}}</span> Department
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row items-center">
            <q-input
              autofocus
              label="Name"
              class="full-width departmentNameInput"
              v-model="single.name"
              @keyup.enter="save"
            />
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
        name: ''
      }
    }
  },
  methods: {
    ...mapActions('departments', ['addUpdate', 'delete']),
    add() {
      this.resetData()
      this.showSingle = true
    },
    edit() {
      this.mode = 'Edit'
      this.single = { ...this.departments[this.selection[0]] }
      this.showSingle = true
    },
    save() {
      const payload = { data: this.single }

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
        name: ''
      }
    }
  },
  computed: {
    ...mapGetters({ departments: 'departments/getAll' })
  },
  watch: {
    selectAll(val) {
      if (val) {
        this.selection = Object.keys(this.departments)
      } else {
        this.selection = []
      }
    }
  }
}
</script>
