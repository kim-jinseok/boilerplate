<template>
  <transition name="alert">
    <div class="text-center">
      <v-dialog v-model="alert.dialog" width="500">
        <v-card class="alert">
          <v-card-text>{{alert.message}}</v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" style="margin-left: 260px;" text @click.native="close">취소</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </transition>
</template>
<script>
export default {
  props: ["alert"],
  methods: {
    close() {
      this.$emit("close", false);
    }
  }
};
</script>
<style scoped>
</style>