import { db } from "boot/firestore";
import Vue from "vue";

const collectionName = "smarter";

const state = {
  smarter: {},
  filters: []
};
const mutations = {
  addUpdate(state, payload) {
    Vue.set(state.smarter, payload.id, payload.data);
  },
  delete(state, payload) {
    Vue.delete(state.smarter, payload.id);
  }
};

const actions = {
  addUpdate({ commit }, payload) {
    db.collection(collectionName)
      .doc(payload.id)
      .set(payload.data)
      .then(() => {
        payload.rigs = [];
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
  getAll(state, {}, {}, rootGetters) {
    const result = { ...state.smarter };
    if (state.filters.length === 0) {
      for (let observationId of Object.keys(result)) {
        const rigsSmarter = rootGetters["rigSmarter/getByFilter"](
          rigSmarter => {
            return rigSmarter.smarterId === observationId;
          }
        );
        result[observationId].rigs = [...rigsSmarter];
        result[observationId].observationId = observationId;
      }
      return result;
    }
  },
  getById(state) {
    return id => {
      return id ? state.smarter[id] : "";
    };
  },
  getByFilter(state) {
    return filterFn => {
      return Object.values(state.smarter).filter(filterFn);
    };
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
