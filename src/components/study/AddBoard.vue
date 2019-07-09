<template>
  <Modal>
    <!-- slot은 외부에서 대체할 수 있도록 쓰는 것 -->
    <div slot="header">
      <h2>
        Create new board
        <a href="" class="modal-default-button"
           @click.prevent="close">&times;</a>
      </h2>
    </div>
    <div slot="body">
      <form id="add-board-form"
            @submit.prevent="addBoard">
        <input class="form-control" type="text" v-model="input" ref="input">
      </form>
    </div>
    <div slot="footer">
      <button class="btn" :class="{'btn-success': valid}" type="submit"
              form="add-board-form" :disabled="!valid">
        Create Board
      </button>
    </div>
  </Modal>
</template>

<script> 
  import Modal from './Modal.vue'
  export default {
    components: {
      Modal
    },
    data() {
      return {
        input: '',
        valid: false
      }
    },
    watch: {
      input(v) {
        this.valid = v.trim().length > 0
      }
    },
    mounted() {
      //addBoard가 상위 부모컴포넌트에 마운트 됐을 때 포커스를 입력 필드로 옮기기 위한 것
      this.$refs.input.focus()
    },
    methods: {
      close() {
        this.$emit('close')
      },
      addBoard() {
        this.$emit('close')
        this.$emit('submit', this.input)
      }
    }
  }
</script>

<style>
</style>
