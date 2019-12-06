<template>
  <v-layout column class="lyDataTable">
    <!-- v-resize="onResize" -->
    <v-data-table
      class="approvalDataTable"
      :headers="commoneHeaders"
      :items="data"
      :pagination.sync="pagination"
    >
      <!-- :class="{mobile: isMobile}" -->
      <template slot="items" slot-scope="props">
        <tr @click="getRecApprovalDetail({item :props.item, type:'approval'})">
          <td>
            <!-- <ul class="flex-content">
              <li
                class="flex-item one-line"
              >[{{props.item.renderType }}] {{ props.item.approvalName }}</li>
              <li class="flex-item">{{ props.item.createUsername }}</li>
              <li class="flex-item">{{ props.item.createDate }}</li>
            </ul>-->
            [{{props.item.renderType }}] {{ props.item.approvalName }}
          </td>
          <td>{{ props.item.createUsername }}</td>
          <td>{{ props.item.createDate }}</td>
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
    // onResize() {
    //   if (window.innerWidth < 769) {
    //     this.isMobile = true;
    //   } else {
    //     this.isMobile = false;
    //   }
    // },

    getRecApprovalDetail(params) {
      if (event.target.classList.contains("datatable table")) return;
      let aid = params.item.approvalId;
      let type = params.type;

      this.$router.push("/approvalStateDetail/" + aid + "/" + type);
    }
  }
};
</script>