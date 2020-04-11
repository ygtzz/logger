<template>
    <div id="app">
        <div class="container">
            <c-header class="top-fixed"></c-header>
            <div class="body">
                <router-view></router-view>
            </div>
            <footer class="bottom-fixed">
                <c-footer></c-footer>
            </footer>
        </div>
    </div>
</template>
<script>
import header from './widget/header.vue';
import footer from './widget/footer.vue';

export default {
    created(){
        
    },
    data(){
        return {
            
        }
    },
    methods:{
       
    },
    components:{
        'c-header':header,
        'c-footer':footer
    }
} 
</script>
<style lang="less">
    
</style>