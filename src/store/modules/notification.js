import mutations from "@/store/mutations";

const { SHOW_TOAST_NOTYFY } = mutations;

const notificationStore = {
  state: {
    messagePool: []
  },
  getters: {
    messagePool: ({messagePool}) => messagePool[messagePool.length - 1]
  },
  mutations: {
    [SHOW_TOAST_NOTYFY](state, msg) {
      state.messagePool.push(msg);
    }
  },
  actions: {
    shownotyfy({commit}, msg) {
      commit(SHOW_TOAST_NOTYFY, msg);
    }
  }
};

export default notificationStore;