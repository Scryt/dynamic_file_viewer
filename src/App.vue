<template>
    <div id="app">
            <FileUpload @fileUpload='onFileUpload' v-if='!fileProvided'/>
            <FileViewer v-else :filePath=filePath></FileViewer>
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