      <template>
  <v-container class="ctFileDetailInfo">
    <v-layout row>
      <v-flex xs3>
        <v-subheader>크기</v-subheader>
      </v-flex>
      <v-flex xs9 pt-2>
        <label>{{this.fileSize}}</label>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3>
        <v-subheader>확장자</v-subheader>
      </v-flex>
      <v-flex xs9 pt-2>
        <label>{{this.fileType}}</label>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3>
        <v-subheader>작성자</v-subheader>
      </v-flex>
      <v-flex xs9 pt-2>
        <label>{{this.createUsername}}</label>
      </v-flex>
    </v-layout>

    <v-layout row style="margin-bottom:10px;">
      <v-flex xs3>
        <v-subheader>작성일</v-subheader>
      </v-flex>
      <v-flex xs9 pt-2>
        <label>{{this.createDate}}</label>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs4></v-flex>
      <v-flex xs4 style="margin-left: 50px; margin-top: 5px;">
        <v-dialog v-model="isClose" width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" class="btFileDetailInfo" dark v-on="on">상세보기</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">문서상세정보</span>
            </v-card-title>
            <v-tabs class="tabBoardDetail" fixed-tabs v-model="model">
              <v-tab centered :href="`#tab-1`">미리보기</v-tab>
              <v-tab centered :href="`#tab-2`">변경이력</v-tab>
              <v-tab centered :href="`#tab-3`">연계문서</v-tab>
            </v-tabs>
            <v-tabs-items v-model="model">
              <v-tab-item :value="`tab-1`">
                <v-card flat>
                  <div class="subheading pl-3 pt-3">{{this.fileName}}</div>
                  <div ref="dvPdfContainer">
                    <v-divider></v-divider>
                    <h3 style="margin:10px;" v-show="!iframe.loaded">미리보기가 없습니다.</h3>
                    <v-layout
                      class="fileinput fileinput-new"
                      data-provides="fileinput"
                      v-show="!iframe.loaded"
                    >
                      <v-flex xs7>
                        <input type="hidden" />
                        <input style="padding-top:8px;" type="file" name accept=".pdf" />
                      </v-flex>
                      <v-flex xs5>
                        <v-btn
                          :loading="loading1"
                          :disabled="loading1"
                          color="blue-grey"
                          class="white--text"
                          @click="loader = 'loading1'"
                        >
                          Upload
                          <v-icon right dark>cloud_upload</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                    <iframe
                      v-show="iframe.loaded"
                      :src="iframe.pdfFilePath"
                      style="width:80vw; height: 80vh;"
                      allowfullscreen="yes"
                      frameborder="0"
                      scrolling="no"
                    ></iframe>
                  </div>
                </v-card>
              </v-tab-item>
              <v-tab-item :value="`tab-2`">
                <v-card flat style="margin-bottom :30px;">
                  <v-layout column>
                    <!-- v-resize="onResize"  -->
                    <v-data-table
                      class="revisionHistoryDataTable"
                      :headers="revisionHeaders"
                      :items="revisionData"
                      :pagination.sync="paginationRevision"
                      :class="{mobile: isMobile}"
                    >
                      <template slot="items" slot-scope="props">
                        <tr>
                          <!-- <td>
                          <ul class="flex-content">-->
                          <td class="flex-item">{{ props.item.rev }}</td>
                          <td class="flex-item">
                            <v-tooltip color="black" bottom right max-width="100%">
                              <template v-slot:activator="{ on }">
                                <div
                                  class="one-line"
                                  v-on="on"
                                  dark
                                  @click="getRevisionPreview(props.item.fileHistoryId);"
                                >{{props.item.fileName}}</div>
                              </template>
                              <div
                                v-if="props.item.firstRevision ==='최초등록'"
                              >{{props.item.firstRevision}}</div>
                              <div v-else>
                                <label>변경유형 :</label>
                                <span>{{props.item.updateType}}</span>
                                <br />
                                <label>변경내용 :</label>
                                <span>{{props.item.updateDesc}}</span>
                              </div>

                              <br />
                              <iframe
                                v-show="iframe.loaded"
                                :src="iframe.revisionPdfFilePath"
                                style="width:80vw; height: 80vh;"
                                allowfullscreen="yes"
                                frameborder="0"
                                scrolling="no"
                              ></iframe>
                            </v-tooltip>
                          </td>
                          <td class="flex-item">{{ props.item.createDate }}</td>
                          <td class="flex-item">{{ props.item.createUsername }}</td>
                          <!-- </ul>
                          </td>-->
                        </tr>
                      </template>

                      <template v-slot:no-data>
                        <td colspan="5">등록된 변경이력이 없습니다.</td>
                      </template>
                    </v-data-table>
                  </v-layout>
                </v-card>
              </v-tab-item>

              <v-tab-item :value="`tab-3`">
                <v-card flat style="margin-bottom :30px;">
                  <v-layout column>
                    <!-- v-resize="onResize" -->
                    <v-data-table
                      class="relationFilesDataTable"
                      :headers="relationHeaders"
                      :items="relationData"
                      :pagination.sync="pagination"
                      :class="{mobile: isMobile}"
                    >
                      <template slot="items" slot-scope="props">
                        <tr>
                          <!-- <td>
                          <ul class="flex-content">-->
                          <td class="flex-item">{{ props.item.no }}</td>
                          <td class="flex-item">
                            <v-tooltip color="black" bottom right max-width="100%">
                              <template v-slot:activator="{ on }">
                                <div
                                  class="one-line"
                                  v-on="on"
                                  dark
                                  @click="getRelationPreview(props.item.fileHistoryId);"
                                >{{props.item.fileName}}</div>
                              </template>
                              <iframe
                                v-show="iframe.loaded"
                                :src="iframe.relationPdfFilePath"
                                style="width:80vw; height: 80vh;"
                                allowfullscreen="yes"
                                frameborder="0"
                                scrolling="no"
                              ></iframe>
                            </v-tooltip>
                          </td>
                          <td class="flex-item">{{ props.item.rev }}</td>
                          <td class="flex-item">{{ props.item.createUsername }}</td>
                          <td class="flex-item">{{ props.item.createDate }}</td>
                          <!-- </ul>
                          </td>-->
                        </tr>
                      </template>
                      <template v-slot:no-data>
                        <td colspan="5">등록된 연계문서가 없습니다.</td>
                      </template>
                    </v-data-table>
                  </v-layout>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" flat="flat" @click="isClose = false">닫기</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
      <v-flex xs4></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["data"],
  created() {
    this.fileName = this.data.item.fileName;
    this.fileId = this.data.item.fileId;
    this.fileHistoryId = this.data.item.fileHistoryId;
    this.fileSize = this.data.item.fileSize;
    this.fileType = this.data.item.fileType;
    this.createUsername = this.data.item.createUsername;
    this.createDate = helper.getSafeDate(this.data.item.createDate);

    let param = {
      file_id: this.fileId,
      file_history_id: this.fileHistoryId,
      user_id: this.$store.state.l.user.userid
    };

    this.getRevisionTable(param);
  },
  data() {
    return {
      iframe: {
        pdfFilePath: "",
        revisionPdfFilePath: "",
        relationPdfFilePath: "",
        loaded: false
      },
      disabled: false,
      loading1: false,
      relationFhid: "",
      revisionFhid: "",
      fileSize: "",
      fileType: "",
      createUsername: "",
      createDate: "",
      fileName: "",
      model: "tab-1",
      isClose: false,
      pagination: {
        sortBy: "rev",
        descending: true
      },
      paginationRevision: {
        sortBy: "no",
        descending: true
      },
      isMobile: true,
      relationHeaders: [
        {
          text: "no",
          align: "left",
          value: "no"
        },
        {
          text: "파일명",
          align: "left",
          value: "fileName"
        },
        {
          text: "Rev",
          align: "left",
          value: "rev"
        },
        {
          text: "작성자",
          align: "left",
          value: "createUsername"
        },
        {
          text: "작성일",
          align: "left",
          value: "createDate"
        },
        {
          text: "",
          align: "left",
          value: "revisionInfo"
        }
      ],
      revisionHeaders: [
        {
          text: "rev",
          align: "left",
          value: "rev"
        },
        {
          text: "파일명",
          align: "left",
          value: "fileName"
        },
        {
          text: "작성일",
          align: "left",
          value: "createDate"
        },
        {
          text: "작성자",
          align: "left",
          value: "createUsername"
        }
      ],
      relationData: [],
      revisionData: []
    };
  },
  methods: {
    // onResize() {
    //   if (window.innerWidth < 769) this.isMobile = true;
    //   else this.isMobile = false;
    // },
    async getRevisionTable(param) {
      try {
        const data = helper.getJSON("files_rec_get", param);

        const $this = this;

        data.then(function(result) {
          let obj = {};
          let arr = [];
          let temp = [];
          let revisionInfo = "";

          //변경이력
          result[0].forEach(function(value, key) {
            if (!helper.isNull(value)) {
              obj = {};
              obj.rev = value.rn;
              obj.fileHistoryId = value.file_history_id;
              obj.fileName = value.file_name;
              obj.createDate = helper.getSafeDate(value.create_date);
              obj.createUsername = value.name;
              obj.previewPath = value.preview_path;
              obj.filePath = value.file_path;

              if (value.rn === 1 && helper.isNull(value.work_desc)) {
                value.work_desc = "최초등록";
                obj.firstRevision = value.work_desc;
              }

              revisionInfo = value.work_desc;
              temp = helper.isNull(revisionInfo.split("||"))
                ? ""
                : revisionInfo.split("||");

              obj.updateType = temp[2] === "" ? "" : temp[2];
              obj.updateDesc = temp[3] === "" ? "" : temp[3];

              arr.push(obj);
            } else {
              arr = [];
            }
          });

          $this.revisionData = arr;

          if (!helper.isNull(result[1][0].preview_path)) {
            $this.iframe.loaded = true;
            $this.iframe.pdfFilePath =
              "http://125.7.231.47" + result[1][0].preview_path;
          } else {
            $this.iframe.loaded = true;
            $this.iframe.pdfFilePath =
              "http://125.7.231.47" + result[1][0].file_path;
          }

          let obj_relation = {};
          let arr_relation = [];

          //연계문서
          result[3].forEach(function(value, key) {
            if (value.rtnVal === -1) {
              $this.relationData = "";
              return $this.relationData;
            }

            obj_relation = {};

            obj_relation.no = value.rn;
            obj_relation.fileHistoryId = value.file_history_id;
            obj_relation.fileName = value.file_name;
            obj_relation.rev = value.revision;
            obj_relation.createDate = helper.getSafeDate(value.create_date);
            obj_relation.createUsername = value.create_username;
            obj_relation.previewPath = value.preview_path;
            obj_relation.filePath = value.file_path;

            arr_relation.push(obj_relation);
          });

          $this.relationData = arr_relation;
        });
      } catch (err) {}
    },
    getRelationPreview(id) {
      this.relationFhid = id;

      let $this = this;

      this.relationData.forEach(function(value, key) {
        if ($this.relationFhid === value.fileHistoryId) {
          $this.iframe.loaded = true;

          if (!helper.isNull(value.previewPath)) {
            $this.iframe.relationPdfFilePath =
              "http://125.7.231.47" + value.previewPath;
          } else {
            $this.iframe.pdfFilePath = "http://125.7.231.47" + value.filePath;
          }
        }
      });
    },
    getRevisionPreview(id) {
      this.revisionFhid = id;

      let $this = this;

      this.revisionData.forEach(function(value, key) {
        if ($this.revisionFhid === value.fileHistoryId) {
          $this.iframe.loaded = true;

          if (!helper.isNull(value.previewPath)) {
            $this.iframe.revisionPdfFilePath =
              "http://125.7.231.47" + value.previewPath;
          } else {
            $this.iframe.pdfFilePath = "http://125.7.231.47" + value.filePath;
          }
        }
      });
    }
  }
};
</script>

<style scope>
@import "../../src/css/boardDetail.css";
</style>
