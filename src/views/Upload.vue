<template>
  <section class="upload-tab">
    <FileUpload />
  </section>
</template>

<script>
import FileUpload from '@/components/FileUpload.vue'

export default {
  name: 'Upload',
  components: {
    FileUpload
  }
}
</script>

<style>
.upload-tab {
  position: absolute;
  top: 58px;
  left: 0px;
  height: calc(100% - 58px);
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
}
</style>
