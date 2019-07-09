<template>
  <div>
    Card

    <div v-if="loading">loading card...</div>
    <div v-else>
      <div>cid : {{cid2}}</div>
    </div>
  </div>

</template>
<script>
  export default {

    data() {
      return {
        cid: 0,
        loading : false
      }
    },
    computed: {
      cid2 : function(){
        return this.cid
      }
    },
    watch: {

      //아래도 함수가 아닌 객체로 설정해줘야한다. =>  '$route' :  O /  $route (){} X

      '$route': {

        //this.cid = this.$route.params.cid

        //this.fetchData()

        //감시자 설정은 다음과 같이도 할 수 있다 => 객체로 설정
        handler: 'fetchData',
        //바로 즉시 실행하는 것이므로 => created 불요
        immediate : true
      }
    },
    
    //created() {

    //  this.fetchData()
   
    //},
    methods: {
      fetchData() {
        this.loading = true
        setTimeout(() => {
          this.loading = false,
          this.cid = this.$route.params.cid
        }, 500)
      }
    }
  }
</script>
<style>

</style>
