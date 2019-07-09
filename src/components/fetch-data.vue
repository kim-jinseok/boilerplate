<template>
  <div>
    <h1>Weather forecast</h1>
    <p>This component demonstrates fetching data from the server.</p>
    <div v-if="!categorys" class="text-center">
      <p><em>Loading...</em></p>
      <h1></h1>
    </div>
    <template v-if="categorys">
      <table class="table" id="dvCategory">
        <thead class="dark-bg text-white">
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="index % 2 == 0 ? 'bg-white' : 'bg-light'" v-for="(v, index) in categorys" :key="index">
            <td>{{ v.category_id }}</td>
            <td>{{ v.parent_id }}</td>
            <td>{{ v.category_name }}</td>
            <td>{{ v.category_area }}</td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="...">
        <ul class="pagination justify-content-center">
          <li :class="'page-item' + (currentPage == 1 ? ' disabled' : '')">
            <a class="page-link" href="#" tabindex="-1" @click="loadPage(currentPage - 1)">Previous</a>
          </li>
          <li :class="'page-item' + (n == currentPage ? ' active' : '')" v-for="(n, index) in totalPages" :key="index">
            <a class="page-link" href="#" @click="loadPage(n)">{{n}}</a>
          </li>
          <li :class="'page-item' + (currentPage < totalPages ? '' : ' disabled')">
            <a class="page-link" href="#" @click="loadPage(currentPage + 1)">Next</a>
          </li>
        </ul>
      </nav>
      <div>{{ stringWillFormatted | uppercase }}</div>
      <div>{{ stringWillFormatted | lowercase }}</div>
      <div>{{ stringWillFormatted | capitalize }}</div>
      <div>{{ stringWillFormatted | titlecase }}</div>
      <div>{{ stringWillFormatted | slug }}</div>
      <div>{{ stringWillFormatted | truncate(10) }}</div>
      <div>{{ stringWillFormatted | cut(10) }}</div>
      <div>{{ stringWillFormatted | remove('stringToRemove') }}</div>
      <div>{{ stringWillFormatted | remove_first('stringToRemove') }}</div>
      <div>{{ stringWillFormatted | replace('stringToReplace') }}</div>
      <div>{{ stringWillFormatted | replace_first('stringToReplace') }}</div>
      <div>{{ stringWillFormatted | append('stringToAppend') }}</div>
      <div>{{ stringWillFormatted | append('stringToAppend') }}</div>
      <div>{{ date |  dateFormat('YYYY.MM.DD')}}</div>
    </template>
    <button type="button" class="btn btn-secondary" @click="resetCounter()">Reset</button>
  </div>
</template>
<script>

  export default {
    computed: {
      totalPages: function () {
        return Math.ceil(this.total / this.pageSize)
      }
    },
    data() {
      return {
        forecasts: null,
        categorys: null,
        total: 0,
        pageSize: 5,
        currentPage: 1,
        stringWillFormatted: 'asdfasdfasdfasdfadsf',
        date : new Date()
      }
    },
    methods: {
      async loadPage(page) {

        /// ES2017 async/await syntax via babel-plugin-transform-async-to-generator
        /// TypeScript can also transpile async/await down to ES5
        /// TypeScript can also transpile async/await down to ES5
        this.currentPage = page

        try {
          var param = {
            user_id: 'admin'
          }
          /// 바로 데이터를 받아와서 하려면 async, await를 사용해야함
          const data = await helper.getJSON("category_get", param);
          this.categorys = data;
        /// async, await를 사용하지 않으려면 callback으로 작업
        /// helper.getJSON("category_get", param,  (result) => {
        ///  this.categorys = result.data;
        /// helper.renderHelper("dvCategory", null, true);
        /// });
        } catch (err) {
          window.alert(err)
        }
      },
      resetCounter: function () {
        this.setCounter({ counter: 0 })
      }
    },
    async created() {
      await this.loadPage(1)
    }
  }
</script>
<style>

</style>
