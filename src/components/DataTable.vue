<template>
  <div class="table-container">
    <div class="scrollable-container">
      <table>
        <tr>
          <th v-for='(field, index) in fields' :key='field + "-" + index' :id='field + "-" + index'>{{ field }}</th>
        </tr>
        <tr v-for='(entry, index) in entries' :key='"entry-" + index' :id='"entry-" + index'>
          <EditableCell
            v-for='field in fields'
            :key='"entry-" + index + "-" + field'
            :id='"entry-" + index + "-" + field'
            :value='entry[field]'
            :entry='index'
            :field='field'
          />
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import EditableCell from '@/components/EditableCell.vue'

export default {
  name: 'DataTable',
  components: {
    EditableCell
  },
  props: ['fields', 'entries']
}
</script>

<style scoped>
.table-container {
  text-align: center;
  padding: 0px 50px;
}
.scrollable-container {
  max-height: 800px;
  overflow: auto;
  background: rgb(240, 240, 240);
  -webkit-box-shadow: inset 1px 1px 10px 5px rgba(0,0,0,0.05);
  -moz-box-shadow: inset 1px 1px 10px 5px rgba(0,0,0,0.05);
  box-shadow: inset 1px 1px 10px 5px rgba(0,0,0,0.05);
}
table {
  margin: auto;
}
td, th {
  padding: 10px 5px 10px 5px;
}
</style>