<template>
  <div class="customers container">
    <Alert v-if="this.message" v-bind:message="this.message"></Alert>
    <h1 class="page-header">用户管理系统</h1>
    <input type="text" class="form-control" placeholder="search" v-model="filterInput">
    <table class="table table-striped">
        <thead>
            <tr>
                <th>姓名</th>
                <th>电话</th>
                <th>邮箱</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="customer in filterUsers(customers,filterInput)">
                <td>{{customer.name}}</td>
                <td>{{customer.phone}}</td>
                <td>{{customer.email}}</td>
                <td>
                    <router-link v-bind:to="'/customerDetail/'+customer.id" class="btn btn-default">详情</router-link>
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import Alert from "./Alert"
import UserDetail from "./UserDetail"

export default {
  name: 'customers',
  data () {
    return {
        customers:[],
        message:"",
        filterInput:""
    }
  },
  components:{
      Alert,
      UserDetail
  },
  methods:{
    getUsers(){
        this.$http.get("http://localhost:3000/users")
        .then((response) =>{
            console.log(response);
            this.customers = response.body;
        })
    },
    filterUsers(customers,value){
   
        return customers.filter(function(customer){
            name =  customer.name;
         return name.match(value);
        })
    }
  },
  created(){
    //   console.log(this.$route);
      if(this.$route.query.message){
          this.message = this.$route.query.message;
      }
      this.getUsers();
  },
  updated(){
    //   this.getUsers();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
