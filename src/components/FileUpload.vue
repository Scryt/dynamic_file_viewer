<template>
    <div class="container">
        <div id="file-upload">
            <input type="file" @change="onFileChange" />
            <button @click="onUploadFile" class="upload-button"
                :disabled="!this.selectedFile">Upload file</button>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    const VUE_APP_API_ROOT = process.env.VUE_APP_API_ROOT
    console.log(VUE_APP_API_ROOT);

    //TODO change upload to view only || or add option to view/remove uploaded files
    export default {
        name: "FileUpload",
        data() {
            return {
                selectedFile: "",
                fileUploaded: false
            };
        },
        methods: {
            onFileChange(event) {
                this.selectedFile = event.target.files[0]; // accessing file
            },
            onUploadFile() {
                const formData = new FormData();
                formData.append("file", this.selectedFile);  // appending file

                // sending file to the backend
                axios
                    .post(VUE_APP_API_ROOT + '/upload', formData)
                    .then(res => {
                        this.$emit('fileUpload', true, res.data.name);
                    })
                    .catch(err => {
                        console.log(err);
                        this.$emit('fileUpload', false, {});
                    });
            },
        }
    };
</script>