<template>
  <div class="app-container">
    <el-form ref="pushForm" :rules="rules" :model="pushParams" label-width="120px">
      <el-form-item label="推送产品">
        <el-select v-model="pushParams.project" placeholder="请选择要推送的产品">
          <el-option value="newsearn" label="淘新闻"></el-option>
          <el-option value="locker" label="锁屏"></el-option>
          <el-option value="browser" label="浏览器"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="推送标题" prop="title">
        <el-col :sm="24" :md="11">
          <el-input placeholder="请填写推送标题" v-model="pushParams.title" />
        </el-col>
      </el-form-item>
      <el-form-item label="推送内容" prop="content">
        <el-col :sm="24" :md="11">
          <el-input type="textarea" rows="5" maxlength="60" v-model="pushParams.content" placeholder="请输入推送内容（60字）"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="消息类型">
        <el-radio-group v-model="pushParams.type">
          <el-radio :label="1" name="type">文章</el-radio>
          <el-radio :label="100" name="type">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户过滤条件">
        <el-radio-group v-model="pushParams.dimension">
          <el-radio name="target" :label="0">全部用户</el-radio>
          <el-radio name="target" :label="1">userId尾号</el-radio>
          <el-radio name="target" :label="2">版本号</el-radio>
          <el-radio name="target" :label="6">指定id</el-radio>
          <el-radio name="target" :label="7" v-if="pushParams.project == 'newsearn'">特殊奖励</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="userId尾号" v-show="pushParams.dimension == 1">
        <el-select v-model="targetVal.targetId" placeholder="请选择活动区域">
          <el-option value="0" label="0"></el-option>
          <el-option value="1" label="1"></el-option>
          <el-option value="2" label="2"></el-option>
          <el-option value="3" label="3"></el-option>
          <el-option value="4" label="4"></el-option>
          <el-option value="5" label="5"></el-option>
          <el-option value="6" label="6"></el-option>
          <el-option value="7" label="7"></el-option>
          <el-option value="8" label="8"></el-option>
          <el-option value="9" label="9"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="推送版本号" v-show="pushParams.dimension == 2">
        <el-col :sm="24" :md="11">
          <el-input type="textarea" rows="5" v-model="targetVal.targetVersion" placeholder="请严格按照格式输入(版本区间用中划线，两个区间之间用英文逗号分隔):2.5.1-2.6.1,2.6.2-2.6.5"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="指定id" v-show="pushParams.dimension == 6">
        <el-col :sm="24" :md="11">
          <el-input type="textarea" rows="5" v-model="targetVal.assignId" placeholder="请输入推送指定id"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="消息链接" v-if="pushParams.project != 'locker'">
        <el-col :sm="24" :md="18">
          <el-input v-model="pushParams.url" placeholder="请填写消息链接" />
        </el-col>
      </el-form-item>
      <el-form-item label="点击后续操作" v-if="pushParams.project == 'locker'">
        <el-row v-for="(item, index) of customizeKey" :key="index" class="margin-bottom">
          <el-col :xs="15" :sm="8" :md="6" :lg="5">
            <el-col :span="20">
              <el-input v-model="customizeKey[index]" placeholder="key" />
            </el-col>
            <el-col class="line" :span="4"> ：</el-col>
          </el-col>
          <el-col :xs="24" :sm="16" :md="12" :lg="10">
            <el-col :span="12">
              <el-input v-model="customizeValue[index]" placeholder="value" />
            </el-col>
            <el-col :span="8" :xs="24" :offset="1">
              <el-button type="primary" size="small" @click="addKeyValueItem">+</el-button>
              <el-button type="danger" size="small" v-if="index != 0" @click="removeKeyValue(index)">-</el-button>
            </el-col>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="pushId" prop="pushID">
        <el-col :sm="24" :md="11">
          <el-input v-model="pushParams.pushID" placeholder="请填写pushId" />
        </el-col>
      </el-form-item>
      <el-form-item label="文章Id" v-if="pushParams.project == 'newsearn'">
        <el-col :sm="24" :md="11">
          <el-input v-model="pushParams.article_id" placeholder="请填写文章Id" />
        </el-col>
      </el-form-item>
      <el-form-item label="推送时间">
        <el-radio-group v-model="pushArticleType" @change="handleArticleType">
          <el-radio name="sendTimeStr" :label="0">立即推送</el-radio>
          <el-radio name="sendTimeStr" :label="1">定时推送</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动时间" v-show="pushArticleType == 1">
        <el-col :sm="24" :md="11">
          <el-date-picker v-model="pushParams.timestamp" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions">
          </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('pushForm')">推送</el-button>
        <el-button @click="onCancel('pushForm')">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { pushMsg, getPushId } from '@/api/push';
