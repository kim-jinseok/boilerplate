<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-layout row wrap class="lystateBaseInfo">
        <v-flex xs12 pl-2>
          <v-text-field v-model="approvalName" label="제목" disabled></v-text-field>
          <v-text-field v-model="createUsername" label="요청자" disabled></v-text-field>
          <v-text-field v-model="createDate" label="작성일" disabled></v-text-field>
        </v-flex>
      </v-layout>
      <v-card class="cdstateBaseInfoFiles">
        <v-layout v-resize="onResize" column>
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
                <td>
                  <ul class="flex-content">
                    <li class="flex-item" data-label="No">{{ props.item.no }}</li>
                    <li class="flex-item one-line" data-label="파일명">
                      <v-tooltip color="black" bottom right max-width="100%">
                        <template v-slot:activator="{ on }">
                          <div
                            class="one-line"
                            v-on="on"
                            dark
                            @click="getFilePreview(props.item.fileHistoryId);"
                          >{{ props.item.fileName }}</div>
                        </template>
                        <iframe
                          v-show="iframe.loaded"
                          :src="iframe.pdfFilePath"
                          style="width : 400px; height: 300px;"
                          allowfullscreen="yes"
                          frameborder="0"
                          scrolling="no"
                        ></iframe>
                      </v-tooltip>
                    </li>
                    <li class="flex-item" data-label="rev">{{ props.item.rev }}</li>
                    <li class="flex-item" data-label="작성자">{{ props.item.createUsername }}</li>
                    <li class="flex-item" data-label="작성일">{{ props.item.createDate }}</li>
                  </ul>
                </td>
              </tr>
            </template>
            <template v-slot:no-data>
              <td colspan="5">등록된 파일이 없습니다.</td>
            </template>
          </v-data-table>
        </v-layout>
      </v-card>

      <v-card style="background-color: #ffc107; color:black; margin-bottom:10px;">
        <v-card-title primary-title>
          <div>
            <div class="headline">결재라인</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="handleScroll('approval')">
            <v-icon>{{ approvalshow ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-container class="containerApproval" fluid grid-list-lg v-show="approvalshow">
          <v-layout row wrap style="background-color:white;">
            <v-flex
              xs12
              v-show="isShowApprovalLine"
              style="padding: 15px;"
              v-for="item in approvalLineData"
              :key="item.userId"
            >
              <v-layout row>
                <v-btn class="ma-2" outlined fab color="black">{{item.sort}}</v-btn>
                <v-flex xs4 v-if="!item.isShowState" pt-1>
                  <v-btn class="btState" outline small :color="`${item.color}`">{{item.state}}</v-btn>
                  <v-divider></v-divider>
                  <span style="font-weight: bolder; padding-left: 15px;">{{item.updateDate}}</span>
                </v-flex>
                <v-flex xs4 v-else pt-1>
                  <v-btn
                    class="btState"
                    @click="editState"
                    outline
                    small
                    :color="`${item.color}`"
                    :data_userId="item.userId"
                  >{{item.state}}</v-btn>
                  <v-divider></v-divider>
                </v-flex>
                <v-flex xs8>
                  <span>{{item.name}} / {{item.dep}}</span>
                  <v-divider></v-divider>
                  <span v-html="item.contents"></span>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 v-show="!isShowApprovalLine" red style="padding: 15px;">
              <span>
                <b>결재 라인이 없습니다.</b>
              </span>
            </v-flex>
          </v-layout>
          <!-- 결재확인 팝업창 -->
          <Modal v-if="isChange" @close="isChange = false" />
          <Alert v-if="alert.dialog" :alert.sync="alert" @close="alert.dialog=false" />
        </v-container>
      </v-card>
      <v-card></v-card>

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

        <v-container
          class="containerRelease approvalStateDetail"
          fluid
          grid-list-lg
          v-show="releaseshow"
        >
          <v-layout row wrap>
            <v-flex xs12>
              <v-card color="white" class="white--text">
                <v-card-actions class="pa-3">
                  <v-layout row>
                    <v-flex xs5>배포 다운로드 기간 :</v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs7>
                      <div>{{this.releaseStartDate}} ~ {{this.releaseEndDate}}</div>
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
                        <v-layout row>
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
                            <v-flex xs8>
                              <span>{{ item.name }}</span>
                              <br />
                            </v-flex>
                            <v-flex xs4>
                              <span>{{ item.readDate }}</span>
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
import Modal from "./Modal";
import Alert from "./Alert";
import { constants } from "crypto";
export default {
  created() {
    this.getApprovalGetData();
  },
  components: {
    Modal,
    Alert
  },
  //computed: {
  //   isState: function() {
  //     this.isChange = this.$store.state.a.editPPapprovalState;
  //     console.log("isState");
  //     console.log(this.isChange);
  //     return this.isChange;
  //   }
  // },
  data() {
    return {
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
      releaseEmployerLineData: [],
      releasePartnerLineData: [],
      isShowApprovalLine: false,
      isShowPartner: false,
      isShowEmployer: false,
      approvalshow: false,
      releaseshow: false,
      pagination: {
        sortBy: "no",
        descending: true
      },
      isMobile: false,
      scrollPosition: 0,
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
  methods: {
    editState(el) {
      let userId = el.currentTarget.getAttribute("data_userId");
      var $this = this;

      if ($this.$store.state.l.user.userid !== userId) {
        $this.$store.state.a.editPPapprovalState = false;
        $this.alert.dialog = true;
      } else {
        $this.alert.dialog = false;
        $this.$store.state.a.editPPapprovalState = true;
      }

      $this.isChange = $this.$store.state.a.editPPapprovalState;
    },
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    },
    async getApprovalGetData() {
      try {
        var param = {
          approval_id: this.$route.params.aid,
          user_id: this.$store.state.l.user.userid
        };

        const data = helper.getJSON("approval_rec_get", param);

        const $this = this;
        let obj = {};
        let arr = [];
        let tmp = [];

        data.then(function(result) {
          if (!helper.isNull(result[0])) {
            //상세 기본 정보
            $this.approvalName = result[0].approval_name;
            $this.createUsername = result[0].name;
            $this.createDate = helper.getSafeDate(result[0].create_date);

            //배포 정보
            $this.releaseStartDate = helper.getSafeDate(result[0].start_date);
            $this.releaseEndDate = helper.getSafeDate(result[0].end_date);
            $this.releaseContents = unescape(result[0].release_contents);

            //내부 배포자
            let tempLine = "";
            let obj_employerLine = {};
            let arrEmployerLine = [];

            if (!helper.isNull(result[0].release_employer_line)) {
              tempLine = !helper.isNull(
                result[0].release_employer_line.split("]*[")
              )
                ? result[0].release_employer_line.split("]*[")
                : "";

              tempLine.forEach(function(value, key) {
                obj_employerLine = {};

                obj_employerLine.name = !helper.isNull(value.split("||"))
                  ? value.split("||")[0]
                  : "";
                obj_employerLine.readDate = !helper.isNull(value.split("||"))
                  ? value.split("||")[1]
                  : "";
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

            if (!helper.isNull(result[0].release_partner_line)) {
              tempReleaseLine = !helper.isNull(
                result[0].release_partner_line.split("]*[")
              )
                ? result[0].release_partner_line.split("]*[")
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

                arrReleaseLine.push(obj_ReleaseLine);
              });

              $this.isShowPartner = true;
              $this.releasePartnerLineData = arrReleaseLine;
            } else {
              $this.isShowPartner = false;
              $this.releasePartnerLineData = [];
            }

            //파일
            let tempFileListLine = "";
            let obj_FileListLine = {};
            let arrFileListLine = [];

            if (!helper.isNull(result[0].file_list)) {
              tempFileListLine = !helper.isNull(
                result[0].file_list.split("]*[")
              )
                ? result[0].file_list.split("]*[")
                : "";

              tempFileListLine.forEach(function(value, key) {
                obj_FileListLine = {};

                obj_FileListLine.no = key + 1;

                obj_FileListLine.fileName = !helper.isNull(value.split("||"))
                  ? value.split("||")[0]
                  : "";
                obj_FileListLine.fileHistoryId = !helper.isNull(
                  value.split("||")
                )
                  ? value.split("||")[1]
                  : "";
                obj_FileListLine.rev = !helper.isNull(value.split("||"))
                  ? value.split("||")[2]
                  : "";
                obj_FileListLine.createUsername = !helper.isNull(
                  value.split("||")
                )
                  ? value.split("||")[3]
                  : "";
                obj_FileListLine.createDate = !helper.isNull(value.split("||"))
                  ? helper.getSafeDate(value.split("||")[4])
                  : "";
                obj_FileListLine.fileType = !helper.isNull(value.split("||"))
                  ? value.split("||")[6]
                  : "";

                obj_FileListLine.previewPath = !helper.isNull(value.split("||"))
                  ? value.split("||")[8]
                  : "";

                obj_FileListLine.filePath = !helper.isNull(value.split("||"))
                  ? value.split("||")[9]
                  : "";

                arrFileListLine.push(obj_FileListLine);
              });

              $this.approvalRecFileData = arrFileListLine;
            } else {
              $this.approvalRecFileData = [];
            }

            //결재 라인 정보
            let obj_approvalLine = {};
            let arr_approvalLine = [];
            let tmp_approvalLine = [];

            if (!helper.isNull(result[0].approval_line)) {
              tmp_approvalLine = !helper.isNull(
                result[0].approval_line.split("]*[")
              )
                ? result[0].approval_line.split("]*[")
                : "";

              tmp_approvalLine.forEach(function(value, key) {
                obj_approvalLine = {};
                obj_approvalLine.sort = value.split("||")[0];
                obj_approvalLine.name = value.split("||")[1];
                obj_approvalLine.dep = value.split("||")[2];
                obj_approvalLine.state = value.split("||")[3];
                obj_approvalLine.updateDate = value.split("||")[4];
                obj_approvalLine.userId = value.split("||")[5];
                obj_approvalLine.contents = unescape(value.split("||")[6]);
                obj_approvalLine.readDate = value.split("||")[7];
                obj_approvalLine.isShowState = false;
                obj_approvalLine.errorMessage = "결재자가 아닙니다.";

                if (obj_approvalLine.state === "승인") {
                  obj_approvalLine.color = "indigo";
                } else if (obj_approvalLine.state === "결재대기") {
                  obj_approvalLine.readDate = "";
                  if ($this.$route.params.type === "approval") {
                    obj_approvalLine.isShowState = true;
                  }
                  obj_approvalLine.color = "teal";
                } else if (obj_approvalLine.state === "보류") {
                  if ($this.$route.params.type === "approval") {
                    obj_approvalLine.isShowState = true;
                  }

                  obj_approvalLine.color = "orange darken-4";
                } else if (obj_approvalLine.state === "반려") {
                  obj_approvalLine.color = "red darken-4";
                } else if (obj_approvalLine.state === "전결") {
                  obj_approvalLine.color = "green darken-4";
                }

                arr_approvalLine.push(obj_approvalLine);
              });

              $this.isShowApprovalLine = true;
              $this.approvalLineData = arr_approvalLine;
            } else {
              $this.isShowApprovalLine = false;
              $this.approvalLineData = [];
            }
          } else {
            $this.approvalName = "";
            $this.createUsername = "";
            $this.createDate = "";
            $this.releaseStartDate = "";
            $this.releaseEndDate = "";
            $this.releaseContents = "";
          }
        });
      } catch (err) {}
    },
    handleScroll: function(value) {
      var container = "";
      if (value === "approval") {
        this.approvalshow = !this.approvalshow;
        container = this.$el.querySelector(".containerApproval");
      }

      if (value === "release") {
        this.releaseshow = !this.releaseshow;
        container = this.$el.querySelector(".containerRelease");
      }

      setTimeout(function() {
        container.scrollIntoView();
      }, 100);
    },
    getFilePreview(id) {
      this.fhid = id;
      let $this = this;

      this.approvalRecFileData.forEach(function(value, key) {
        if ($this.fhid === value.fileHistoryId) {
          $this.iframe.loaded = true;

          if (!helper.isNull(value.previewPath)) {
            $this.iframe.pdfFilePath =
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
/* .mobile {
  color: #333;
}

@media screen and (max-width: 768px) {
  .mobile .approvalDetailDataTable table.v-table tr {
    max-width: 100%;
    position: relative;
    display: block;
  }

  .mobile .approvalDetailDataTable table.v-table tr td {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    height: auto;
    padding: 8px;
  }

  .mobile .approvalDetailDataTable table.v-table tr td ul li:before {
    content: attr(data-label);
    padding-bottom: 0.5em;
    display: block;
    color: #999;
  }
  .approvalDetailDataTable .v-datatable__actions__select {
    width: 50%;
    margin: 0px;
    justify-content: flex-start;
  }
  .mobile
    .approvalDetailDataTable
    .theme--light.v-table
    tbody
    tr:hover:not(.v-datatable__expand-row) {
    background: transparent;
  }
} */
.approvalStateDetail .pa-3 {
  padding: 10px !important;
}
.lystateBaseInfo {
  margin-bottom: 30px;
  padding-top: 20px;
}
.cdstateBaseInfoFiles {
  margin-bottom: 30px;
}
.ma-2 {
  font-size: 20px;
  width: 40px;
  height: 40px;
}
.v-input__slot {
  height: 28px;
  padding: 0px 0px 10px 0px;
}
.approvalDetailDataTable .flex-content {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.approvalDetailDataTable .flex-item {
  padding: 5px;
  height: 100%;
  font-weight: bold;
}
.approvalDetailDataTable .flex-content li:nth-child(1) {
  width: 8%;
}
.approvalDetailDataTable .flex-content li:nth-child(2) {
  width: 43%;
}
.approvalDetailDataTable .flex-content li:nth-child(3) {
  width: 8%;
}
.approvalDetailDataTable .flex-content li:nth-child(4) {
  width: 15%;
}
.approvalDetailDataTable .flex-content li:nth-child(5) {
  width: 25%;
}
.pa-3 {
  color: black;
}
.primary-title {
  color: black;
}
.one-line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 100px;
  max-width: 180px;
}
.btn-partner {
  width: 100%;
  height: 30px;
  border-radius: 20px;
}
.dvpartnerLine {
  margin-left: 11px;
}
.cdapprovalLine {
  width: 335px;
}
.btState {
  opacity: 1;
}
.container.grid-list-lg .layout .flex {
  text-align: center;
}

.textareaApprovalText .v-input__slot {
  width: 350px;
  margin: 10px;
}
.textareaApprovalText .theme--dark.v-input:not(.v-input--is-disabled) input,
.theme--dark.v-input:not(.v-input--is-disabled) textarea {
  padding: 10px;
  color: black;
}
</style>
                    