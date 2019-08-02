<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-layout row wrap  style="margin-bottom :30px; padding-top : 20px;">
        <v-flex xs12 pl-2>
        <v-text-field 
            v-model="approvalName"
            label="제목"
            disabled
          ></v-text-field>
           <v-text-field
            v-model="createUsername"
            label="요청자"
            disabled
          ></v-text-field>
           <v-text-field
            v-model="createDate"
            label="작성일"
            disabled
          ></v-text-field>
          </v-flex>
        </v-layout>
    <v-card class='approvalInfoLayout' style="margin-bottom :30px;"> 
        <v-layout v-resize="onResize" column >
          <v-data-table class='dvApprovalDetailDataTable' :headers="headers" :items="approvalRecFileData" :search="search" :pagination.sync="pagination" :hide-headers="isMobile" :class="{mobile: isMobile}">
              <template slot="items" slot-scope="props">
                <tr>
                  <td>
                    <ul class="flex-content">
                      <li class="flex-item" data-label="No">{{ props.item.no }}</li>
                      <li class="flex-item one-line" data-label="파일명">
                        <v-tooltip color="black" bottom  right max-width="100%">
                            <template v-slot:activator="{ on }"  >
                                    <div  class="one-line"  v-on="on" dark   @click="GetFilePreview(props.item.fileHistoryId);">
                                      {{ props.item.fileName }}</div>
                            </template>  
                            <iframe  v-show="iframe.loaded" :src="iframe.pdfFilePath" style="width : 400px; height: 300px;" allowfullscreen="yes" frameborder="0" scrolling="no" ></iframe>
                          </v-tooltip>
                        </li>
                      <li class="flex-item" data-label="rev">{{ props.item.rev }}</li>
                      <li class="flex-item" data-label="작성자">{{ props.item.createUsername }}</li>
                      <li class="flex-item" data-label="작성일">{{ props.item.createDate }}</li>
                    </ul>
                  </td>
                </tr>
              </template>
               <template v-slot:no-data>
                    <td colspan="5" >  
                      등록된 파일이 없습니다.                           
                    </td>
                </template>
            </v-data-table>
        </v-layout>
      </v-card>

     <v-card  class="approvalLineLayout" style="background-color: #ffc107; color:black; margin-bottom:10px;">
        <v-card-title primary-title>
          <div>
            <div class="headline">결재라인</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="approvalshow = !approvalshow">
            <v-icon>{{ approvalshow ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>

      <v-container
        fluid
        grid-list-lg
        v-show="approvalshow">
        <v-layout row wrap style="background-color:white;" >
         <v-flex xs12  
          v-show="showApprovalLine"
          style="padding: 15px;"
          v-for="data in approvalLineData"
          :key="data.sort">
         <v-layout row="">
         <v-btn style="font-size:20px; width: 40px; height: 40px;" class="ma-2" outlined fab color="black">
                   {{data.sort}} 
         </v-btn>
           <v-flex xs4 v-if="!data.isShowState" style="padding-top: 0px;">
              <v-btn class='btState'  outline small :color="`${data.color}`" >{{data.state}}</v-btn>
                  <v-divider></v-divider>
              <span style="font-weight: bolder; padding-left: 15px;">
                {{data.updateDate}}
              </span>
           </v-flex>
           <v-flex xs4 v-else  style="padding-top: 0px;">
            <v-btn class='btState'  @click="dialog1  = true"  outline small :color="`${data.color}`" >{{data.state}}</v-btn>
             <v-divider></v-divider>
           </v-flex>
           <v-flex xs8>
                <span>
                 {{data.name}} /  {{data.dep}}
                </span>
                  <v-divider></v-divider>
                <span v-html="data.contents">
                </span>
                 <v-divider></v-divider>
                 <span>
                   {{data.readDate}}
                </span>
            </v-flex>
          </v-layout>
        </v-flex>
       <v-flex xs12  
          v-show="!showApprovalLine"
          red
          style="padding: 15px;">
           <span><b>결재 라인이 없습니다.</b></span>
        </v-flex>
        </v-layout>
        <!-- 결재확인 팝업창 -->
         <v-dialog
              v-model="dialog1"
              max-width="500px"
              @submit.prevent="setApprovalState()"
            >
              <v-card>
                <v-card-title>
                  결재확인
                </v-card-title>
                <v-card-text>
                  <v-select
                    v-model="setApprovalData.state"
                    :items="getStateData"
                    label="선택해주세요"
                    item-value="text"
                  ></v-select>
                </v-card-text>
                   <v-textarea
                    class='vtApprovalText'
                    background-color="grey lighten-2"
                    height="150px"
                    label="내용을 입력해주세요"
                    color="cyan"
                    v-model="setApprovalData.contents"
                  ></v-textarea>
                <v-card-actions>
                  <v-layout row mb-2>
                    <v-flex xs5>
                    </v-flex>
                    <v-flex xs7 right>
                    <v-btn color="blue darken-1" small  text  @click="submit">Save</v-btn>
                    <v-btn color="blue darken-1" small  text @click="dialog1 = false">Close</v-btn>
                    </v-flex>
                  </v-layout>
                </v-card-actions>
              </v-card>
            </v-dialog>
      </v-container>
      </v-card>
     <v-card>
     </v-card>

       <v-card  class="releaseLineLayout" style="background-color: #3b3c5a; color:black;">
        <v-card-title primary-title>
          <div>
            <div class="headline">배포정보</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="releaseshow = !releaseshow">
            <v-icon>{{ releaseshow ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>

         <v-container
        fluid
        grid-list-lg
        v-show="releaseshow">
        <v-layout row wrap>
           <v-flex xs12>
                <v-card color="white" class="white--text">
                  <v-card-actions class="pa-3">
                    <v-layout row>
                       <v-flex xs5>
                            배포 다운로드 기간 : 
                        </v-flex>
                          <v-spacer></v-spacer>
                        <v-flex xs7>
                          <div> {{this.releaseStartDate}} ~  {{this.releaseEndDate}} </div>
                        </v-flex>
                      </v-layout>
                  </v-card-actions>
                       <v-divider light></v-divider>
                        <v-card-actions class="pa-3">
                          <v-layout row>
                           <v-flex xs3>
                            내부 배포처 : 
                            </v-flex>
                          <v-spacer></v-spacer>
                           <v-flex xs9 v-show="showEmployer">
                              <div v-for="item in releaseEmployerLine"  :key="item.sort">
                                <v-layout row>
                                  <v-flex xs9>
                                    <span>{{ item.name }}</span><br/>
                                  </v-flex>
                                  <v-flex xs4>
                                    <span>{{ item.readDate }}</span>
                                  </v-flex>
                                </v-layout>
                              </div>
                            </v-flex>
                            <v-flex xs9 red v-show="!showEmployer">
                              <span style="color:white;">내부 배포처가 없습니다.</span>
                            </v-flex>
                          </v-layout>
                        </v-card-actions>
                          <v-card-actions class="pa-3">
                            <v-layout row>
                                <v-flex xs3>
                                    외부 배포처 : 
                                </v-flex>
                                 <v-spacer></v-spacer>
                                <v-flex xs9   v-show="showPartner">
                                   <v-btn class='btn-partner' color="deep-purple lighten-1">협력사</v-btn>
                                      <v-flex xs12>
                                          <div class='dvpartnerLine'  v-for="item in releasePartnerLine"  :key="item.sort">
                                            <v-layout row>
                                              <v-flex xs8>
                                                  <span>{{ item.name }}</span><br/>
                                              </v-flex>
                                               <v-flex xs4>
                                                  <span>{{ item.readDate }}</span><br/>
                                              </v-flex>
                                            </v-layout>
                                          </div>
                                      </v-flex>
                                </v-flex>
                                <v-flex xs9 red v-show="!showPartner">
                                  <span style="color:white;">외부 배포처가 없습니다.</span>
                                </v-flex>
                              </v-layout>
                            </v-card-actions>
                          </v-card>
                          </v-flex>
                   </v-layout>
           </v-container>
      </v-card>
      <v-card>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
 export default {
  
   created(){
      this.getApprovalGetData()
   },
    data () {
      return {
        iframe: {
            pdfFilePath: '',
            loaded: false
        },
         setApprovalData: {
            state: '',
            contents: '',
        },
       loading: false,
       dialog1 : false,
       approvalName :'',
       createUsername : '',
       createDate : '',
       fhid:'',
       releaseStartDate : '',
       releaseEndDate : '',
       releaseEmployerLine : [],
       releasePartnerLine : [],
       getStateData : ['승인','반려','보류','전결'],
       showApprovalLine : false,
       showPartner : false,
       showEmployer : false,
       approvalshow: false,
       releaseshow : false,
       pagination: {
          sortBy: 'name'
        },
        selected: [],
        search: '',
        isMobile: false,
        headers: [{
            text: 'No',
            align: 'left',
            value: 'no'
          },
          {
            text: '파일명',
            align: 'left',
            value: 'fileName'
          },
          {
            text: 'Rev',
            align: 'left',
            value: 'rev'
          },
          {
            text: '작성자',
            align: 'left',
            value: 'createUsername'
          },
          {
            text: '작성일',
            align: 'left',
            value: 'createDate'
          }
        ],
        approvalRecFileData: [],
        approvalLineData: []
      }
    },
   
    methods: {
    onResize() {
          if (window.innerWidth < 769)
            this.isMobile = true;
           
          else
            this.isMobile = false;
        },
        toggleAll() {
          if (this.selected.length) this.selected = []
          else this.selected = this.desserts.slice()
        },
        changeSort(column) {
          if (this.pagination.sortBy === column) {
            this.pagination.descending = !this.pagination.descending
          } else {
            this.pagination.sortBy = column
            this.pagination.descending = false
          }
        },
      async getApprovalGetData() {
            
        try {
          var param = {
              approval_id : this.$route.params.aid,
              user_id : this.$store.state.user.userid
          }
         
          const data = helper.getJSON("approval_rec_get", param)
     
          const $this = this
          let obj= {};
          let arr = [];
          let tmp = [];

          data.then(function(result){
       
         if(result[0] !==''){
         
         //상세 기본 정보
            $this.approvalName = result[0].approval_name
            $this.createUsername  = result[0].name
            $this.createDate =  helper.getSafeDate( result[0].create_date)


         //배포 정보
          $this.releaseStartDate  = helper.getSafeDate( result[0].start_date)
          $this.releaseEndDate   = helper.getSafeDate( result[0].end_date)


          //내부 배포자
            let tempLine =''
            let obj_employerLine = {}
            let employerLine = [];
            let message = '미확인';
              if(!helper.isNull(result[0].release_employer_line)){

                 tempLine   =  result[0].release_employer_line.split(']*[')

               tempLine.forEach(function (value, key) {

                  obj_employerLine = {}

                  obj_employerLine.name = (!helper.isNull(value.split('||')) ? value.split('||')[0] : "")
                  obj_employerLine.readDate = (!helper.isNull(value.split('||')) ? value.split('||')[1] : '')
              
                 employerLine.push(obj_employerLine)

              });
                 $this.showEmployer = true
                 $this.releaseEmployerLine = employerLine

              }else{
                 $this.showEmployer = false
                 $this.releaseEmployerLine = ''
               }


          //외부 배포자 
            let tempReleaseLine =''
            let obj_ReleaseLine = {}
            let ReleaseLine = [];
                 
              if(!helper.isNull(result[0].release_partner_line)){

                 tempReleaseLine   =  result[0].release_partner_line.split(']*[')

               tempReleaseLine.forEach(function (value, key) {

                  obj_ReleaseLine = {}

                  obj_ReleaseLine.name = (!helper.isNull(value.split('||')) ? value.split('||')[0] : "")
                  obj_ReleaseLine.readDate = (!helper.isNull(value.split('||')) ? value.split('||')[1] : "")
                  obj_ReleaseLine.state = (!helper.isNull(value.split('||')) ? value.split('||')[2] : "")
                  obj_ReleaseLine.to_mail = (!helper.isNull(value.split('||')) ? value.split('||')[3] : "")

                 ReleaseLine.push(obj_ReleaseLine)

                  
              });

               $this.showPartner = true
               $this.releasePartnerLine = ReleaseLine

                
              }else{
               $this.showPartner = false
               }


          //파일
          if(!helper.isNull(result[0].file_list)){

           tmp = result[0].file_list.split('||')

      

            obj = {};
            obj.no =  result[0].rn
            obj.approvalId = result[0].approval_id
            obj.fileName = tmp[0]
            obj.fileHistoryId = tmp[1]
            obj.rev = tmp[2]
            obj.createUsername = tmp[3]  
            obj.createDate = helper.getSafeDate(tmp[4])
            obj.previewPath = tmp[8]

            arr.push(obj);

            $this.approvalRecFileData = arr;

          }else{
             $this.approvalRecFileData  = []
          }
            
  

          //결재 라인 정보
          let obj_approvalLine= {};
          let arr_approvalLine = [];
          let tmp_approvalLine = [];
          

         if(!helper.isNull(result[0].approval_line)){

               tmp_approvalLine = result[0].approval_line.split(']*[')

          tmp_approvalLine.forEach(function (value, key) {

              obj_approvalLine= {};

              obj_approvalLine.sort = value.split('||')[0]
              obj_approvalLine.name = value.split('||')[1]
              obj_approvalLine.dep = value.split('||')[2]
              obj_approvalLine.state = value.split('||')[3]
              obj_approvalLine.updateDate = helper.getSafeDate(value.split('||')[4])
              obj_approvalLine.userId = value.split('||')[5]    
              obj_approvalLine.contents = unescape(value.split('||')[6])
              obj_approvalLine.readDate = value.split('||')[7]
              obj_approvalLine.isShowState = false
      

         if(obj_approvalLine.state === '승인'){

              obj_approvalLine.color = 'indigo'

         }else if(obj_approvalLine.state === '결재대기'){
              obj_approvalLine.readDate = ''

           if($this.$route.params.type === 'approval'){
                obj_approvalLine.isShowState = true
           }
        
              obj_approvalLine.color = 'teal'
         }else if(obj_approvalLine.state === '보류'){
         
          if($this.$route.params.type === 'approval'){
                obj_approvalLine.isShowState = true
           }
        
              obj_approvalLine.color = 'orange darken-4'
         }else if(obj_approvalLine.state === '반려'){
                
              obj_approvalLine.color = 'red darken-4'
         }else if(obj_approvalLine.state === '전결'){
              
              obj_approvalLine.color = 'green darken-4'
         }

              arr_approvalLine.push(obj_approvalLine);
              

          });
       
            $this.showApprovalLine  = true
            $this.approvalLineData  = arr_approvalLine

         }else{
           
           $this.showApprovalLine  = false
           $this.approvalLineData  =''
         }
      
            }else{

                  $this.approvalRecFileData  = []
                  $this.approvalName = '';
                  $this.createUsername ='';
                  $this.createDate ='';
                  $this.releaseStartDate ='';
                  $this.$this.releaseEndDate  ='';

            }

          })
        } catch (err) { 
        }
    },
    
     GetFilePreview(id){
         
              this.fhid = id
              let $this = this;
     
              this.approvalRecFileData.forEach(function (value, key) {
                    if($this.fhid === value.fileHistoryId){
                            $this.iframe.loaded = true
                            $this.iframe.pdfFilePath = "http://125.7.231.48" + value.previewPath  
                    }

                });
        },
        submit(){
         this.setApprovalState();
        },
        setApprovalState(){
         
          try {

          var param = {
              approval_id : this.$route.params.aid,
              state : this.setApprovalData.state,
              contents : this.setApprovalData.contents,
              user_id : this.$store.state.user.userid,
              logging : ""
          }
       
          let $this = this;

          const data = helper.getINT(param,"approval_set" )
           
              data.then(function(result){
              
                $this.dialog1 = false;
            
              }).then(_=> $this.getApprovalGetData());
              
          } catch (error) {
            
          }
        }
    }
  }
</script>

<style>
   .mobile {
      color: #333;
    }

    @media screen and (max-width: 768px) {

      .mobile .dvApprovalDetailDataTable table.v-table tr {
        max-width: 100%;
        position: relative;
        display: block;
      }

      .mobile .dvApprovalDetailDataTable table.v-table tr td {
        display: flex;
        width: 100%;
        border-bottom: 1px solid #f5f5f5;
        height: auto;
        padding: 8px;
      }

      .mobile .dvApprovalDetailDataTable table.v-table tr td ul li:before {
        content: attr(data-label);
        padding-bottom: .5em;
        display: block;
        color: #999;

      }
     .dvApprovalDetailDataTable .v-datatable__actions__select
      {
        width: 50%;
        margin: 0px;
        justify-content: flex-start;
      }
      .mobile .dvApprovalDetailDataTable .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {
        background: transparent;
      }

    }


    .v-input__slot{
        height: 28px;
        padding: 0px 0px 10px 0px;
    }
    .dvApprovalDetailDataTable .flex-content {
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }
   .dvApprovalDetailDataTable  .flex-item {
      padding: 5px;
      height: 100%;
      font-weight: bold;
    }
    .dvApprovalDetailDataTable .flex-content li:nth-child(1) {
        width: 8%;
    }
    .dvApprovalDetailDataTable .flex-content li:nth-child(2) {
        width: 43%;
    }
    .dvApprovalDetailDataTable .flex-content li:nth-child(3) {
       width: 8% 
    }
    .dvApprovalDetailDataTable .flex-content li:nth-child(4) {
       width: 15% 
    }
   .dvApprovalDetailDataTable .flex-content li:nth-child(5) {
       width: 25%;
    }
    .pa-3{
        color: black;
    }
    .primary-title{
         color: black;
    }
    
    .one-line{
          overflow: hidden; 
          text-overflow: ellipsis;
          white-space: nowrap;
          min-width: 100px;
          max-width: 180px;
    }
  .btn-partner{
    width :100%;
    height: 30px;
    border-radius: 20px;
  }
  .dvpartnerLine{
    margin-left : 11px;
  }
 .cdapprovalLine{
    width: 335px;
 }
 .btState{
   opacity: 1;
 }
 .container.grid-list-lg .layout .flex{
   text-align : center;
 }
.theme--dark.v-input:not(.v-input--is-disabled) input, .theme--dark.v-input:not(.v-input--is-disabled) textarea{
  color: black;
  padding: 10px;
}
.vtApprovalText .v-input__slot{
    width: 350px;
    margin: 10px;
}
</style>
                    