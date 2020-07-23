<template>
  <div>
    <pdf :src="filePath"
         @num-pages="setNumOfPages"
         :page="pageNum"
         class="some-class"
    ></pdf>
    <nav>
      <ul>
        <li @click="turnPreviousPage">
          <i :class="{last_page: !this.isFirstPage}" class="fas fa-arrow-alt-square-left"></i>
        </li>
        <li>
          <p>{{ pageNum }} / {{ numOfPages }}</p>
        </li>
        <li @click="turnNextPage">
          <i :class="{first_page: !this.isLastPage}" class="fas fa-arrow-alt-square-right"></i>
        </li>
      </ul>
      <button @click="returnToUpload">Return to uploads</button>
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

<style scoped>
  div {
    width: 100%;
    height: 100%;
    background-color: #898989;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .some-class {
    height: 90%;
  }
  nav {
    height: 15%;
    width: 100%;
    background-color: #4c4c4c;
  }
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  li {
    padding: 5px;
  }
  p {
    font-size: 20px;
  }
  i {
    font-size: 40px;
    color: #cccccc;
  }
  .first_page {
    color: green;
  }
  .last_page {
    color: green;
  }
</style>