<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column label="文章Id" align="center">
        <template slot-scope="scope">
          {{ scope.row.article_id }}
        </template>
      </el-table-column>
      <el-table-column label="标题" width="150" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.articleUrl" target="_blank" v-text="scope.row.title"></a>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="200" align="center">
        <template slot-scope="scope">
          <p v-text="scope.row.createTimeStr"></p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="pushArticle(scope.row)">推送</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @current-change="handleSelectPage" background layout="total, prev, pager, next" :total="articleDataTotal" :page-size="20">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getHandList } from '@/api/handArticle';
import { dateFormat } from '@/utils/index.js';

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        pageNo: 1
      },
      articleDataTotal: null
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleSelectPage(val) {
      this.listQuery.pageNo = val;
      this.fetchData();
    },
    fetchData() {
      this.listLoading = true;
      getHandList(this.listQuery).then(response => {
        console.log(response);
        response.result.items.forEach(value => {
          value.createTimeStr = dateFormat(new Date(value.create_time), 'yyyy-MM-dd hh:mm:ss');
          value.articleUrl = 'http://content.yungaoad.net/xwz_article/article_taoweilai_web2.html?id=' + value.article_id + '&push=1';
        });
        this.list = response.result.items;
        this.articleDataTotal = response.result.count;
        this.listLoading = false;
      });
    },
    pushArticle(item) {
      this.$store.commit('SET_PUSH_ARTICLE', item);
      this.$store.commit('SET_PUSH_SOURCE', 'handleClickPush');
      this.$router.push({ path: '/pushForm/index' });
    }
  }
};
</script>
