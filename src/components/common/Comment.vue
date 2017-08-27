<template>
    <div class='tmpl'>
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a @click="goback">返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea v-model="comment"></textarea>
                </li>
                <li>
                    <mt-button type="primary" size="large" @click="sendMsg">发表评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>44条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(msg,index) in msgs" :key="index">
                    {{msg.user_name}}：{{msg.content}} {{msg.add_time | convertDate}}
                </li>
            </ul>
            <mt-button size="large" type="danger" plain @click="loadMoreByPage">加载更多{{currentPage}}</mt-button>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                msgs:[],
                comment:"",
                currentPage: 2
            }
        },
        props:['cid'],
        created(){
            this.loadFirstPage();
        },
        methods:{
            goback(){
                this.$router.go(-1);
            },
            loadFirstPage(){
                this.$ajax.get('getcomments/'+this.cid+'?pageindex=1')
                    .then(res=>{
                        this.msgs = res.data.message;
                    })
                    .catch(err=>{
                        console.log(err);
                    })
            },
            loadMoreByPage(){
                this.$ajax.get('getcomments/'+this.cid+'?pageindex='+ this.currentPage)
                    .then(res=>{
                        this.msgs = this.msgs.concat(res.data.message);
                        this.currentPage++
                    })
                    .catch(err=>{
                        console.log(err);
                    })
            },
            sendMsg(){
                this.$ajax.post('postcomment/'+this.cid, 'content=' + this.comment)
                    .then(res=>{
                        this.loadFirstPage();
                        this.comment = "";
                        this.currentPage = 2;

                    })
                    .catch(err=>{
                        console.log(err);
                    })
            }

        }
    }
</script>
<style scoped>
    .photo-comment > div span:nth-child(1) {
        float: left;
        font-weight: bold;
        margin-left: 5px;
    }

    .photo-comment > div span:nth-child(2) {
        float: right;
    }

    .photo-comment {
        height: 30px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.4);
        line-height: 30px;
        margin-bottom: 5px;
    }

    .txt-comment {
        padding: 5 5;
    }

    .txt-comment textarea {
        margin-bottom: 5px;
    }

    .comment-list li {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        padding-bottom: 5px;
        margin-bottom: 5px;
        padding-left: 5px;
    }

    li {
        list-style: none;
    }

    ul {
        margin: 0;
        padding: 0;
    }
</style>