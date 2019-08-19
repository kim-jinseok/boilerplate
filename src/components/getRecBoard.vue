<template>
  <div>
    <v-toolbar class="toolbarApprovalStateTitle" fixed>
      <v-toolbar-title class="white--text">검색결과</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-toolbar>
    <v-data-table
      class="boardDataTable"
      :headers="headers"
      :items="boardFilesData"
      :expand="expand"
      :search="search"
      :pagination.sync="pagination"
      item-key="No"
    >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.item.No }}</td>
          <td class="text-xs-left">{{ props.item.fileName }}</td>
          <td class="text-xs-left">{{ props.item.Rev }}</td>
        </tr>
      </template>
      <template v-slot:no-data>
        <td colspan="3" class="text-xs-center">등록된 파일이 없습니다.</td>
      </template>

      <!-- 상세보기 -->
      <template v-slot:expand="props" v-slot:items="props">
        <boardDetailInfo :data="props" />
      </template>

      <!-- 검색 시 데이터 없을 때 팝업창 -->
      <template v-slot:no-results class="error">
        <v-alert
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import boardDetailInfo from "./boardDetailInfo";

export default {
  created() {
    this.$store.dispatch("loadBoard");
    setTimeout(() => {
      //this.boardFilesData = this.$store.getters.doArrData;
      this.boardFilesData = JSON.parse(localStorage.getItem("boardFilesData"));
    }, 200);
  },
  watch: {
    $route(to, from) {
      this.$store.dispatch("loadBoard");
      setTimeout(() => {
        this.boardFilesData = JSON.parse(
          localStorage.getItem("boardFilesData")
        );
      }, 200);
    }
  },
  components: {
    boardDetailInfo
  },
  data() {
    return {
      pagination: {
        sortBy: "No",
        descending: true
      },
      search: "",
      date: new Date(),
      expand: false,
      headers: [
        {
          text: "No",
          align: "left",
          sortable: true,
          value: "No",
          width: "5%"
        },
        { text: "파일명", align: "left", value: "fileName", width: "80%" },
        { text: "Rev", align: "left", value: "Rev", width: "5%" }
      ],
      boardFilesData: [],
      boardId: "",
      obj_detail: {}
    };
  }
};
</script>    

<style scope>
.boardDataTable .v-input__control {
  height: 5px;
}
.boardDataTable .v-text-field__slot {
  font-size: 12px;
  padding: 0px;
}
.boardDataTable .theme--dark.v-subheader {
  height: 30px;
  font-size: 12px;
}
.boardDataTable .table.v-table tbody td:first-child,
table.v-table tbody td:not(:first-child),
table.v-table tbody th:first-child,
table.v-table tbody th:not(:first-child),
table.v-table thead td:first-child,
table.v-table thead td:not(:first-child),
table.v-table thead th:first-child,
table.v-table thead th:not(:first-child) {
  padding: 0px 24px 0px 20px;
}
.error {
  padding: 10px;
}
.v-alert.v-alert {
  width: 1000px;
  float: left;
  margin-left: 0px;
}
<<<<<<< HEAD
.boardDataTable .theme--dark.v-subheader {
  color: black;
  font-weight: 600;
}


=======
>>>>>>> 55ff1b54785141dc5248587f157210a718a9133a
</style>
