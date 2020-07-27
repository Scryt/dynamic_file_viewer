<template>
  <div class="container">
    <pdf :src="filePath"
         @num-pages="setNumOfPages"
         :page="pageNum"
         class="pdf-styling"
    ></pdf>
    <nav class="pdf-nav">
      <ul class="container pdf-controls">
        <li @click="turnPreviousPage">
          <i :class="{last_page: !this.isFirstPage}" class="fas fa-arrow-alt-square-left"></i>
        </li>
        <li>
          <p>{{ pageNum }} / {{ numOfPages }}</p>
        </li>
        <li @click="turnNextPage">
          <i :class="{first_page: !this.isLastPage}" class="fas fa-arrow-alt-square-right"></i>
        </li>
        <li id="file-upload-button">
          <button @click="returnToUpload">Return to uploads</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  import pdf from 'vue-pdf'

  export default {
    name: "FileViewer",
    data() {
      return {
        numOfPages: undefined,
        isFirstPage: undefined,
        isLastPage: undefined,
        pageNum: 1
      }
    },
    props: ['filePath'],
    components: {
      pdf
    },
    methods: {
      returnToUpload() {
        this.$emit('returnToFileUpload', false, {});
      },
      setNumOfPages(numOfPages) {
        this.numOfPages = numOfPages

        if (this.numOfPages === 1) {
          this.isFirstPage = true
          this.isLastPage = true
        }
      },
      turnNextPage() {
        if (this.pageNum === this.numOfPages) {
          return
        }

        this.pageNum++;
        this.buttonState(this.pageNum)
      },
      turnPreviousPage() {
        if (this.pageNum === 1) {
          return
        }

        this.pageNum--;
        this.buttonState(this.pageNum)
      },
      buttonState (pageNum) {
        pageNum === this.numOfPages ? this.isLastPage = true : this.isLastPage = false
        pageNum === 1 ? this.isFirstPage = true : this.isFirstPage = false
      }
    },
  }
</script>