import { login } from '../../services';

export default {
  namespace: 'home',
  state: {
    record: 100,
    current: 0,
    isLogined: false,
    message: ''
  },
  effects: {
    *addThenMinus(action, { call, put }) {
      yield put({ type: 'add' });
      yield delay(1000);
      yield put({ type: 'minus' });
    },
    *login({ payload }, { call, put }) {
      const res = yield login(payload);
      yield put({ type: 'loginStatus', res });
    }
  },

  reducers: {
    add(state) {
      const newCurrent = state.current + 1;
      return {
        ...state,
        record: newCurrent > state.record ? newCurrent : state.record,
        current: newCurrent,
      };
    },
    minus(state) {
      return { ...state, current: state.current - 1 };
    },
    loginStatus(state, { res }) {
      return {
        ...state,
        isLogined: !state.isLogined,
        current: Object.keys(res).length,
        message: res.message
      }
    }
  },

};


function delay(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}