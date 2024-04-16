<template>
<div>
<Header/>
    <div style="background-color: #f2f6fc; height: 800px">
         <router-view/>
    </div>
</div>
     
</template>
<script>
import Header from '@/layouts/components/Header.vue'
export default {
    components:{
        Header,
    }
}
</script>