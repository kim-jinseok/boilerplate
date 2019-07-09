<template>
<div>
  <div>
    <a-row type="flex">
        <a-col :span="8" class="title">문서검색</a-col>
    </a-row>
    <br />
    <br />
    <div :style="{ background: 'rgba(250, 250, 250, 1)', padding: '26px 16px 16px' }">
        <a-input-group compact>
          <a-select defaultValue="파일명">
            <a-select-option value="파일명">파일명</a-select-option>
            <a-select-option value="확장명">확장명</a-select-option>
            <a-select-option value="작성자">작성자</a-select-option>
          </a-select>
          <a-input style="width: 70%"  defaultValue="입력하세요." />
        </a-input-group>
        <br />
    <div class="btn-group">
      <a-button class="btn" type="primary" ghost>검색</a-button>
      <a-button class="btn" type="danger" ghost>초기화</a-button>
    </div>
  </div>
  </div>
  
  <br />
  <br />

    <div>
  <a-row type="flex">
       <a-col :span="8" class="title">결재현황</a-col>
  </a-row>
    <br />
    <br />
    <div class="a-card" >
      <a-row  :gutter="16">
        <a-col :span="12">
         <router-link to="/approvalState" class="nav-link">
           <a-card  title="상신함"  :bordered=true>
            <p>0건</p>
          </a-card>
          </router-link>
        </a-col>
        <a-col :span="12">
           <router-link to="/approvalState" class="nav-link">
          <a-card   title="결재함" :bordered=true>
            <p>0건</p>
          </a-card> 
        </router-link>
        </a-col>
      </a-row>
    </div>
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
<style>
.title{
 font-size: 25px;

}
.btn-group{
  margin: 10px;
  text-align: center;
}

.btn{
  margin: 10px;
  text-align: center;
}
.ant-card-head{
  background-color: #bae7ff;
  padding: 20px;
  font-weight:500; 
  text-align: center;
  font-size: 35px;
}
.ant-card-body{
  text-align: center;
  font-weight:600; 
  font-size: 30px;
}
</style>
 