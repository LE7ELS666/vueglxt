<template>
    <div class='tmpl'>
        <nav-bar title='商品评论'></nav-bar>
        <comment :cid='$route.query.goodsId'></comment>
    </div>
</template>
<script>
    export default{
        data(){
            return{

            }
        }
    }
</script>
<style>

</style>