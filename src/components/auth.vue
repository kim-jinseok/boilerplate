<template>
  <div>   
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit" v-show="!loggingIn">
      <div class="form-group">
        <label for="user_id">user_id</label>
        <input type="text" v-focus value="admin" v-model="user_id" name="user_id" class="form-control" :class="{ 'is-invalid': submitted && !user_id }" />
        <div v-show="submitted && !user_id" class="invalid-feedback">user_id is required</div>
      </div>
      <div class="form-group">
        <label htmlFor="user_pw">user_pw</label>
        <input type="password" value="1" v-model="user_pw" name="user_pw" class="form-control" @keyup.enter="handleSubmit" :class="{ 'is-invalid': submitted && !user_pw }" />
        <div v-show="submitted && !user_pw" class="invalid-feedback">user_pw is required</div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="loggingIn">Login</button>
      </div>
    </form>
    <button class="btn btn-primary" v-show="loggingIn" @click.prevent="logout">로그아웃</button>
    1111
  </div>
</template>
<script>

  import { userService } from '../modules/auth';


  export default {
    auth:false,
    data() {
      return {
        user_id: '',
        user_pw: '',
        submitted: false
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
      logout() {
        userService.logout();

        this.$store.state.loggin = false
 
      },
      handleSubmit(e) {
        const { user_id, user_pw } = this;
        
        if (user_id && user_pw) {
          userService.login(user_id, user_pw).then((data) => {
           
            if (data) {
              this.$store.state.loggin = true 
              this.$router.push("/")

            } else {
              this.$router.push("auth")
            }
          });
        }
      }
    }
  }
</script>
