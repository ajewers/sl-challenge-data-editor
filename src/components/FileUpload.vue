<template>
  <div class='container'>
    <!-- Main file upload box, listens for drag events to receive drag and drop files -->
    <div class='file-upload'
         v-if='supported'
         v-bind:class='fileUploadClass'
         v-on:dragenter='onDragEnter'
         v-on:dragleave='onDragLeave'
         v-on:dragend='onDragLeave'
         v-on:dragover='onDragOver'
         v-on:drop='onDrop'>
      <!-- Main text within the box -->
      <div class="call-to-action">{{ instructionText }}</div>
      <!-- Aditional text and items within the box -->
      <div class="additional-container" v-if='fileUploadClass != "error"'>
        <div id="alternative-text" class="additional-text" v-if='file == null'>Alternatively, choose a file to upload</div>
        <div id="editor-link" class="additional-text clicky" v-else v-on:click='$router.push("editor")'>View in the editor tab</div>
        <input type="file"
               id="file-input"
               accept=".csv"
               v-if='file == null'
               v-on:change='onFileSelect' />
        <div id="reset-link" class="additional-text clicky" v-on:click='reset' v-else>Upload a different file</div>
      </div>
    </div>
    <div v-else>Unfortunately this browser does not support the File API.</div>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  props: [],
  data: function() {
    return {
      supported: true,
      fileUploadClass: "",
      instructionText: "Drag .CSV file here to upload"
    }
  },
  computed: {
    file() { return this.$store.getters.file; },
    fields() { return this.$store.getters.fields; },
    entries() { return this.$store.getters.entries; }
  },
  mounted() {
    // Check this browser supports File API
    this.supported = (window.File && window.FileReader && window.FileList && window.Blob);

    // Check if data has already been loaded in
    if (this.file != null) {
      this.fileUploadClass = "success";
      this.instructionText = this.file.name + " - Upload succesful!";
    }
  },
  methods: {
    onDragEnter(event) {
      if (this.file == null) {
        var isFile = event.dataTransfer.types.includes("Files");
  
        if (isFile) {
          // If a file is being dragged over the box, update the class in response
          this.fileUploadClass = "drag-over";
        }
      }
    },
    onDragLeave() {
      if (this.file == null) {
        // Return to normal state
        this.fileUploadClass = "";
      }
    },
    onDragOver(event) {
      if (this.file == null) {
        var isFile = event.dataTransfer.types.includes("Files");
  
        if (isFile) {
          // If a file is being dragged over the box, update the class in response
          this.fileUploadClass = "drag-over";

          // Must prevent default to indicate that this is a drag target
          event.preventDefault();
        }
      }
    },
    onDrop(event) {
      if (this.file == null && event.dataTransfer.files[0] != null) {
        // Prevent default to stop the browser opening the file
        event.preventDefault();
  
        // Attempt to read the file
        this.uploadFile(event.dataTransfer.files[0]);
      }
    },
    onFileSelect(event) {
      // Also attempt to read the file when selected by file browser
      this.uploadFile(event.target.files[0]);
    },
    uploadFile(file) {
      // Save the file object to the store to keep hold of details (e.g. name)
      this.$store.commit("saveFile", file);

      // Ensure file type is correct
      if (!(this.file.name.endsWith(".csv") || this.file.name.endsWith(".CSV"))) {
        this.showError("Must be a .CSV file.", 3);

        return;
      }

      // Indicate that the file is in processing
      this.fileUploadClass = "processing";
      this.instructionText = "Processing file...";
  
      // Read the file as text
      let reader = new FileReader();

      reader.onload = () => {
        // Success, parse the resulting string
        this.parseCSV(reader.result)
      };

      reader.onerror = reader.onabort = () => {
        // Failure, show an error
        this.showError("An error occurred whilst uploading.", 3);
      }

      reader.readAsText(this.file);
    },
    parseCSV(str) {
      let lines = str.split("\n");

      // Esnure there are 2 or more lines (one for fields and one or more entries)
      if (lines.length < 2) {
        this.showError("CSV file must include at least two lines.", 3);

        return;
      }

      // Parse and trim the field names
      let fields = lines[0].split(",").map(l => l.trim());
      let entries = [];

      // For each line after the first
      for (let i = 1; i < lines.length; i++)
      {
        let entry = {};
        let dataRaw = lines[i].split(",");

        if (dataRaw.length == fields.length) {
          // Generate the entry by inserting a value for each field with matching index
          fields.forEach((field, index) => {
            entry[field.trim()] = dataRaw[index].trim();
          });

          entries.push(entry);
        } else {
          // Show an error if any entry has too many or too few fields
          this.showError("Line " + i + " contains incorrect number of values.", 3);

          return;
        }
      }

      // Save the parsed entries to the store
      this.$store.commit("saveCSVData", { fields: fields, entries: entries });

      // Indicate the success to the user
      this.fileUploadClass = "success";
      this.instructionText = this.file.name + " - Upload succesful!";
    },
    showError(informationText, duration) {
      this.fileUploadClass = "error";
      this.instructionText = informationText;

      window.setTimeout(() => {
        this.reset();
      }, duration * 1000);
    },
    reset() {
      // Fully reset the uploaded file & all data so another can be chosen
      this.$store.commit("clearData");
      this.$store.commit("saveFile", null);
      this.fileUploadClass = "";
      this.instructionText = "Drag .CSV file here to upload";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  flex: 0 1 auto;
  width: 100%;
  min-height: 800px;
  text-align: center;
}
.file-upload {
  width: 800px;
  height: 100%;
  margin: auto;
  border: 2px dashed rgba(0, 0, 0, 0.4);
  border-radius: 30px;
  transition: all 0.5s;
}
.file-upload.drag-over {
  background: rgb(240, 240, 240);
}
.file-upload.processing {
  border: 2px solid rgb(0, 162, 255);
  background: rgba(0, 162, 255, 0.05);
}
.file-upload.success {
  border: 2px solid rgb(69, 170, 60);
  background: rgba(69, 170, 60, 0.05);
}
.file-upload.error {
  border: 2px solid rgb(158, 39, 39);
  background: rgba(158, 39, 39, 0.05);
}
.call-to-action {
  position: relative;
  top: 40%;
  font-size: 30pt;
  pointer-events: none;
}
.additional-container {
  position: relative;
  top: 45%;
  pointer-events: none;
}
.additional-text {
  margin-bottom: 15px;
}
#file-input {
  pointer-events: all;
  margin-left: 70px;
}
</style>
