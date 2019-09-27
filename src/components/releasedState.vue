<template>
  <v-layout v-resize="onResize" column class="lyDataTable">
    <v-data-table
      class="approvalDataTable"
      :headers="headers"
      :items="data"
      :pagination.sync="pagination"
      :class="{mobile: isMobile}"
    >
      <template slot="items" slot-scope="props">
        <tr @click="getRecReleaseDetail({item :props.item, type:'release'})">
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
        <td colspan="5">배포 받은 문서가 없습니다.</td>
      </template>
    </v-data-table>
  </v-layout>
</template>
<script>
export default {
  props: ["data"],
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
.tabRelease .v-tabs__container--fixed-tabs .v-tabs__div,
.v-tabs__container--icons-and-text .v-tabs__div {
  min-width: 135px;
}
</style>
