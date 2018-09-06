<template>
  <div class="app-container">
    <el-row :gutter="20" class="margin-bottom">
      <el-col :xs="18" :sm="6" :lg="3">
        <el-select v-model="listQuery.project" placeholder="请选择要推送的产品">
          <el-option value="newsearn" label="淘新闻"></el-option>
          <el-option value="locker" label="锁屏"></el-option>
          <el-option value="browser" label="浏览器"></el-option>
        </el-select>
      </el-col>
      <el-col :xs="4" :sm="3" :lg="3">
        <el-button type="primary" @click="fetchData">查询</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column label="ID" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="标题" width="150" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank" v-text="scope.row.title"></a>
        </template>
      </el-table-column>
      <el-table-column label="内容" width="240" align="center">
        <template slot-scope="scope">
          {{scope.row.content}}
        </template>
      </el-table-column>
      <el-table-column label="文章Id" align="center">
        <template slot-scope="scope">
          <span v-text="scope.row.article_id == '' ? '-' : scope.row.article_id"></span>
        </template>
      </el-table-column>
      <el-table-column label="pushId" align="center">
        <template slot-scope="scope">
          <span v-text="scope.row.pushID == '' ? '-' : scope.row.pushID"></span>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <span v-text="scope.row.type == 1 ? '文章' : '其他'"></span>
        </template>
      </el-table-column>
      <el-table-column label="目标群体" width="200" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.dimension == 0" v-text="'全部用户'"></span>
          <span v-else-if="scope.row.dimension == 1" v-text="'尾号：' + scope.row.target"></span>
          <span v-else-if="scope.row.dimension == 2" v-text="'版本：' + scope.row.target"></span>
          <span v-else-if="scope.row.dimension == 6" v-text="'指定id：' + scope.row.target"></span>
          <span v-else-if="scope.row.dimension == 7" v-text="'特殊奖励推送'"></span>
        </template>
      </el-table-column>
      <el-table-column label="推送时间" width="200" align="center">
        <template slot-scope="scope">
          <p v-text="scope.row.createTimeStr"></p>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getHistoryList } from '@/api/pushHistory';
import { dateFormat } from '@/utils/index.js';

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        project: 'newsearn',
        paging: '',
        pageSize: 100
      }
    };
  },
  computed: {
    curPushProject() {
      return this.$store.getters.curPushProject;
    }
  },
  created() {
    this.fetchData();
    this.listQuery.project = this.curPushProject;
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getHistoryList(this.listQuery).then(response => {
        let msgList = response.data.msgJsonList.map(value => {
          value = JSON.parse(value);
          value.createTimeStr = dateFormat(new Date(value.timestamp*1), 'yyyy-MM-dd hh:mm:ss');
          return value;
        });
        console.log(msgList);
        this.list = msgList;
        this.listLoading = false;
      });
    }
  }
};
</script>
