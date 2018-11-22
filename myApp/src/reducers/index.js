import { combineReducers } from 'redux'
import { BASICINFO } from '../constants'

// 定义初始状态
const INITIAL_STATE = {
  basicInfo: {
    nickName: '',
    avatarUrl:''
  }

};

function common (state=INITIAL_STATE, action) {
  switch (action.type) {
    // 根据指令处理todos
    case BASICINFO:
      console.log('BASICINFO___',action)
      return {
        ...state,
        basicInfo: action.payload
      }
    default:
      return state
  }
}

export default combineReducers({
  common
})
