<template>
    <el-form label-width="100px" :model="otaForm" :rules="rules">
        <el-form-item label="MD5" prop="md5">
            <el-input v-model="otaForm.md5"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="ossUrl">
            <el-upload class="upload-demo"
                ref="upload"
                action=" "
                :show-file-list="false"
                :http-request="uploadFile"
                :before-upload="handlerCheckFile"
                >
                <!-- <el-progress type="line" style="width:500px;float:right" :percentage="fileUploadPercent"></el-progress> -->
                <el-input :disabled="true" style="width:800px;float:left;margin-right:30px;" v-model="otaForm.ossUrl" ></el-input>
                <el-button :loading ="uploading" slot="trigger" size="small" type="primary">上传文件</el-button>
            </el-upload>
        </el-form-item>
    </el-form>
</template>
<script>
   import ossClient from '@/utils/ossUpLoad.js'
   export default {
        name:'upload',
        data(){
            return{
                otaForm:{
                    md5:'',
                    ossUrl:''
                },
                fileUploadPercent:0,
                uploading:false,
                rules :{
                   ossUrl:[{required:true,message:'请输入下载地址', trigger:'blur'}],
                   md5:[{required:true,message:'', trigger:'blur'}]
                }
            }
        },
        methods:{
            handlerCheckFile(file){
                
                this.$emit('handlerCheckFile',file);
            },
            uploadFile({file}){
               const otaObj = ossClient.doUpload(file,(res)=>{
                    this.otaForm.md5 =res.md5;
                    this.otaForm.ossUrl =res.ossUrl;
                    this.uploading =false;
                    this.$emit('hanlderUploadFile',this.otaForm);
                });   
            }
        }
    }
</script>
<style scoped>
   
</style>


