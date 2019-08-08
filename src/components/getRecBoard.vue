<template>
     <div>
        <v-toolbar class='approvalStateTitle'  fixed>
                <v-toolbar-title class="white--text">검색결과</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
        </v-toolbar>
        <v-data-table  class="dvBoardDataTable"   
            :headers="headers"
            :items="boardFilesData"
            :expand="expand"
            :search="search"
            :custom-sort="customSort"
            item-key="No"
            >
            <template v-slot:items="props"  >
                <tr  @click="props.expanded = !props.expanded" >
                <td>{{ props.item.No }}</td>
                <td class="text-xs-left">{{ props.item.fileName }}</td>
                <td class="text-xs-left">{{ props.item.Rev }}</td>
                </tr>
            </template>
            <template v-slot:no-data>
                <td colspan="3" class="text-xs-center">  
                    등록된 파일이 없습니다. 
                </td>
            </template>      

            <!-- 상세보기 -->
            <template v-slot:expand="props"   v-slot:items="props"  >
                <boardDetailInfo   :data = "props" />
            </template> 

            <!-- 검색 시 데이터 없을 때 팝업창 -->
            <template v-slot:no-results>
                <v-alert :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
                </v-alert>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import { routes } from '../store/router'
import boardDetailInfo from './boardDetailInfo'
import { mapActions, mapState, mapGetters }  from "vuex";



export default {
 
    created(){   

         this.$store.dispatch("loadBoard")
          setTimeout(() => {
            this.boardFilesData = this.$store.getters.doArrData;
          }, 500);
     },
     watch :{
        '$route' (to, from) {
            this.$store.dispatch("loadBoard")
          setTimeout(() => {
            this.boardFilesData = this.$store.getters.doArrData;
          }, 500);
        }
     },
   components :{
       boardDetailInfo
   },
    data() {
      
      return {
        pagination: {
          sortBy: 'No',
          descending: true,
        },
        selected: [], 
        search: '',
        routes,
        date : new Date(),
        categorys : [],
        expand: false,
        headers: [
          {
            text: 'No',
            align: 'left',
            sortable: true,
            value: 'No',
            width:'5%'
          },
          { text: '파일명', align: 'left', value: 'fileName', width:'80%' },
          { text: 'Rev', align: 'left', value: 'Rev', width:'5%' }
        ],
        boardFilesData: [],
        boardId : '',
        obj_detail :{}
      }
    },
    methods:{
    // async loadBoard() {
            
    //     try {
    //       var param = {
    //           category_id : this.$route.params.bid,
    //           user_id : this.$store.state.l.user.userid
    //       }


     
    //       /// 바로 데이터를 받아와서 하려면 async, await를 사용해야함
    //       const data = helper.getJSON("board_get", param)
          
       
    //       const $this = this

    //       if(data === null){ return }
          
    //       data.then(function(result){

    //        $this.$store.state.b.board = result;  
       
    //        $this.boardId = $this.$store.state.b.board[0].board_id

    //       }).then(()=> this.getFiles($this.boardId))
          
    //     } catch (err) { 
    //     }
    // },


    //  getFiles(boardId){
   
    //     try {
    //       var param = {
    //           board_id : boardId
    //       }
    //       /// 바로 데이터를 받아와서 하려면 async, await를 사용해야함
    //       const data = helper.getJSON("files_get", param)
          
    //       const $this = this
          
    //       data.then(function(result){
         
    //           let obj = {};
    //           let arr = [];

    //        result.forEach(function (value, key) {

    //                 obj = {};

    //                 obj.No = value.rn;
    //                 obj.fileName = value.file_name;
    //                 obj.Rev = value.revision;

    //                 obj.fileId = value.file_id
    //                 obj.fileHistoryId = value.file_history_id
    //                 obj.fileSize = value.file_size
    //                 obj.fileType = value.file_type
    //                 obj.createUsername = value.create_username
    //                 obj.createDate = value.create_date

    //                 arr.push(obj);
                  
    //          });
          
    //         $this.boardFilesData = arr;
         
    //     })
    //     } catch (err) { 
    //     }
    // },
    customSort(items, index, isDesc) {
        items.sort((a, b) => {
            if (index === "date") {
            if (!isDesc) {
                return compare(a.date, b.date);
            } else {
                return compare(b.date, a.date);
            }
            }
    });
    return items;
}
}
}
</script>    



   

<style scope>
  .mobile {
      color: #333;
    }
/* 
    @media screen and (max-width: 768px) {

      .mobile .dvBoardDataTable table.v-table tr {
        max-width: 100%;
        position: relative;
        display: block;
      }

      .mobile .dvBoardDataTable table.v-table tr td {
        display: flex;
        width: 100%;
        border-bottom: 1px solid #f5f5f5;
        height: auto;
        padding: 8px;
      }

      .mobile .dvBoardDataTable table.v-table tr td ul li:before {
        content: attr(data-label);
        padding-bottom: .5em;
        display: block;
        color: #999;

      }
     .dvBoardDataTable .v-datatable__actions__select
      {
        width: 50%;
        margin: 0px;
        justify-content: flex-start;
      }
      .mobile .dvBoardDataTable .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {
        background: transparent;
      }

    } */
    
    .v-input__slot{
        height: 28px;
        padding: 0px 0px 10px 0px;
    }
    .dvBoardDataTable .flex-content {
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }
   .dvBoardDataTable  .flex-item {
      padding: 5px;
      height: 40px;
      width: 15%;
      font-weight: bold;
    }
     
    .pa-3{
     color: black;
    }
    .primary-title{
     color: black;
    }
    .dvBoardDataTable .v-input__control{
        height: 5px;
    }
    .dvBoardDataTable .v-text-field__slot {
        font-size : 12px;
        padding: 0px;
    }
    .dvBoardDataTable .theme--dark.v-subheader{
         height: 30px;
         font-size : 12px;
    }
   .dvBoardDataTable .v-text-field{
         padding-top: 0px;
 }
 .table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), table.v-table thead td:first-child, table.v-table thead td:not(:first-child), table.v-table thead th:first-child, table.v-table thead th:not(:first-child){
      padding :0px 24px 0px 20px;
 }
</style>
