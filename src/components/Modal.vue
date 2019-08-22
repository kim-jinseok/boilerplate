<template>
  <transition name="modal">
    <v-dialog
      max-width="500px"
      @submit.prevent="setApprovalState()"
      v-model="this.$store.state.a.editPPapprovalState"
    >
      <v-card>
        <v-card-title>결재확인</v-card-title>
        <v-card-text>
          <v-select
            v-model="setApprovalData.state"
            :items="getStateData"
            label="선택해주세요"
            item-value="text"
          ></v-select>
        </v-card-text>
        <v-textarea
          class="textareaApprovalText"
          background-color="grey lighten-2"
          height="150px"
          label="내용을 입력해주세요"
          color="cyan"
          v-model="setApprovalData.contents"
        ></v-textarea>
        <v-card-actions>
          <v-layout row mb-2>
            <v-flex xs5></v-flex>
            <v-flex xs7 right>
              <v-btn color="blue darken-1" small text @click="submit">Save</v-btn>
              <v-btn color="blue darken-1" small text @click="$emit('close')">Close</v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      setApprovalData: {
        state: "",
        contents: ""
      },
      getStateData: ["승인", "반려", "보류", "전결"],
      dialog: false
    };
  },
  methods: {
    submit() {
      this.setApprovalState();
    },
    setApprovalState() {
      try {
        var param = {
          approval_id: this.$route.params.aid,
          state: this.setApprovalData.state,
          contents: this.setApprovalData.contents,
          user_id: this.$store.state.l.user.userid,
          logging: ""
        };

        let $this = this;

        const data = helper.getINT(param, "approval_set");

        data.then(function(result) {
          $this.$store.state.a.editPPapprovalState = false;
        });
        window.location.reload();
      } catch (error) {}
    }
  }
};
</script>
<style scoped>
</style>
