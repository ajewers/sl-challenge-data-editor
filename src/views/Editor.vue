<template>
  <div class="editor">
    <header>
      <h1>{{ file != null ? file.name : "Use the Upload tab to upload a CSV file." }}</h1>
    </header>
    <!-- Only show the table if a file is loaded -->
    <section v-if='file != null'>
      <DataTable
        :fields='fields'
        :entries='entries' 
      />
    </section>
  </div>
</template>

<script>
import DataTable from '@/components/DataTable.vue'

export default {
  name: "Editor",
  components: {
    DataTable
  },
  computed: {
    file() { return this.$store.getters.file; },
    fields() { return this.$store.getters.fields; },
    entries() { return this.$store.getters.entries; }
  }
}
</script>
