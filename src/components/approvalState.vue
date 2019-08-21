<template>
  <v-container>
    <v-toolbar class="toolbarApprovalStateTitle" fixed>
      <v-toolbar-title class="white--text">결재현황</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-tabs class="tabApprovalState" fixed-tabs v-model="model">
      <v-tab centered :href="`#tab-1`">
        <v-badge>
          <template v-slot:badge>
            <span>{{reportDataLength}}</span>
          </template>
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
    </v-tabs>
    <v-tabs-items v-model="model">
      <v-tab-item :value="`tab-1`">
        <v-card flat>  
          <v-layout v-resize="onResize" column class="lydataTable">
            <v-data-table
              class="approvalDataTable"
              :headers="commoneHeaders"
              :items="reportData"
              :pagination.sync="pagination"
              :class="{mobile: isMobile}"
            >
              <template slot="items" slot-scope="props">
                <tr @click="getRecApprovalDetail({item :props.item, type:'report'})">
                  <td>
                    <ul class="flex-content">
                      <li class="flex-item one-line">{{ props.item.approvalName }}</li>
                      <li class="flex-item">{{ props.item.createUsername }}</li>
                      <li class="flex-item">{{ props.item.createDate }}</li>
                    </ul>
                  </td>
                </tr>
              </template>
              <template v-slot:no-data>
                <td colspan="5">상신한 문서가 없습니다.</td>
              </template>
            </v-data-table>
          </v-layout>
        </v-card>
      </v-tab-item>
      <v-tab-item :value="`tab-2`">
        <v-card flat>
          <v-layout v-resize="onResize" column class="lydataTable">
            <v-data-table
              class="approvalDataTable"
              :headers="commoneHeaders"
              :items="approvalData"
              :pagination.sync="pagination"
              :class="{mobile: isMobile}"
            >
              <template slot="items" slot-scope="props">
                <tr @click="getRecApprovalDetail({item :props.item, type:'approval'})">
                  <td>
                    <ul class="flex-content">
                      <li class="flex-item">{{ props.item.approvalName }}</li>
                      <li class="flex-item">{{ props.item.createUsername }}</li>
                      <li class="flex-item">{{ props.item.createDate }}</li>
                    </ul>
                  </td>
                </tr>
              </template>
              <template v-slot:no-data>
                <td colspan="5">결재할 문서가 없습니다.</td>
              </template>
            </v-data-table>
          </v-layout>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import approvalStateDetail from "./approvalStateDetail";

export default {
  created() {
    this.loadApprovalState();
  },
  components: {
    approvalStateDetail
  },
  data() {
    return {
      model: "tab-1",
      pagination: {
        sortBy: "createDate",
        descending: true
      },
      search: "",
      isMobile: false,
      date: new Date(),
      commoneHeaders: [
        {
          text: "결재제목",
          align: "left",
          value: "approvalName"
        },
        {
          text: "요청자",
          align: "left",
          value: "createUsername"
        },
        {
          text: "요청일",
          align: "left",
          value: "createDate"
        }
      ],
      reportData: [],
      approvalData: [],
      reportDataLength: 0,
      approvalDataLength: 0
    };
  },
  methods: {
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    },

    getRecApprovalDetail(params) {
      if (event.target.classList.contains("datatable table")) return;
      let aid = params.item.approvalId;
      let type = params.type;
      this.$router.push("/approvalStateDetail/" + aid + "/" + type);
    },

    async loadApprovalState() {
      try {
        var param = {
          user_id: this.$store.state.l.user.userid,
          render_type: "approval"
        };

        const data = helper.getJSON("approval_get", param);

        const $this = this;

        let obj_report = {};
        let arr_report = [];
        let obj_approval = {};
        let arr_approval = [];
        let obj_deploy = {};
        let arr_deploy = [];

        data.then(function(result) {
          //상신
          if (!helper.isNull(result[0])) {
            result[0].forEach(function(value, key) {
              $this.reportDataLength++;
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
              $this.approvalDataLength++;
              obj_approval = {};
              obj_approval.approvalId = value.approval_id;
              obj_approval.approvalName = value.approval_name;
              obj_approval.createUsername = value.name;
              obj_approval.createDate = helper.getSafeDate(value.create_date);

              arr_approval.push(obj_approval);
            });

            $this.approvalData = arr_approval;
          } else {
            $this.approvalData = [];
          }
        });
      } catch (err) {}
    }
  }
};
</script>
<style scope>
.approvalDataTable .theme--dark.v-table thead tr:first-child {
  height: auto;
  padding-top: 19px;
  padding-bottom: 10px;
  border-left: none;
}

.approvalDataTable .theme--dark.v-table thead tr th:first-child {
  width: 45%;
  padding-right: 0px;
}
.approvalDataTable .theme--dark.v-table thead tr th:nth-child(2) {
  width: 20%;
  padding: 0px;
}
.approvalDataTable .theme--dark.v-table thead tr th:last-child {
  width: 20%;
  padding-left: 0px;
}

.lydataTable {
  padding-top: 20px;
}
.tabApprovalState .v-tabs__container--fixed-tabs .v-tabs__div,
.tabApprovalState .v-tabs__container--icons-and-text .v-tabs__div {
  min-width: 200px;
}
.one-line {
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
.flex-content > li:first {
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
.toolbarApprovalStateTitle {
  position: relative;
}
</style>
