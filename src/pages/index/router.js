import home from './views/home.vue';

export default [
    { path: '/', redirect:'/home'},
    { 
        path: '/home', 
        name: 'home',
        component: home        
    }
];