const article = {
  state: {
    pushArticle: {},
    // handleClickPush 为点击手选库的推送按钮快捷推送，空为正常填写推送
    pushSource: '',
    // 具体推送的哪个产品
    curPushProject: 'newsearn'
  },
  mutations: {
    SET_PUSH_ARTICLE: (state, article) => {
      state.pushArticle = article;
    },
    SET_PUSH_SOURCE: (state, source) => {
      state.pushSource = source;
    },
    SET_PUSH_PROJECT: (state, project) => {
      state.curPushProject = project;
    }
  },
  actions: {}
};

export default article;
