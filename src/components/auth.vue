<template>
  <form class="form" @submit.prevent="handleSubmit()">
    <v-text-field class="v-text-field" placeholder="user_id" v-model="user_id" required></v-text-field>
    <v-text-field
      class="v-text-field"
      placeholder="user_pw"
      type="password"
      v-model="user_pw"
      required
      v-on:keyup.enter="submit"
    ></v-text-field>
    <v-btn @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>
<script>
import { userService } from "../modules/auth";

export default {
  auth: false,
  data() {
    return {
      user_id: "",
      user_pw: ""
    };
  },
  created() {},
  computed: {
    loggingIn() {
      return this.$store.state.l.loggin;
    }
  },
  methods: {
    submit() {
      this.handleSubmit();
    },
    handleSubmit() {
      if (!helper.isNull(this.user_id && this.user_pw)) {
        userService.login(this.user_id, this.user_pw).then(result => {
          if (!helper.isNull(result)) {
            this.$store.state.l.user = helper.parseJwt(result);
            this.$store.state.l.loggin = true;
            this.loadCategory();
            this.$router.push("/home-page");
          } else {
            alert("아이디 또는 비밀번호를 다시 입력해주세요");
            this.$router.push("/auth");
          }
        });
      } else {
        alert("아이디 또는 비밀번호를 입력해주세요");
        return false;
      }
    },
    async loadCategory() {
      try {
        const param = {
          user_id: this.$store.state.l.user.userid
        };
        /// 바로 데이터를 받아와서 하려면 async, await를 사용해야함
        const data = fw.getCategory(param);

        const $this = this;

        data.then(function(result) {
          $this.$store.state.c.category = result;

          localStorage.setItem("categoryData", JSON.stringify(result));
        });
      } catch (err) {
        window.alert(err);
      }
    },
    clear() {
      this.user_id = "";
      this.user_pw = "";
    }
  }
};
</script>
<style>
.form {
  padding-top: 180px;
}
.v-text-field__slot {
  padding: 15px 0px 0px 20px;
}
.theme--dark.v-input:not(.v-input--is-disabled) input,
.theme--dark.v-input:not(.v-input--is-disabled) textarea {
  padding-left: 15px;
}
</style>
