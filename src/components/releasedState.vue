<template>
  <v-container>
       <v-toolbar class='approvalStateTitle'  fixed>
            <v-toolbar-title class="white--text">배포현황</v-toolbar-title>
            <v-spacer></v-spacer>
      </v-toolbar>
       <v-tabs fixed-tabs>
         <v-tabs fixed-tabs  class="vtRelease" v-model="model">
                <v-tab 
                    centered
                    :href="`#tab-1`"
                    >
                   <v-badge>
                      <template v-slot:badge>
                        <span>{{dataReportLength}}</span>
                      </template>
                      <span>상신</span>
                    </v-badge>
                </v-tab>
                  <v-tab  
                centered
                :href="`#tab-2`">
                  <v-badge>
                      <template v-slot:badge>
                        <span>{{dataApprovalLength}}</span>
                      </template>
                      <span>결재</span>
                    </v-badge>
                </v-tab>
               <v-tab
                centered
                :href="`#tab-3`">
                   <v-badge>
                      <template v-slot:badge>
                        <span>{{dataReleaseLength}}</span>
                      </template>
                      <span>배포</span>
                    </v-badge>
                </v-tab>
            </v-tabs>
      </v-tabs>
      <v-tabs-items v-model="model">
              <v-tab-item
                  :value="`tab-1`">
                  <v-card flat>
                      <v-layout v-resize="onResize" column style="padding-top:20px" class="approvalDataTableLayout"  >
                        <v-data-table  class='dvApprovalTable'   :headers="headers" :items="reportData" :search="search" :pagination.sync="pagination" :class="{mobile: isMobile}">
                          <template slot="items" slot-scope="props" >
                            <tr  @click="getRecReleaseDetail({item :props.item, type:'report'})">
                              <td>
                                <ul class="flex-content" >
                                  <li class="flex-item one-line">{{ props.item.approvalName }}</li>
                                  <li class="flex-item" >{{ props.item.createUsername }}</li>
                                  <li class="flex-item" >{{ props.item.createDate }}</li>
                                </ul>
                              </td>
                            </tr>
                          </template>
                            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                              Your search for "{{ search }}" found no results.
                            </v-alert>
                              <template v-slot:no-data>
                                <td colspan="5" >  
                                    상신한 문서가 없습니다.
                                </td>
                            </template> 
                        </v-data-table>
                      </v-layout>
                  </v-card>
            </v-tab-item>
              <v-tab-item
                  :value="`tab-2`">
                <v-card flat>
                      <v-layout v-resize="onResize" column style="padding-top:20px" class="approvalDataTableLayout"  >
                        <v-data-table   class='dvApprovalTable'   :headers="headers" :items="approvalData" :search="search" :pagination.sync="pagination" :class="{mobile: isMobile}">
                          <template slot="items" slot-scope="props">
                            <tr   @click="getRecReleaseDetail({item :props.item, type:'approval'})">
                              <td>
                                <ul class="flex-content">
                                  <li class="flex-item">{{ props.item.approvalName }}</li>
                                  <li class="flex-item" >{{ props.item.createUsername }}</li>
                                  <li class="flex-item" >{{ props.item.createDate }}</li>
                                </ul>
                              </td>
                            </tr>
                          </template>
                            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                              Your search for "{{ search }}" found no results.
                            </v-alert>
                             <template v-slot:no-data>
                                <td colspan="5" >  
                                  결재할 문서가 없습니다.                           
                               </td>
                            </template>
                        </v-data-table>
                      </v-layout>
                  </v-card>

              </v-tab-item>
              <v-tab-item
              :value="`tab-3`">
                <v-card flat>
                      <v-layout v-resize="onResize" column style="padding-top:20px" class="approvalDataTableLayout"  >
                        <v-data-table   class='dvApprovalTable'   :headers="headers" :items="releasedData" :search="search" :pagination.sync="pagination" :class="{mobile: isMobile}">
                          <template slot="items" slot-scope="props">
                            <tr   @click="getRecReleaseDetail({item :props.item, type:'release'})">
                              <td>
                                <ul class="flex-content">
                                  <li class="flex-item" >{{ props.item.approvalName }}</li>
                                  <li class="flex-item" >{{ props.item.createUsername }}</li>
                                  <li class="flex-item" >{{ props.item.createDate }}</li>
                                </ul>
                              </td>
                            </tr>
                          </template>
                            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                              Your search for "{{ search }}" found no results.
                            </v-alert>
                               <template v-slot:no-data>
                                <td colspan="5" >  
                                    배포 받은 문서가 없습니다.
                                </td>
                            </template>
                        </v-data-table>
                      </v-layout>
                  </v-card>
              </v-tab-item>
      </v-tabs-items>
      </v-container>
