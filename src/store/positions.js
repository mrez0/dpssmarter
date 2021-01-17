import { db } from "boot/firestore";
import Vue from "vue";

const collectionName = "positions";

const state = {};
const mutations = {
  addUpdate(state, payload) {
    Vue.set(state, payload.id, payload.data);
  },
  delete(state, payload) {
    Vue.delete(state, payload.id);
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
    return state;
  },
  getById(state) {
    return id => {
      return state[id];
    };
  },
  getByFilter(state) {
    return filterFn => {
      return Object.values(state).filter(filterFn);
    };
  },
  getOptionsList(state) {
    const result = [];
    for (let id of Object.keys(state)) {
      result.push({
        label: state[id].name,
        value: id
      });
    }

    return result;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
