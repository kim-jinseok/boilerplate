<template>
  <div>
   Home
    <div>Board List:</div>
    <div v-if="loading">Loading...</div>
    <div v-else>Api result :
      <div v-for="b in boards" :key="b.id">

        {{b}}

      </div>
   
    </div>

    <ul>
      <li>
        <RouterLink to="./study/trello/1">Board1</RouterLink>
      </li>
      <li>
        <RouterLink to="./study/trello/2">Board2</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        boards: []
      }
    },
    created() {
    //  this.fetchData()
    },
    methods: {

       //보드 요청 로직

      fetchData() {
        this.laoding = true
        board.fetch()
          .then(data => {
            this.boards = data
          })
          .finally(res => {
             this.loading = false
          })
      }
    }
  }
</script>
<style>

</style>
