import Taro, { Component, Config } from '@tarojs/taro'
import {View,Text,Image} from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'

import { connect } from '@tarojs/redux'
import './login.scss'


import { setBasicInfo } from '../../actions/index'

//数据流管理Redux
@connect(({ common }) => ({
  common
}), (dispatch) => ({
  setBasicInfo (param) {
    dispatch(setBasicInfo(param))
  }
}))

export default class Login extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '登陆',
  };
  static defaultProps = {

  };
  constructor() {
    super();
    this.state={
      userName:'',
      password:'',
    }

  }

  componentWillMount () { }

  componentDidMount () { }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  //微信登录
  getUserInfo = (userInfo) => {
    if (userInfo.detail.userInfo) {   //同意
      this.props.setBasicInfo(userInfo.detail.userInfo) //将用户信息存入redux
      Taro.setStorageSync('userInfo', userInfo.detail.userInfo);//将用户信息存入缓存中
      if (Taro.getStorageSync('userInfo')) {
        Taro.switchTab({
          url: '/pages/user/personalCenter'
        })
      }
    }
  }

  handleChange = (type,value) => {
    console.log(type);
    console.log(value);
  };
  login = () => {

  };


  render () {
    return (
      <View className='login-page'>
        <View className="title">您好，请登录!!</View>
        <View className='at-row at-row__justify--center marginTop20'>
          <View className='at-col at-col-10'>
            <AtInput
              name='userName'
              type='text'
              placeholder='请输入用户名'
              value={this.state.userName}
              onChange={this.handleChange.bind(this,'userName')}
            />
          </View>

        </View>
        <View className='at-row at-row__justify--center marginTop15'>
          <View className='at-col at-col-10'>
            <AtInput
              name='password'
              type='password'
              placeholder='请输入密码'
              value={this.state.password}
              onChange={this.handleChange.bind(this,'password')}
            />
          </View>
        </View>
        <View className='at-row at-row__justify--center marginTop20'>
          <View className='at-col at-col-10'>
            <AtButton type='primary'>登录</AtButton>
          </View>
        </View>
        <View className='at-row at-row__justify--center marginTop15'>
          <View className='at-col at-col-10'>
            <AtButton type='secondary'  open-type='getUserInfo' onGetUserInfo={this.getUserInfo}>微信快捷登陆</AtButton>
          </View>
        </View>
      </View>
    )
  }
}

