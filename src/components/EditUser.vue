<template>
  <div class="edituser container">
    <Alert v-if="this.message" v-bind:message="this.message"></Alert>
    <h1 class="page-header">编辑用户</h1>
    <form v-on:submit="updateUser" class="well">
        <div class="form-group">
            <label for="name">姓名</label>
            <input type="text" class="form-control" id="name" v-model="user.name" placeholder="Name">
        </div>
        <div class="form-group">
            <label for="phone">电话</label>
            <input type="text" class="form-control" id="phone" v-model="user.phone" placeholder="Phone number">
        </div>
        <div class="form-group">
            <label for="email">邮箱</label>
            <input type="email" class="form-control" id="email" v-model="user.email" placeholder="Email@">
        </div>
        <div class="form-group">
            <label for="age">年龄</label>
            <input type="number"  id="age" v-model="user.age" placeholder=0 class="form-control">
        </div>
        <div class="form-group">
            <label for="company">公司</label>
            <select id="company" v-model="user.companyId" class="form-control" >
                <option v-for="company in companies" v-bind:value="company.id">{{company.name}}</option>
            </select>
        </div>
        <input type="submit" value="保存" class="btn btn-primary">
    </form>
  </div>
</template>

<script>
import Alert from "./Alert"
export default {
    
    name: 'adduser',
    data () {
        return {
            user:{},
            companies:[],
            message:""
        }
    },
    components:{
        Alert
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
      updateUser(e){
        if(!this.user.name || !this.user.phone){
            this.message = "姓名和电话不能为空";
        }
        else{
            var editUser = {
                "name": this.user.name,
                "phone": this.user.phone,
                "email": this.user.email,
                "age": this.user.age,
                "companyId": this.user.companyId
            }
            this.$http.put("http://localhost:3000/users/"+this.user.id,editUser)
                .then(function(response){
                    this.$router.push({ path: '/', query: { message: '用户信息修改成功' }});
                    // console.log(response);                
            })
        }
        e.preventDefault();
      }
  },
    created(){
        this.$http.get("http://localhost:3000/companies")
            .then(function(response){
                this.companies = response.body;
            })

        this.getUser(this.$route.params.id);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
