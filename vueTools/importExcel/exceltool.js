/**
 * @author:cc
 */
import XLSX from 'xlsx';

const excelTools={

    readExcel:function(file,callback){

        var rABS =false; //是否将文件读取为二进制字符串

        var _this =this;

        _this.excelData =[];
       

        FileReader.prototype.readAsBinaryString =function(f){
             
            var binary ="";

            var workbook;

            var reader = new FileReader();

            reader.progress =function(e){

                let total = file.size;

                _this.progress =(e.loaded/total)*100;

                console.log(_this.progress);
            };

            reader.onload =function(e){
                try{
                    var bytes = new Uint8Array(reader.result);
                    var len = bytes.length;
                    for(var i=0;i<len;i++){
                        //fromCharCode是将unicode编码转为一个字符
                        binary +=String.fromCharCode(bytes[i]);
                    }
                    if(rABS){
                        workbook = XLSX.read(btoa(fixdata(binary)), { //手动转化  
                             type: 'base64'  
                        });  
                    }else{
                        workbook = XLSX.read(binary,{
                            type:'binary'
                        }) 
                    }
                }catch(e){
                    console.log('解析失败');
                    return;
                }
                var fromTo ="";
                for(var sheet in workbook.Sheets){
    
                    if(workbook.Sheets.hasOwnProperty(sheet)){
    
                        fromTo =workbook.Sheets[sheet]['!ref'];
    
                        let exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
    
                        _this.excelData =_this.excelData.concat(exceljson);
            
                        callback(_this.excelData);
    
                    }
                }
            }

           
            reader.readAsArrayBuffer(f);  
        }

        var reader = new FileReader();

        reader.readAsBinaryString(file);
    }
      
}
export default  excelTools;