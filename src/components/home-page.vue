<template>
  <v-responsive>
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
      <v-tabs fixed-tabs>
        <v-tabs fixed-tabs class="tabRelease" v-model="model">
          <v-tab centered :href="`#tab-1`">
            <v-badge>
              <span>상신</span>
            </v-badge>
          </v-tab>
          <v-tab centered :href="`#tab-2`">
            <v-badge>
              <template v-slot:badge>
                <span>{{approvalDataLength}}</span>
              </template>
              <span>결재</span>
            </v-badge>
          </v-tab>
          <v-tab centered :href="`#tab-3`">
            <v-badge>
              <template v-slot:badge>
                <span>{{releaseDataLength}}</span>
              </template>
              <span>배포</span>
            </v-badge>
          </v-tab>
        </v-tabs>
      </v-tabs>
      <v-tabs-items v-model="model">
        <v-tab-item :value="`tab-1`">
          <v-card flat>
            <ReportState :data="reportData" />
          </v-card>
        </v-tab-item>
        <v-tab-item :value="`tab-2`">
          <v-card flat>
            <ApprovalState :data="approvalData" />
          </v-card>
        </v-tab-item>
        <v-tab-item :value="`tab-3`">
          <v-card flat>
            <ReleasedState :data="releasedData" />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-layout>
    <router-view :data="this.resultData"></router-view>
  </v-responsive>
</template>

<script>
import ReportState from "./reportState";
import ApprovalState from "./approvalState";
import ReleasedState from "./releasedState";
import SearchResult from "./searchResult";

export default {
  components: {
    ReportState,
    ApprovalState,
    ReleasedState
  },
  created() {
    this.loadApprovalState();
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
    resultData: [],
    model: "tab-1",
    reportDataLength: 0,
    approvalDataLength: 0,
    releaseDataLength: 0,
    approvalData: [],
    reportData: [],
    releasedData: []
  }),
  methods: {
    btSearchFiles() {
      const searchType = this.selectedType;
      const searchValue = this.searchValue;

      this.$router.push("/searchResult/" + searchType + "/" + searchValue);
    },
    reload() {
      this.selectedType = "";
      this.searchValue = "";
    },
    async loadApprovalState() {
      try {
        var param = {
          user_id: this.$store.state.l.user.userid
        };

        const data = helper.getJSON("dashboard_get", param);

        const $this = this;

        let obj_report = {};
        let arr_report = [];
        let obj_approval = {};
        let arr_approval = [];
        let obj_release = {};
        let arr_release = [];

        data.then(function(result) {
          //상신
          if (!helper.isNull(result[0])) {
            result[0].forEach(function(value, key) {
              obj_report = {};
              obj_report.approvalId = value.approval_id;
              obj_report.approvalName = value.approval_name;
              obj_report.createUsername = value.name;
              obj_report.createDate = helper.getSafeDate(value.create_date);
              arr_report.push(obj_report);
            });
            $this.reportData = arr_report;
          } else {
            $this.reportData = [];
          }

          //결재
          if (!helper.isNull(result[1])) {
            result[1].forEach(function(value, key) {
              if (
                value.read_date === null ||
                helper.getSafeDate(value.read_date) === ""
              ) {
                $this.approvalDataLength++;
              }
              obj_approval = {};
              obj_approval.approvalId = value.approval_id;
              obj_approval.approvalName = value.approval_name;
              obj_approval.createUsername = value.name;
              obj_approval.createDate = helper.getSafeDate(value.create_date);
              obj_approval.renderType =
                value.render_type === "approval"
                  ? "결재"
                  : value.render_type === "release"
                  ? "배포"
                  : "";
              arr_approval.push(obj_approval);
            });

            $this.approvalData = arr_approval;
          } else {
            $this.approvalData = [];
          }

          //배포받은 문서
          if (!helper.isNull(result[2])) {
            result[2].forEach(function(value, key) {
              if (
                value.read_date === null ||
                helper.getSafeDate(value.read_date) === ""
              ) {
                $this.releaseDataLength++;
              }

              obj_release = {};
              obj_release.approvalId = value.approval_id;
              obj_release.approvalName = value.approval_name;
              obj_release.createUsername = value.name;
              obj_release.createDate = helper.getSafeDate(value.create_date);

              arr_release.push(obj_release);
            });
            $this.releasedData = arr_release;
          } else {
            $this.releasedData = [];
          }
        });
      } catch (err) {}
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
  margin-right: 10px;
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

.cdApprovalBox {
  height: 150px;
  width: 130px;
}
.v-card__title .v-card__title--primary {
  padding: 0px;
}
.cdApprovalBoxTitle .headline {
  padding-left: 30px;
  padding-top: 40px;
  font-size: 22px !important;
}
</style>
