<template>
   <div>
    <input type="file" ref="inputer" 
      @change="importf" 
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
    </div> 
</template>
<script>
//导入写好的方法
import  ExcelTools from '../utils/exceltool';
export default {
    name:'excel',
    data(){
        return{
            tabledata:[]
        }
    },
    methods:{
       importf(){
            let _this =this;
             let inputDom= this.$refs.inputer;
              var rABS =false;
             _this.file =inputDom.files[0];
             ExcelTools.readExcel(_this.file,(res)=>{
                 
                 //所返回的数据,拓展，显示数据到页面

                 console.log(res);
             })
       }  
    }

}
</script>
<style>

</style>


