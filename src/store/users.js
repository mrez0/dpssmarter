import { db } from "boot/firestore";
import { showError } from "../functions/showError";
import isOnline from "is-online";
import Vue from "vue";
import { Loading } from "quasar";
import hash from "hash.js";

const collectionName = "users";

const state = {
  users: {},
  currentUser: {}
};
const mutations = {
  addUpdate(state, payload) {
    Vue.set(state.users, payload.id, payload.data);
  },
  setCurrentUser(state, payload) {
    Vue.set(state, "currentUser", { id: payload.id, ...payload.data });
  },
  delete(state, payload) {
    Vue.delete(state.users, payload.id);
  }
};

const actions = {
  async loginUser({ commit, getters }, payload) {
    const user = getters.getByDpsNumberAndPassword(
      payload.dpsNumber,
      payload.password
    );

    if (user) {
      commit("setCurrentUser", { id: user.id, data: user.data });
      this.$router.push({ name: "main" });
      Loading.hide();
      return;
    } else {
      let online = await isOnline();
      if (online) {
        showError("Invalid login details");
      } else {
        showError(
          "Invalid login details. If new user, internet connection is required for login"
        );
      }
    }
  },
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
          console.log("Removed city: ", change.doc.data());
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
    return state.users;
  },
  getById(state) {
    return id => {
      return state.users[id];
    };
  },
  getByDpsNumberAndPassword(state) {
    return (dpsNumber, password) => {
      const hashedPassword = hash
        .sha256()
        .update(password)
        .digest("hex");

      for (let id in state.users) {
        if (
          state.users[id].dpsNumber === dpsNumber &&
          state.users[id].password === hashedPassword
        ) {
          return { id: id, data: state.users[id] };
        }
      }
    };
  },
  getCurrentUser(state) {
    return state.currentUser;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
