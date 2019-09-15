<template>
  <v-layout v-resize="onResize" column class="lyDataTable">
    <v-data-table
      class="dvApprovalTable"
      :headers="headers"
      :items="data"
      :pagination.sync="pagination"
      :class="{mobile: isMobile}"
    >
      <template slot="items" slot-scope="props">
        <tr @click="getRecReleaseDetail({item :props.item, type:'release'})">
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
        <td colspan="5">배포 받은 문서가 없습니다.</td>
      </template>
    </v-data-table>
  </v-layout>
</template>
<script>
import approvalStateDetail from "./approvalStateDetail";

export default {
  props: ["data"],
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
      isMobile: false,
      headers: [
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
      releasedData: []
    };
  },
  methods: {
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    },
    getRecReleaseDetail(params) {
      if (event.target.classList.contains("datatable table")) return;
      let aid = params.item.approvalId;
      let type = params.type;
      this.$router.push("/releaseStateDetail/" + aid + "/" + type);
    }
  }
};
</script>
<style scope>
/* .container {
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

.dvApprovalTable .theme--dark.v-table thead tr:first-child {
  height: auto;
  padding-top: 19px;
  padding-bottom: 10px;
  border-left: none;
}

.dvApprovalTable .theme--dark.v-table thead tr th:first-child {
  width: 45%;
  padding-right: 0px;
}
.dvApprovalTable .theme--dark.v-table thead tr th:nth-child(2) {
  width: 20%;
  padding: 0px;
}
.dvApprovalTable .theme--dark.v-table thead tr th:last-child {
  width: 20%;
  padding-left: 0px;
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
*/
.tabRelease .v-tabs__container--fixed-tabs .v-tabs__div,
.v-tabs__container--icons-and-text .v-tabs__div {
  min-width: 135px;
}
</style>
