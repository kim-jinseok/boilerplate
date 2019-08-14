<template>
  <v-responsive height="2000px">
    <h5 class="display-1">문서검색</h5>
    <v-divider class="my-3"></v-divider>
    <v-layout row wrap>
      <v-flex xs4 sm2 d-flex>
        <v-select :items="type" label="유형선택" outline v-model="selectedType"></v-select>
      </v-flex>
      <v-flex xs8 sm2 d-flex>
        <v-text-field class="vtTotalSearch" v-model="searchValue" label="검색어를 입력하세요"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap style="padding-top:20px;">
      <v-flex xs6 sm2 text-xs-right>
        <v-btn color="primary" dark @click="btSearchFiles()">
          검색
          <v-icon dark right>check_circle</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs6 sm2 text-xs-letf>
        <v-btn color="red" dark @click="reload()">
          초기화
          <v-icon dark right>block</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <h5 class="display-1">결재현황</h5>
    <v-divider class="my-3"></v-divider>
    <v-layout row wrap>
      <v-flex xs6 class="reportLine">
        <v-card
          color="blue-grey darken-2"
          class="cdApprovalBox white--text"
          @click="getApprovalState"
        >
          <v-card-title primary-title>
            <div class="cdApprovalBoxTitle headline">결재함</div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs6 class="approvalLine">
        <v-card
          color="blue-grey darken-2"
          class="cdApprovalBox white--text"
          @click="getreleasedState"
        >
          <v-card-title primary-title>
            <div class="cdApprovalBoxTitle headline">배포함</div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <router-view :data="this.resultData"></router-view>
  </v-responsive>
</template>

<script>
import ApprovalState from "./approvalState";
import ReleasedState from "./releasedState";
import SearchResult from "./searchResult";

export default {
  components: {
    ApprovalState,
    ReleasedState
  },
  data: () => ({
    size: "sm",
    type: [
      { text: "파일명", value: "fileName" },
      { text: "확장명", value: "fileType" },
      { text: "작성자", value: "createUser" }
    ],
    searchValue: "",
    selectedType: "",
    resultData: []
  }),
  methods: {
    getApprovalState() {
      this.$router.push("/approvalState");
    },
    getreleasedState() {
      this.$router.push("/releasedState");
    },
    btSearchFiles() {
      const searchType = this.selectedType;
      const searchValue = this.searchValue;

      this.$router.push("/searchResult/" + searchType + "/" + searchValue);
    },
    reload() {
      this.selectedType = "";
      this.searchValue = "";
    }
  }
};
</script>
<style scope>
.container {
  padding: 0px;
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

  .mobile table.v-table tr:nth-child(even) {
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
    padding-bottom: 0.5em;
    display: block;
    color: #999;
  }
  .v-datatable__actions__select {
    width: 50%;
    margin: 0px;
    justify-content: flex-start;
  }
  .mobile .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {
    background: transparent;
  }
}
.theme--dark.v-jumbotron .v-jumbotron__content {
  padding-left: 10px;
}
.v-responsive__content {
  margin-left: 10px;
}
.display-1 {
  font-size: 26px !important;
  color: white;
  padding-top: 45px;
}
.v-input .theme--dark {
  padding-left: 15px;
}
.vtTotalSearch {
  padding: 22px 0px 0px 10px;
}
.v-messages__message {
  padding-top: 8px;
  padding-left: 50px;
}
.reportLine {
  padding-right: 5px;
}
.approvalLine {
  padding-left: 5px;
  padding-right: 10px;
}
.cdApprovalBoxTitle {
  padding-left: 25px;
  padding-top: 75px;
}
.cdApprovalBox {
  height: 250px;
}
.headline {
  font-size: 35px !important;
}
</style>
