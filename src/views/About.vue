<template>
  <div>
    <header>
      <h1>Suade Labs JS Challenge 2019 - Alistair Jewers</h1>
    </header>
    <section>
      <div class="text-container">
        <p>I chose to complete scenario one, the 'Data Editor', using Vue.js as the tehnology. Vue is the framework with which I have most experience, and I felt that scenario one would be the best choice to showcase my knowledge of Vue, including Vuex.</p>
        <p>This simple web app has 3 tabs/pages. Each tab is a Vue single file component, found in the 'views' folder. The first, Upload, allows the user to upload a .csv file either by dragging and dropping it onto the UI or by selecting it using a file browser. It provides feedback if the file cannot be used (incorrect file type, incorrect format). The second tab displays the parsed CSV data in a table, where each field can be edited in place (press enter to commit a change, escape or click away to cancel). The third, JSON, provides the current data as a JSON array. The data is stored in the Vuex store, and is therefore shared between the different components and maintained across view changes.</p>
        <p>Arbitrary CSV data is supported, provided that it obeys the following format. The first line must be a comma seperated list of field names (column headings in the table). This must be followed by one or more lines of the same number of comma seperated values. Each line forms an entry (row in the table). Some testing CSV files are provided in the 'data' folder. Files 001 and 005 should load correctly, files 002 - 004 should present with an error.</p>
        <p>The web app is built using babel. The basic structure was created using the Vue CLI (@vue/cli) version 3. Tests are run with Mocha and Chai</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "About"
}
</script>

<style scoped>
.text-container {
  text-align: left;
  margin: 30px 30% 0px 30%;
}
</style>