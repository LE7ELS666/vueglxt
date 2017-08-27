<template>
  <div class="tmpl">
    <nav-bar title="图文分享"></nav-bar>
    <div class="photo-header">
      <ul>
        <li v-for="cate in category" :key="cate.id">
          <a @click="getImgByCategoryID(cate.id)">{{cate.title}}</a>
        </li>

      </ul>
    </div>
    <div class="photo-list">
      <ul>
        <li v-for="img in imgs" :key="img.id">
          <router-link :to="{name:'photo.detail',params:{imgID:img.id}}">
            <img v-lazy="img.img_url">
            <p>
              <span>{{img.title}}</span>
              <br>
              <span>{{img.zhaiyao}}</span>
            </p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default{
      data(){
          return{
            category:[],
            imgs:[]
          }
      },
      created(){
          this.$ajax.get('getimgcategory/')
              .then(res=>{
                  this.category = res.data.message;
                  this.category.unshift({
                      id:0,
                      title:'全部'
                  })
              });

          this.getImgByCategoryID(0);

      },
      methods:{
          getImgByCategoryID(id){
              this.$ajax.get('getimages/'+id)
                  .then(res=>{
                      this.imgs = res.data.message;
                  })
                  .catch(err=>{
                      console.log(err);
                  })
          }
      }
  }
</script>
<style scoped>

  image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
  }



  .photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
  }

  .photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5px;
  }


  /*下面的图片*/

  .photo-list li {
    list-style: none;
    position: relative;
  }

  .photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
  }

  .photo-list ul {
    padding-left: 0px;
    margin: 0;
  }

  .photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
  }

  .photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
  }

</style>