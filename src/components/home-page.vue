<template>
   <v-jumbotron height="2000px">
    <!-- <v-container fill-height>
      <v-layout align-center>
        <v-flex> -->
          <h5 class="display-1" style="font-size:26px !important">문서검색</h5>
          <v-divider class="my-3"></v-divider>
       <v-layout row wrap>
          <v-flex xs4 sm2 d-flex>
            <v-select
            :items="items"
            label="유형선택"
            outline
            ></v-select>
          </v-flex>
          <v-flex xs8 sm2 d-flex>
          <v-text-field
            v-model="searchValue"
            label="검색어를 입력하세요"
            style="padding-top:22px;"
          ></v-text-field>
           </v-flex>
      </v-layout>
        <v-layout row wrap style="padding-top:20px;">
          <v-flex  xs6 sm2 text-xs-right>
        <v-btn color="primary" dark>검색
          <v-icon dark right>check_circle</v-icon>
        </v-btn>
         </v-flex>
         <v-flex  xs6 sm2 text-xs-letf>
        <v-btn color="red" dark>초기화
         <v-icon dark right>block</v-icon>
        </v-btn>
          </v-flex>
      </v-layout>
          <h5 class="display-1" style="font-size:26px !important">결재현황</h5>
          <v-divider class="my-3"></v-divider>

          <v-layout row wrap>
            <v-flex xs6 class="reportLine" >
              <v-card color="blue-grey darken-2" class="white--text" @click="getApprovalState">
              <v-card-title primary-title >
                  <div class="headline">결재함</div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark>0건</v-btn>
              </v-card-actions>
             </v-card>
          </v-flex>
           <v-flex xs6 class="approvalLine">
            <v-card color="blue-grey darken-2" class="white--text"  @click="getreleasedState" >
              <v-card-title primary-title>
                  <div class="headline" >배포함</div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark>0건</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
<!--            
        </v-flex>
      </v-layout>
    </v-container> -->
  </v-jumbotron>
</template>

<script>
import ApprovalState from './approvalState'
import ReleasedState from './releasedState'
import { routes } from '../store/router/routes.js'

  export default {
    components :{
      ApprovalState,
      ReleasedState
    },
    data: () => ({
      size: 'sm',
      items: [
        { text: '파일명', value: 'fileName' },
        { text: '확장명', value: 'extension' },
        { text: '작성자', value: 'createUser' }
      ],
      searchValue: '',
      reportCount : '0',
      approvalCount : '0',
    }),
    methods:{
      getApprovalState(){
         this.$router.push("/approvalState")
      },
      getreleasedState(){
         this.$router.push("/releasedState")
      }
      
    }
  }
</script>
<style>
.display-1{
  color:white;
  padding-top: 45px ;
}
.theme--dark.v-jumbotron .v-jumbotron__content{
  padding-left: 10px;
}
.v-input .theme--dark{
  padding-left: 15px;
}
.v-messages__message{
  padding-top: 8px;
  padding-left: 50px;
}
.reportLine {
  padding-right : 5px;
}
.approvalLine{
  padding-left : 5px;
  padding-right : 10px;
}
</style>
 