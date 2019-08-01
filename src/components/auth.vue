<template>
  <form class='form'
   @submit.prevent="handleSubmit()">
    <v-text-field class="v-text-field"
      label="user_id"
      v-model="user_id"
      required
    ></v-text-field>
    <v-text-field class="v-text-field"
      label="user_pw"
      type="password"
      v-model="user_pw"
      required=""
    ></v-text-field>
    <v-btn @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>

</template>
<script>

  import { userService } from '../modules/auth';
import { setTimeout } from 'timers';


  export default {
    auth:false,
    data() {
      return {
        user_id: '',
        user_pw: '',
        submitted: false,
        select: null
      }
    },
    created() {
    },
    computed: {
      loggingIn() {
        return this.$store.state.loggin;
      }
    },
    methods: {

       submit() {
        this.handleSubmit();
       },
        handleSubmit() {
        
            if (this.user_id && this.user_pw) {
              userService.login(this.user_id, this.user_pw).then((result) => {

                if (!helper.isNull(result)) {

                  this.$store.state.user = helper.parseJwt(result)
                  this.$store.state.loggin = true 
                  this.loadCategory();
                  this.$router.push("/home-page")
                  
                } else {
                  this.$router.push("/auth")
                }
              });
            } 
      },
     async loadCategory() {
        try {
          const param = {
            user_id : this.$store.state.user.userid
          }
          /// 바로 데이터를 받아와서 하려면 async, await를 사용해야함
          const data = fw.getCategory(param)
         
          const $this = this
    
          data.then(function(result){
          
            $this.$store.state.category = result;
         
            localStorage.setItem("categoryData", JSON.stringify(result))
          })
        } catch (err) {
          window.alert(err)
        }
      },
      clear () {
        this.$v.$reset()
        this.user_id = ''
        this.user_pw = ''
      }
     }   
    }   
</script>
<style>
.form{padding-top: 180px;}
.v-text-field__slot{
  padding :  15px  0px 0px 15px;

}
</style>
