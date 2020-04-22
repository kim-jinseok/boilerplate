<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-layout row wrap class="lystateBaseInfo">
        <v-flex xs12 pl-2>
          <v-text-field v-model="approvalName" label="배포제목" disabled></v-text-field>
          <v-text-field v-model="createUsername" label="배포자" disabled></v-text-field>
          <v-text-field v-model="createDate" label="배포일" disabled></v-text-field>
        </v-flex>
      </v-layout>
      <v-card class="cdstateBaseInfoFiles">
        <v-layout column>
          <!-- v-resize="onResize" -->
          <v-data-table
            class="approvalDetailDataTable"
            :headers="headers"
            :items="approvalRecFileData"
            :pagination.sync="pagination"
            :hide-headers="isMobile"
            :class="{mobile: isMobile}"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <!-- <td>
                <ul class="flex-content">
                @click="getFilePreview(props.item.fileHistoryId);"s-->
                <td class="flex-item" data-label="No">{{ props.item.no }}</td>
                <td class="flex-item one-line" data-label="파일명">
                  <v-tooltip color="black" bottom right max-width="100%">
                    <template v-slot:activator="{ on }">
                      <div class="one-line" v-on="on" dark>{{ props.item.fileName }}</div>
                    </template>
                    <template>
                      <div style="width:100%; height:100%;">
                        <pdf
                          v-show="iframe.loaded"
                          :src="iframe.pdfFilePath"
                          v-for="i in numPages"
                          :key="i"
                          :page="i"
                        ></pdf>
                      </div>
                    </template>
                  </v-tooltip>
                </td>
                <td class="flex-item" data-label="rev">{{ props.item.rev }}</td>
                <td class="flex-item" data-label="작성자">{{ props.item.createUsername }}</td>
                <td class="flex-item" data-label="작성일">{{ props.item.createDate }}</td>
                <!-- </ul> 
                </td>-->
              </tr>
            </template>
            <template v-slot:no-data>
              <td colspan="5">등록된 파일이 없습니다.</td>
            </template>
          </v-data-table>
        </v-layout>
      </v-card>

      <v-card class="cdReleaseLineLayout" style="background-color: #3b3c5a; color:black;">
        <v-card-title primary-title>
          <div>
            <div class="headline">배포정보</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="handleScroll('release')">
            <v-icon>{{ releaseshow ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-container fluid grid-list-lg v-show="releaseshow">
          <v-layout row wrap>
            <v-flex xs12>
              <v-card color="white" class="white--text">
                <v-card-actions class="pa-3">
                  <v-layout row>
                    <v-flex xs4>배포 내용 :</v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs8>
                      <div v-html="this.releaseContents"></div>
                    </v-flex>
                  </v-layout>
                </v-card-actions>
                <v-card-actions class="pa-3" v-show="releasePartnerMethod === '배포커뮤니티'">
                  <v-layout row>
                    <v-flex xs4>외부배포 방법 :</v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs8>
                      <div>{{releasePartnerMethod}}</div>
                    </v-flex>
                  </v-layout>
                </v-card-actions>
                <v-card-actions class="pa-3" v-show="releasePartnerMethod === '배포커뮤니티'">
                  <v-layout row>
                    <v-flex xs4>다운로드 횟수 :</v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs8>
                      <div>{{releaseDownloadCount}}</div>
                    </v-flex>
                  </v-layout>
                </v-card-actions>
                <v-divider light></v-divider>
                <v-card-actions class="pa-3">
                  <v-layout row>
                    <v-flex xs3>내부 배포처 :</v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs9 v-show="isShowEmployer">
                      <div v-for="item in releaseEmployerLineData" :key="item.name">
                        <v-layout row v-if="item.type ==='release'">
                          <v-flex xs12>
                            <span>{{ item.name }}</span>
                            <br />
                          </v-flex>
                        </v-layout>
                        <v-layout row v-else>
                          <v-flex xs9>
                            <span>{{ item.name }}</span>
                            <br />
                          </v-flex>
                          <v-flex xs4>
                            <span>{{ item.readDate }}</span>
                          </v-flex>
                        </v-layout>
                      </div>
                    </v-flex>
                    <v-flex xs9 red v-show="!isShowEmployer">
                      <span style="color:white;">내부 배포처가 없습니다.</span>
                    </v-flex>
                  </v-layout>
                </v-card-actions>
                <v-card-actions class="pa-3">
                  <v-layout row>
                    <v-flex xs3>외부 배포처 :</v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs9 v-show="isShowPartner">
                      <v-btn class="btn-partner" color="deep-purple lighten-1">협력사</v-btn>
                      <v-flex xs12>
                        <div
                          class="dvpartnerLine"
                          v-for="item in releasePartnerLineData"
                          :key="item.name"
                        >
                          <v-layout row>
                            <v-flex xs12>
                              <span>{{ item.name }}</span>
                              <br />
                            </v-flex>
                          </v-layout>
                        </div>
                      </v-flex>
                    </v-flex>
                    <v-flex xs9 red v-show="!isShowPartner">
                      <span style="color:white;">외부 배포처가 없습니다.</span>
                    </v-flex>
                  </v-layout>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card></v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { constants } from "crypto";
import pdf from "vue-pdf";

export default {
  components: {
    pdf
  },
  created() {
    this.getReleaseGetData();
  },
  data() {
    return {
      host: "http://m.jikyung.com",
      numPages: undefined,
      iframe: {
        pdfFilePath: "",
        loaded: false
      },
      isChange: false,
      loading: false,
      approvalName: "",
      createUsername: "",
      createDate: "",
      fhid: "",
      releaseStartDate: "",
      releaseEndDate: "",
      releaseContents: "",
      releasePartnerMethod: "",
      releaseDownloadCount: 0,
      releaseEmployerLineData: [],
      releasePartnerLineData: [],
      isShowApprovalLine: false,
      isShowPartner: false,
      isShowEmployer: false,
      approvalshow: false,
      releaseshow: false,
      pagination: {
        sortBy: "createDate",
        descending: true
      },
      isMobile: false,
      headers: [
        {
          text: "No",
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
        }
      ],
      approvalRecFileData: [],
      approvalLineData: [],
      approvalUserId: "",
      alert: {
        dialog: false,
        message: "결재자만 변경할 수 있습니다"
      }
    };
  },
  // mounted() {
  //   setTimeout(() => {
  //     this.iframe.pdfFilePath.then(pdf => {
  //       this.numPages = pdf.numPages;
  //     });
  //   }, 500);
  // },
  methods: {
    // onResize() {
    //   if (window.innerWidth < 769) this.isMobile = true;
    //   else this.isMobile = false;
    // },
    async getReleaseGetData() {
      try {
        var param = {
          approval_id: this.$route.params.aid,
          user_id: this.$store.state.l.user.userid
        };

        const data = helper.getJSON("approval_release_rec_get", param);

        const $this = this;
        let obj = {};
        let arr = [];
        let tmp = [];

        data.then(function(result) {
          if (!helper.isNull(result[0])) {
            //상세 기본 정보
            $this.approvalName = result[0][0].approval_name;
            $this.createUsername = result[0][0].name;
            $this.createDate = helper.getSafeDate(result[0][0].create_date);

            //배포 정보
            $this.releaseStartDate = helper.getSafeDate(
              result[0][0].start_date
            );
            $this.releaseEndDate = helper.getSafeDate(result[0][0].end_date);
            $this.releaseContents = unescape(result[0][0].release_contents);
            $this.releasePartnerMethod =
              result[0][0].release_transport === "community"
                ? "배포커뮤니티"
                : "메일";

            $this.releaseDownloadCount = result[0][0].download_limit_count;

            //내부 배포자
            let tempLine = "";
            let obj_employerLine = {};
            let arrEmployerLine = [];

            if (!helper.isNull(result[0][0].release_employer_line)) {
              tempLine = !helper.isNull(
                result[0][0].release_employer_line.split("]+[")
              )
                ? result[0][0].release_employer_line.split("]+[")
                : "";

              tempLine.forEach(function(value, key) {
                obj_employerLine = {};

                obj_employerLine.name = !helper.isNull(value.split("||"))
                  ? value.split("||")[0]
                  : "";
                obj_employerLine.readDate = !helper.isNull(value.split("||"))
                  ? value.split("||")[1]
                  : "";
                obj_employerLine.type = $this.$route.params.type;

                arrEmployerLine.push(obj_employerLine);
              });

              $this.isShowEmployer = true;
              $this.releaseEmployerLineData = arrEmployerLine;
            } else {
              $this.isShowEmployer = false;
              $this.releaseEmployerLineData = [];
            }

            //외부 배포자
            let tempReleaseLine = "";
            let obj_ReleaseLine = {};
            let arrReleaseLine = [];

            if (!helper.isNull(result[0][0].release_partner_line)) {
              tempReleaseLine = !helper.isNull(
                result[0][0].release_partner_line.split("]+[")
              )
                ? result[0][0].release_partner_line.split("]+[")
                : "";

              tempReleaseLine.forEach(function(value, key) {
                obj_ReleaseLine = {};

                obj_ReleaseLine.name = !helper.isNull(value.split("||"))
                  ? value.split("||")[0]
                  : "";
                obj_ReleaseLine.readDate = !helper.isNull(value.split("||"))
                  ? value.split("||")[1]
                  : "";
                obj_ReleaseLine.state = !helper.isNull(value.split("||"))
                  ? value.split("||")[2]
                  : "";
                obj_ReleaseLine.to_mail = !helper.isNull(value.split("||"))
                  ? value.split("||")[3]
                  : "";
                obj_ReleaseLine.type = $this.$route.params.type;

                arrReleaseLine.push(obj_ReleaseLine);
              });

              $this.isShowPartner = true;
              $this.releasePartnerLineData = arrReleaseLine;
            } else {
              $this.isShowPartner = false;
              $this.releasePartnerLineData = [];
            }
          } else {
            $this.approvalName = "";
            $this.createUsername = "";
            $this.createDate = "";
            $this.releaseStartDate = "";
            $this.releaseEndDate = "";
            $this.releaseContents = "";
          }

          //파일
          let obj_file = {};
          let arr_file = [];

          if (!helper.isNull(result[1])) {
            result[1].forEach(function(value, key) {
              obj_file = {};
              obj_file.no = key + 1;
              obj_file.createDate = helper.getSafeDate(value.create_date);
              obj_file.fileHistoryId = value.file_history_id;
              obj_file.fileName = value.file_name;
              obj_file.createUsername = value.name;
              obj_file.rev = value.revision;
              obj_file.previewPath = value.preview_path;
              obj_file.filePath = value.file_path;

              arr_file.push(obj_file);
            });
            $this.approvalRecFileData = arr_file;
          } else {
            $this.approvalRecFileData = [];
          }
        });
      } catch (err) {}
    },
    handleScroll: function(value) {
      var container = "";
      if (value === "release") {
        this.releaseshow = !this.releaseshow;
        container = this.$el.querySelector(".containerRelease");
      }

      setTimeout(function() {
        container.scrollIntoView();
      }, 100);
    },
    getFilePreview(id) {
      //   let host = "http://59.19.86.14:81";
      // let host = "http://192.168.10.115:8087";
      this.fhid = id;
      let $this = this;

      this.approvalRecFileData.forEach(function(value, key) {
        if ($this.fhid === value.fileHistoryId) {
          $this.iframe.loaded = true;
          if (!helper.isNull(value.previewPath)) {
            //  $this.iframe.pdfFilePath = host + value.previewPath;
            $this.iframe.pdfFilePath = pdf.createLoadingTask(
              $this.host + value.previewPath
            );

            console.log($this.host + value.previewPath);

            setTimeout(() => {
              pdf
                .createLoadingTask($this.host + value.previewPath)
                .then(pdf => {
                  $this.numPages = pdf.numPages;
                  console.log($this.numPages);
                });
            }, 1000);
          } else {
            // $this.iframe.pdfFilePath = host + value.filePath;
            $this.iframe.pdfFilePath = pdf.createLoadingTask(
              $this.host + value.filePath
            );

            setTimeout(() => {
              pdf.createLoadingTask($this.host + value.filePath).then(pdf => {
                $this.numPages = pdf.numPages;
                console.log($this.numPages);
              });
            }, 1000);
          }
        }
      });
    }
  }
};
</script>
<style scoped>
@import "../../src/css/approvalDetail.css";
</style>