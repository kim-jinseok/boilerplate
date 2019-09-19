<template>
  <v-layout v-resize="onResize" column class="lyDataTable">
    <v-data-table
      class="approvalDataTable"
      :headers="commoneHeaders"
      :items="data"
      :pagination.sync="pagination"
      :class="{mobile: isMobile}"
    >
      <template slot="items" slot-scope="props">
        <tr @click="getRecApprovalDetail({item :props.item, type:'approval'})">
          <td>
            <ul class="flex-content">
              <li
                class="flex-item one-line"
              >[{{props.item.renderType }}] {{ props.item.approvalName }}</li>
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
</template>

<script>
import approvalStateDetail from "./approvalStateDetail";

export default {
  components: {
    approvalStateDetail
  },
  props: ["data"],
  data() {
    return {
      model: "tab-1",
      pagination: {
        sortBy: "createDate",
        descending: true
      },
      search: "",
      isMobile: false,
      isState: false,
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
      ]
    };
  },
  methods: {
    onResize() {
      if (window.innerWidth < 769) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },

    getRecApprovalDetail(params) {
      if (event.target.classList.contains("datatable table")) return;
      let aid = params.item.approvalId;
      let type = params.type;

      this.$router.push("/approvalStateDetail/" + aid + "/" + type);
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
