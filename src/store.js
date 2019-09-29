import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Export the mutations as a named object so that they can be unit tested
export const mutations = {
  saveFile(state, file) {
    state.file = file;
  },
  saveCSVData(state, csvData) {
    state.fields.splice(0, state.fields.length, ...csvData.fields);
    state.entries.splice(0, state.entries.length, ...csvData.entries);
  },
  updateEntry(state, update) {
    state.entries[update.entry][update.field] = update.value;
  },
  clearData(state) {
    state.fields.splice(0, state.fields.length);
    state.entries.splice(0, state.entries.length);
  },
  setActiveCell(state, id) {
    state.activeCell = id;
  }
};

// Likewise with the getters
export const getters = {
  file: state => { return state.file; },
  fields: state => { return state.fields },
  entries: state => { return state.entries },
  activeCell: state => { return state.activeCell }
};

export default new Vuex.Store({
  state: {
    file: null,
    fields: [],
    entries: [],
    activeCell: ""
  },
  getters: getters,
  mutations: mutations,
  actions: { }
});
