<template>
  <td :class='editing ? "editing" : "editable"' v-on:click='onClick'>
    <div id='value' v-show='editing == false'>
      {{ value }}
    </div>
    <input 
      id='input' 
      ref='input'
      type="text"
      v-show='editing'
      v-model='model'
      v-on:keyup.enter='saveEdit'
      v-on:keyup.esc='cancelEdit'
      v-on:blur='cancelEdit'
    />
  </td>
</template>

<script>
import Vue from 'vue';

export default {
  name: "EditableCell",
  props: ["value", "id", "entry", "field"],
  data: function() {
    return {
      editing: false,
      model: ""
    }
  },
  computed: {
    activeCell() { return this.$store.getters.activeCell; }
  },
  methods: {
    onClick() {
      if (this.editing == false) {
        this.editing = true;

        // Copy current value into model for editing
        this.model = this.value;

        // Update the active cell in the store to ensure only one cell can be edited at a time
        this.$store.commit("setActiveCell", this.id);

        // Acquire focus on next tick, once the input is visible
        Vue.nextTick(() => {
          this.$refs['input'].focus();
        });
      }
    },
    saveEdit() {
      this.editing = false;

      // Save change to the store
      this.$store.commit("updateEntry", { entry: this.entry, field: this.field, value: this.model });
    },
    cancelEdit() {
      this.editing = false;
    }
  },
  watch:{
    activeCell() {
      if (this.editing && this.activeCell != this.id) {
        this.editing = false;
      }
    }
  }
}
</script>

<style scoped>
td {
  min-width: 100px;
}
td.editable {
  cursor: pointer;
}
td.editable:hover {
  background: rgb(138, 196, 219);
}
#input {
  border: none;
  text-align: center;
  background: none;
}
</style>