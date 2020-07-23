<template>
    <div id="app">
            <FileUpload
                    @fileUpload='onFileUpload'
                    v-if='!fileProvided'
            />
            <FileViewer
                    @fileUpload='fileProvided = false'
                    :filePath=filePath
                    v-else
            />
    </div>
</template>

<script>
    import FileUpload from "@/components/FileUpload.vue";
    import FileViewer from "@/components/FileViewer";

    export default {
        name: "app",
        components: {
            FileViewer,
            FileUpload
        },
        data() {
            return {
                fileProvided: false,
                filePath: ""
            }
        },
        methods: {
            onFileUpload(value, fileName) {
                this.fileProvided = value;
                if (fileName !== {}) {
                    this.filePath = "./files/" + fileName
                }
            }
        }
    };
</script>
<style>
    body {
        padding: 0;
        margin: 0;
    }
</style>