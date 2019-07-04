<template>
  <div>
     <a-card title="결재현황" :bordered="false" :bodyStyle="{padding:0}">
    <a-form
    :form="form"
    @submit="handleSubmit"
  >
    <a-form-item
      label=""
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      style="margin-top:20px;"
    >
        <a-input-group compact>
          <a-select defaultValue="파일명">
            <a-select-option value="파일명">파일명</a-select-option>
            <a-select-option value="확장자">확장명</a-select-option>
            <a-select-option value="작성자">작성자</a-select-option>
          </a-select>
          <a-auto-complete
            :dataSource="dataSource"
            style="width: 200px"
            @change="handleChange"
            placeholder=""
          />
        </a-input-group>
    </a-form-item>
    <a-form-item
      :wrapper-col="{ span: 12, offset: 5 }"
    >
      <a-button
        type="danger"
        html-type="button"
      >
        초기화
      </a-button>
      <a-button
        type="primary"
        html-type="button"
        style="margin-left:10px;"
      >
        검색
      </a-button>
    </a-form-item>
    
  </a-form>
  </a-card>

  <div>
      <a-card title="결재현황" :bordered="false" style="width: 300px">
          <a-badge :count="5" title="Custom hover text" class="lbApprovalCount">
            <a-icon type="profile" class="lbApproval" />
          </a-badge>
          <a-badge :count="5" title="Custom hover text" class="lbApprovalCount">
            <a-icon type="file-done" class="lbApproval" />
          </a-badge>
      </a-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped>

.ant-badge-count{
  font-size:18px !important;
}
.lbApprovalCount {
  margin-left:10px;

}

.lbApproval {
  font-size: 100px;
  margin-left:10px;

}
</style>