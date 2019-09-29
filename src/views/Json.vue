<template>
  <div class="json">
    <header>
      <h1>{{ file != null ? file.name : "Use the Upload tab to upload a CSV file." }}</h1>
    </header>
    <!-- Only show the JSON if a file is loaded -->
    <section v-if='file != null'>
      <textarea v-model="json" readonly />
    </section>
  </div>
</template>

<script>
export default {
  name: "Editor",
  computed: {
    file() { return this.$store.getters.file; },
    entries() { return this.$store.getters.entries; },
    
    // Computed JSON string will re-compute any time 'entries' changes
    json() { return JSON.stringify(this.entries, null, 2); }
  }
}
</script>

<style scoped>
textarea {
  resize: none;
  width: 80%;
  min-height: 800px;
}
</style>
