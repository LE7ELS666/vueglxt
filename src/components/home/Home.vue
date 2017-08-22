<template>
      <div>indexindexindex
          <mt-button type ='danger' size = 'large'>index</mt-button>
      </div>
</template>
<script>
  export default{
      data(){
          return{

          }
      },
      created(){
          this.$ajax.get('getlunbo')
              .then(res=>{
                  console.log(res);
              })
              .catch(err=>{
                  console.log(err);
              })
      }
  }
</script>
<style></style>