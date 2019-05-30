import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const Root ={template:'<div>root</div>'};
const Home ={template:'<div><h1>Home</h1><router-view></router-view></div>'};
const Foo ={template:'<div>foo</div>'};
const Bar ={template:'<div>bar</div>'};
const Baz ={template:'<div>baz</div>'};
const Default ={template:'<div>default</div>'};
const Nested ={template:'<router-view/>'};
const NestedFoo ={template:'<div>NestedFoo foo</div>'};

const router = new VueRouter({
    mode:'history',
    base:_dirname,
    routes:[]
})