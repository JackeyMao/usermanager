<template>
  <div class="userdetail container">
    <router-link to="/" class="btn btn-default">返回</router-link>
    <h2 class="page-header">
        {{user.name}}
        <span class="pull-right">
            <router-link v-bind:to="'/edituser/'+ user.id" class="btn btn-primary ">编辑</router-link>
            <button class="btn btn-danger" v-on:click="deleteUser">删除</button>
        </span>
        
    </h2>
    <ul class="list-group">
        <li class="glyphicon glyphicon-phone list-group-item"> {{user.phone}}</li>
        <li class="glyphicon glyphicon-envelope list-group-item"> {{user.email}}</li>
    </ul>
    <ul class="list-group">
        <li class="glyphicon glyphicon-record list-group-item"> {{user.age}}</li>        
        <li class="glyphicon glyphicon-lock list-group-item" > {{companyName}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'userdetail',
  data () {
    return {
        user:{},
        companyName:""
    }
  },
  methods:{
      
      getUser(id){
        //   console.log(id);
          this.$http.get("http://localhost:3000/users/"+id)
            .then((response) =>{
                this.user = response.body;
                this.getCompany(this.user.companyId);
            })
      },
      getCompany(id){
          this.$http.get("http://localhost:3000/companies/"+id)
            .then((response) =>{
                this.companyName = response.body.name;
            })
      },
      deleteUser(){
          this.$http.delete("http://localhost:3000/users/"+this.user.id)
            .then((response) =>{
                console.log(response);
                this.$router.push({path:"/",query:{message:"用户删除成功"}});
            })
      }
  },
  created(){
    //   console.log();
      this.getUser(this.$route.params.id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