</template>
<script>
  import approvalStateDetail from './approvalStateDetail'

  export default {
    created(){
      this.loadApprovalState()
    },
  components :{
    approvalStateDetail
  },
  data () {
      return {
        model: 'tab-1',
        pagination: {
          sortBy: 'name'
        },
        selected: [],
        search: '',
        isMobile: false,
        headers: [{
            text: '결재제목',
            align: 'left',
            value: 'approvalName'
          },
          {
            text: '요청자',
            align: 'left',
            value: 'createUsername'
          },
          {
            text: '요청일',
            align: 'left',
            value: 'createDate'
          }
        ],
        reportData: [],
        approvalData: [],
        releasedData: [],
        dataReportLength : 0,
        dataApprovalLength : 0,
        dataReleaseLength : 0
      }
    },
    methods:{
       showAlert(params){
          if (event.target.classList.contains('datatable table')) return;
          let aid = params.approvalId;
          this.$router.push('/approvalStateDetail/'+ aid);
        },
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
        
    async loadApprovalState() {
       
        try {
          var param = {
              user_id : this.$store.state.user.userid,
              render_type :  'release'
          }
          const data = helper.getJSON("approval_get", param)
          
          const $this = this

            let obj_report = {};
            let arr_report = [];
            let obj_approval = {};
            let arr_approval = [];
            let obj_release = {};
            let arr_deploy = [];

          data.then(function(result){
       
          //상신
          if(result[0] !==''){
            result[0].forEach(function (value, key) {
                        $this.dataReportLength++;
                        obj_report = {};
                        obj_report.approvalId = value.approval_id;
                        obj_report.approvalName = value.approval_name
                        obj_report.createUsername = value.name
                        obj_report.createDate = helper.getSafeDate(value.create_date)


                        arr_report.push(obj_report);
            
                });
          
               $this.reportData = arr_report;

            }else{
                    $this.reportData  =''
            }
            //결재
            if(result[1] !==''){
            result[1].forEach(function (value, key) {
              $this.dataApprovalLength++;
              obj_approval = {};
              obj_approval.approvalId = value.approval_id;
              obj_approval.approvalName = value.approval_name
              obj_approval.createUsername = value.name
              obj_approval.createDate = helper.getSafeDate(value.create_date)


              arr_approval.push(obj_approval);
        
            });
          
               $this.approvalData = arr_approval;

              }else{
                  $this.approvalData  =''
            }
         

          //배포받은 문서
            if(result[2] !==''){
            result[2].forEach(function (value, key) {
              $this.dataReleaseLength++;
              obj_release = {};
              obj_release.approvalId = value.approval_id;
              obj_release.approvalName = value.approval_name
              obj_release.createUsername = value.name
              obj_release.createDate = helper.getSafeDate(value.create_date)


              arr_deploy.push(obj_release);
        
            });
          
              $this.releasedData = arr_deploy;

            }else{
               $this.releasedData  =''
            }
        

          })
          
        } catch (err) { 
        }
    },
    getRecReleaseDetail(params){
        if (event.target.classList.contains('datatable table')) return;
        let aid = params.item.approvalId
        let type = params.type
        this.$router.push('/approvalStateDetail/'+ aid +'/' + type );
      },
    }
  }
</script>
<style scope>
.container{
  padding : 0px;
}
.mobile {
      color: #333;
    }

    @media screen and (max-width: 768px) {
      .mobile table.v-table tr {
        max-width: 100%;
        position: relative;
        display: block;
      }

      .mobile table.v-table tr:nth-child(odd) {
        border-left: 6px solid deeppink;
      }

      .mobile  table.v-table tr:nth-child(even) {
        border-left: 6px solid cyan;
      }

      .mobile table.v-table tr td {
        display: flex;
        width: 100%;
        border-bottom: 1px solid #f5f5f5;
        height: auto;
        padding: 8px;
      }

      .mobile table.v-table tr td ul li:before {
        content: attr(data-label);
        padding-bottom: .5em;
        display: block;
        color: #999;

      }
      .v-datatable__actions__select
      {
        width: 50%;
        margin: 0px;
        justify-content: flex-start;
      }
      .mobile .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {
        background: transparent;
      }

    }

   .dvApprovalTable .theme--dark.v-table thead tr:first-child{
      height :auto;
      padding-top : 19px;
      padding-bottom : 10px;
      border-left : none;
    }

   .dvApprovalTable .theme--dark.v-table thead tr th:first-child{
      width: 45%;
      padding-right: 0px;
    }
  .dvApprovalTable .theme--dark.v-table thead tr th:nth-child(2){
      width: 20%;
      padding: 0px;
  }
  .dvApprovalTable .theme--dark.v-table thead tr th:last-child{
      width: 20%;
      padding-left: 0px;
  }
    

    .one-line{
          overflow: hidden; 
          text-overflow: ellipsis;
          white-space: nowrap;
          min-width: 100px;
          max-width: 180px;
    }
    .flex-content {
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }
    .flex-content > li:first{
        width: 65%;
    }
    .flex-content li:nth-child(2) {
        width: 20%;
    }
    .flex-content li:nth-child(3) {
        width: 25%;
    }

    .flex-item {
      padding: 5px;
      width: 50%;
      height: 40px;
      font-weight: bold;
    }
    .approvalStateTitle{
        position: relative;
  }

.vtRelease .v-tabs__container--fixed-tabs .v-tabs__div, .v-tabs__container--icons-and-text .v-tabs__div{
  min-width : 135px;
}
</style>
