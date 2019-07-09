<template>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
  >
    <a-form-item>
      <a-input
        v-decorator="[
          'user_id',
          { rules: [{ required: true, message: '아이디를 입력해주세요.' }] }
        ]"
        placeholder="Username"
      >
        <a-icon
          slot="prefix"
          type="user"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'user_pw',
          { rules: [{ required: true, message: '비밀번호를 입력해주세요.' }] }
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
    
      <a-button
        type="primary"
        html-type="submit"
        class="login-form-button"
      >
        Log in
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script>

  import { userService } from '../modules/auth';


  export default {
    auth:false,
    data() {
      return {
        user_id: '',
        user_pw: '',
        submitted: false,
        form: this.$form.createForm(this),
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
        e.preventDefault();

        this.form.validateFields((err, v) => {
          if (!err) {
         
        
            if (v.user_id && v.user_pw) {
              userService.login(v.user_id, v.user_pw).then((data) => {
                
                if (data) {
                  this.$store.state.loggin = true 
                  this.$router.push("/")

                } else {
                  this.$router.push("auth")
                }
              });
            }
            
            //console.log('Received values of form: ', values);
          }
        });

        
      }
    }
  }
</script>
