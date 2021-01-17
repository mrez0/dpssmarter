import { db } from "boot/firestore";
import Vue from "vue";

const collectionName = "permissions";

const state = {
  permissions: {},
  permissionsList: {
    smarter: [
      "Can add SMARTER point",
      "Can edit SMARTER point",
      "Can delete SMARTER point",
      "Can share SMARTER point",
      "Can confirm SMARTER point",
      "Can change status SMARTER point",
      "Can request change status SMARTER point",
      "Can import SMARTER points",
      "Can manage SMARTER Categories"
    ],
    management: [
      "Can see all rigs",
      "Can manage Departments",
      "Can manage Positions",
      "Can manage Permissions",
      "Can manage Rigs",
      "Can manage Users"
    ]
  }
};
const mutations = {
  addUpdate(state, payload) {
    Vue.set(state.permissions, payload.id, payload.data);
  },
  delete(state, payload) {
    Vue.delete(state.permissions, payload.id);
  }
};

const actions = {
  addUpdate({ commit }, payload) {
    db.collection(collectionName)
      .doc(payload.id)
      .set(payload.data)
      .then(() => {
        commit("addUpdate", payload);
      });
  },
  delete({ commit }, payload) {
    db.collection(collectionName)
      .doc(payload.id)
      .delete()
      .then(() => {
        commit("delete", payload);
      });
  },
  syncData({ commit }) {
    db.collection(collectionName).onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added" || change.type === "modified") {
          commit("addUpdate", {
            id: change.doc.id,
            data: change.doc.data()
          });
        }
        if (change.type === "removed") {
          commit("delete", {
            id: change.doc.id
          });
        }
      });
    });
  }
};

const getters = {
  getAll(state) {
    return state.permissions;
  },
  getById(state) {
    return id => {
      return state.permissions[id];
    };
  },
  getByFilter(state) {
    return filterFn => {
      return Object.values(state.permissions).filter(filterFn);
    };
  },
  getPermissionsList(state) {
    const management = state.permissionsList.management.map(item => ({
      label: item,
      value: item
    }));
    const smarter = state.permissionsList.smarter.map(item => ({
      label: item,
      value: item
    }));

    return { management, smarter };
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
