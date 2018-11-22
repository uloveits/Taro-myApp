import { BASICINFO } from '../constants'

export const setBasicInfo = (param) => {
  console.log('setBasicInfo',param);
  return {
    type: BASICINFO,
    payload: param
  }
};

// 异步的 action
export function asyncSetBasicInfo (param) {
  return dispatch => {
    setTimeout(() => {
      dispatch(setBasicInfo(param))
    }, 2000)
  }
}