import { dateFormat } from '@/utils/index.js';
export default {
  data() {
    return {
      pushParams: {
        project: 'newsearn',
        title: '',
        content: '',
        type: 100,
        pushID: '',
        article_id: '',
        url: '',
        timestamp: 0,
        dimension: 0,
        target: ''
      },
      // 锁屏和浏览器 key-value 形式参数
      customizeKey: [''],
      customizeValue: [''],
      // 重置参数
      resetPushParams: {
        project: 'newsearn',
        title: '',
        content: '',
        type: 100,
        pushID: '',
        article_id: '',
        url: '',
        timestamp: 0,
        dimension: 0,
        target: ''
      },
      rules: {
        title: [{ required: true, message: '请输入推送标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入推送内容', trigger: 'blur' }, { min: 3, max: 60, message: '长度在 3 到 60 个汉字', trigger: 'blur' }],
        pushID: [{ required: true, message: '请输入pushId', trigger: 'blur' }]
      },
      // 推送过滤条件
      targetVal: {
        targetId: 0,
        targetVersion: '',
        assignId: ''
      },
      // 推送类型 0:立即推送,1:定时推送
      pushArticleType: 0,
      // 限定推送时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    };
  },
  computed: {
    pushSource() {
      return this.$store.getters.pushSource;
    },
    pushArticle() {
      return this.$store.getters.pushArticle;
    }
  },
  created() {
    getPushId({}).then(response => {
      this.pushParams.pushID = response.result;
    });
    // 如果是从淘新闻手采库来的文章，可以直接对文章链接，文章id进行赋值
    if (this.pushSource == 'handleClickPush') {
      this.pushParams.article_id = this.pushArticle.article_id;
      this.pushParams.url = this.pushArticle.articleUrl;
      this.pushParams.title = this.pushArticle.title;
      this.pushParams.type = 1;
    }
  },
  methods: {
    onSubmit(formName) {
      // 填写的内容校验
      this.$refs[formName].validate(valid => {
        if (valid) {
          switch (this.pushParams.dimension) {
            case 1:
              this.pushParams.target = this.targetVal.targetId;
              break;
            case 2:
              this.pushParams.target = this.targetVal.targetVersion;
              break;
            case 6:
              this.pushParams.target = this.targetVal.assignId;
              break;
            default:
              this.pushParams.target = '';
              break;
          }
          if (this.pushParams.project == 'locker') {
            this.customizeKey.forEach((value, index) => {
              this.pushParams[value] = this.customizeValue[index];
            });
          }
          // 校验通过
          pushMsg(this.pushParams).then(response => {
            if (response.code === 200) {
              this.$message({
                message: '推送成功!',
                type: 'success'
              });
              // 给当前操作的产品赋值
              this.$store.commit('SET_PUSH_PROJECT', this.pushParams.project);
              let path = this.pushArticleType == 1 ? '/pushManagement/index' : '/pushHistory/index';
              this.$router.push({ path });
              this.resetParams();
            }
          });
        } else {
          // 校验失败
          return false;
        }
      });
    },
    // 添加锁屏自定义字段
    addKeyValueItem() {
      this.customizeKey.push('');
      this.customizeValue.push('');
    },
    // 删除锁屏新定义字段
    removeKeyValue(index) {
      this.customizeKey.splice(index, 1);
      this.customizeValue.splice(index, 1);
    },
    onCancel(formName) {
      // 清空推送内容
      this.$message({
        message: '取消推送!',
        type: 'warning'
      });
      this.resetParams();
    },
    // 清空推送对象
    resetParams() {
      this.pushArticleType = 0;
      Object.assign(this.pushParams, this.resetPushParams);
      this.$store.commit('SET_PUSH_ARTICLE', {});
      this.$store.commit('SET_PUSH_SOURCE', '');
      // 清空自定义字段
      if (this.pushParams.project == 'locker') {
        this.customizeKey = [''];
        this.customizeValue = [''];
      }
    },
    // 切换推送时间类型，重置push参数的时间字段
    handleArticleType() {
      this.pushParams.timestamp = this.pushArticleType == 1 ? dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss') : 0;
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

