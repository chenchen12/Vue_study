/**
 * @author:cc
 */
import {ossinfo} from'@/api';
import axios from'axios';
import SparkMD5 from 'spark-md5';

const ossClient={
    precent :0,
    doUpload(file,callback){
        var _this =this;
        _this.obj={};
        //后台返回的oss信息，
        ossinfo.getOssinfo().then(result =>{
            if(result.retCode =="0000"){
                const params =result.ossSignatureVO;
                 _this.upLoadOSS(Object.assign({},params,{file:file}),(result)=>{
                     _this.obj.ossUrl =result;
                     //对文件进行md5，方便后期的校验
                     this.onChangeMd5(file,function(res){
                        _this.obj.md5 =res;
                        callback(_this.obj);
                    });
                });
            
            }else{
                this.$message.success('提交失败');
            }
        })
        
          
    },
    upLoadOSS(data,callback){
        var request = new FormData(),_this= this;
        request.append('dir',data.dir);
        request.append('expire',data.expire);
        request.append("ossaccessKeyId",data.oSSAccessKeyId);
        request.append("policy",data.policy);
        request.append("Signature",data.signature);                
        request.append("key",data.dir+'/'+data.file.name);              
        request.append("success_action_status",'200');
        request.append('file', data.file);//需要上传的文件 file
        axios({
            method: 'post',
            url:data.host,
            data: request,
            onUploadProgress:function(progressEvent){
                var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
                this.precent=complete;
                console.log(this.precent);
            }
       }).then(res=> { 

           if(res.status =="200"){
               const packurl=data.host+'/'+data.dir+'/'+data.file.name;
               callback(packurl);
           }
          
       })
    },
    onChangeMd5(file,callback){
        let fileReader = new FileReader();
        //let chunkSize =2097152;
        //let  chunks = Math.ceil(file.size / chunkSize);
        let spark = new SparkMD5();
        fileReader.readAsBinaryString(file);
        fileReader.onload =function(e){
            spark.appendBinary(e.target.result);
            callback(spark.end());
        }
    }
    
}
export default ossClient;