;(function(global,factory,plug){

    global[plug] =factory.call(global);

})(this,function(){
   const _C_ =function(mode,history,fallback){
       this.mode =mode;
       this.history =history;
       this.fallback =fallback;
   };
   _C_.prototype.init=function(){

    switch(mode){
        
    }
   }
   return _C_;
},'VueRouter');