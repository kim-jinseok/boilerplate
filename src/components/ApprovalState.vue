
<template>
  <div class="card-container">
    <a-tabs defaultActiveKey="2">
     <a-tab-pane key="1">
      <span slot="tab">
            상신
             <a-badge count="4" :numberStyle="{backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset'}" />
      </span>
          <div id="components-table-demo-size">
            <a-table :columns="columns" :dataSource="data" size="middle" />
        </div>
      </a-tab-pane>
      <a-tab-pane key="2">
         <span slot="tab">
                결재
            <a-badge count="4" :numberStyle="{backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset'}" />
      </span>
        <div id="components-table-demo-size">
            <a-table :columns="columns" :dataSource="data" size="middle" />
        </div>
      </a-tab-pane>
        <a-tab-pane key="3">
         <span slot="tab">
                배포
             <a-badge count="4" :numberStyle="{backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset'}" />
      </span>
        <div id="components-table-demo-size">
            <a-table :columns="columns" :dataSource="data" size="middle" />
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>

const columns = [{
  title: '배포제목',
  dataIndex: 'name',
  width :'50%'
}, {
  title: '요청자',
  dataIndex: 'age',
  width :'10%'
}, {
  title: '요청일',
  dataIndex: 'address',
  width :'20%',
  align : 'right'

}];

const data = [{
  key: '1',
  name: '배포1',
  age: '관리자',
  address: '2019-07-09',
}, {
  key: '2',
   name: '배포2',
  age: '관리자',
  address: '2019-07-09',
}, {
  key: '3',
  name: '배포3',
  age: '관리자',
  address: '2019-07-09',
}];

export default {

  data () {
    return {

        data,
      columns,
    }
  },
  methods: {
    callback (key) {
      console.log(key)
    },
  },
}
</script>
<style>
.card-container {
  background: #F5F5F5;
  overflow: hidden;
  padding: 24px;
}
.card-container > .ant-tabs-card > .ant-tabs-content {
  height: 120px;
  margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}
 .ant-tabs{
    height: -webkit-fill-available;
}

</style>
