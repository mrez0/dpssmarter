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
              <th>Category</th>
              <th>Sub-Categories</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cat, id) of smarterCategories" :key="id">
              <td>
                <q-checkbox class="q-ma-none" v-model="selection" :val="id" size="xs" />
              </td>
              <td>{{cat.category}}</td>
              <td class="text-left">
                <div class="row q-pa-md">
                  <q-badge
                    color="blue"
                    class="col-auto q-mx-md q-my-sm"
                    v-for="(subCategory) of cat.subCategories"
                    :key="subCategory"
                  >{{subCategory}}</q-badge>
                </div>
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
            Categories
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row items-center">
            <q-input label="Category" v-model="single.category" class="full-width" />
            <q-input
              label="Add Sub-Category"
              v-model="subCategory"
              @keyup.enter="addSubCategory"
              class="full-width q-mb-md"
            />
            <q-badge
              color="blue"
              v-for="subCategory of single.subCategories"
              :key="subCategory"
              class="q-mx-md q-my-sm"
            >
              {{subCategory}}
              <q-btn icon="close" flat round size="xs" @click="removeSubCategory(subCategory)" />
            </q-badge>
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
        category: '',
        subCategories: []
      },
      subCategory: ''
    }
  },
  methods: {
    ...mapActions('smarterCategories', ['addUpdate', 'delete']),
    add() {
      this.resetData()
      this.showSingle = true
    },
    edit() {
      this.mode = 'Edit'
      this.single = { ...this.smarterCategories[this.selection[0]] }
      this.single.subCategories = [...this.single.subCategories]
      this.showSingle = true
    },
    save() {
      const payload = {}
      payload.data = {
        category: this.single.category,
        subCategories: this.single.subCategories
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
        category: '',
        subCategories: []
      }
    },
    addSubCategory() {
      this.single.subCategories.push(this.subCategory)
      this.subCategory = ''
    },
    removeSubCategory(subCategory) {
      const index = this.single.subCategories.indexOf(subCategory)
      this.single.subCategories.splice(index, 1)
    }
  },
  computed: {
    ...mapGetters({ smarterCategories: 'smarterCategories/getAll' })
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
