<template>
  <div>
    <v-toolbar class="toolbarApprovalStateTitle" fixed>
      <v-toolbar-title class="white--text">검색결과</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-toolbar>
    <v-data-table
      class="searchResultDataTable"
      :headers="resultHeaders"
      :items="results"
      :search="search"
      :custom-sort="customSort"
      item-key="No"
    >
      <template v-slot:items="props">
        <tr>
          <td>{{ props.item.No }}</td>
          <td class="text-xs-left one-line">
            <v-tooltip color="black" bottom right max-width="100%">
              <template v-slot:activator="{ on }">
                <div
                  class="one-line"
                  v-on="on"
                  dark
                  @click="GetResultPreview(props.item.fileHistoryId);"
                >{{props.item.fileName}}</div>
              </template>
              <span>{{props.item.fileName}}</span>
              <iframe
                v-show="iframe.loaded"
                :src="iframe.pdfFilePath"
                style="width:80vw; height: 80vh;"
                allowfullscreen="yes"
                frameborder="0"
                scrolling="no"
              ></iframe>
            </v-tooltip>
          </td>
          <td class="text-xs-left">{{ props.item.Rev }}</td>
          <td class="text-xs-left">{{ props.item.createUserName}}</td>
        </tr>
      </template>
      <template v-slot:no-data>
        <td colspan="4" class="text-xs-center">
          검색한 파일이 없습니다
          <div class></div>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  created() {
    this.btSearchFiles();
  },
  data() {
    return {
      iframe: {
        pdfFilePath: "",
        loaded: false
      },
      filehid: "",
      search: "",
      date: new Date(),
      resultHeaders: [
        {
          text: "No",
          align: "left",
          sortable: true,
          value: "No",
          width: "5%"
        },
        { text: "파일명", align: "left", value: "fileName", width: "70%" },
        { text: "Rev", align: "left", value: "Rev", width: "5%" },
        { text: "작성자", align: "left", value: "createUserName", width: "20%" }
      ],
      results: []
    };
  },
  methods: {
    btSearchFiles() {
      try {
        var param = {
          start_date: "",
          end_date: "",
          search_type: this.$route.params.searchType,
          search_value: this.$route.params.searchValue,
          user_id: this.$store.state.l.user.userid
        };

        const data = helper.getJSON("files_search_get", param);

        const $this = this;

        data.then(function(result) {
          let obj = {};
          let arr = [];

          if (!helper.isNull(result)) {
            result.forEach(function(value, key) {
              obj = {};

              obj.No = value.rn;
              obj.fileName = value.file_name;
              obj.Rev = value.revision;
              obj.createUserName = value.create_username;
              obj.fileHistoryId = value.file_history_id;
              obj.previewPath = value.preview_path;
              obj.filePath = value.file_path;

              arr.push(obj);
            });

            $this.results = arr;
          } else {
            $this.results = [];
          }
        });
      } catch (error) {}
    },
    GetResultPreview(id) {
      this.filehid = id;

      let $this = this;

      this.results.forEach(function(value, key) {
        if ($this.filehid === value.fileHistoryId) {
          $this.iframe.loaded = true;

          if (!helper.isNull(value.previewPath)) {
            $this.iframe.pdfFilePath =
              "http://125.7.231.47" + value.previewPath;
          } else {
            $this.iframe.pdfFilePath = "http://125.7.231.47" + value.filePath;
          }
        }
      });
    },
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
};
</script>    

<style scope>
.v-input__slot {
  height: 28px;
  padding: 0px 0px 10px 0px;
}
.searchResultDataTable .flex-content {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}
.searchResultDataTable .flex-item {
  height: 40px;
  font-weight: bold;
}
.primary-title {
  color: black;
}
.searchResultDataTable .v-input__control {
  height: 5px;
}
.searchResultDataTable .v-text-field__slot {
  font-size: 12px;
  padding: 0px;
}
.searchResultDataTable .theme--dark.v-subheader {
  height: 30px;
  font-size: 12px;
}
.searchResultDataTable .v-text-field {
  padding-top: 0px;
}
.one-line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 80px;
  max-width: 180px;
}
</style>
