<template>
  <div>
    <pdf :src="filePath"></pdf>
    <p>{{ filePath }}</p>
  </div>
</template>

<script>
  import pdf from 'vue-pdf'

  export default {
    name: "FileViewer",
    props: ['filePath'],
    components: {
      pdf
    },
    methods: {

    }
  }
</script>