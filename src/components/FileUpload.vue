<template>
    <div>
        <div class="file-upload">
            <input type="file" @change="onFileChange" />
            <button @click="onUploadFile" class="upload-button"
                    :disabled="!this.selectedFile">Upload file</button>
        </div>
        <div class="available-files">

        </div>
    </div>

</template>

<script>
    import axios from "axios";

    const VUE_APP_API_ROOT = process.env.VUE_APP_API_ROOT

    //TODO check for existing files and show them
    export default {
        methods: {
            onFileChange(e) {
                this.selectedFile = e.target.files[0]; // accessing file
            },
            onUploadFile() {
                const formData = new FormData();
                formData.append("file", this.selectedFile);  // appending file

                // sending file to the backend
                axios
                    .post(VUE_APP_API_ROOT + '/upload', formData)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    };
</script>

<style></style>