<template>
<div>
<Header/>
    <div>
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