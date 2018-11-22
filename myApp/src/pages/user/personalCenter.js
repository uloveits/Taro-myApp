import Taro, { Component, Config } from '@tarojs/taro'
import {View,Text,Image} from '@tarojs/components'
import { AtAvatar ,AtButton,AtModal,AtIcon,AtListItem} from 'taro-ui'
import defalutAvatar from '../../images/user/user.png'
import aboutImg from '../../images/user/about.png'
import keepImg from '../../images/user/keep.png'
import applyImg from '../../images/user/apply.png'
import { connect } from '@tarojs/redux'
import { setBasicInfo } from '../../actions/index'
import './personalCenter.scss'

//数据流管理Redux
@connect(({ common }) => ({
  common
}), (dispatch) => ({
  setBasicInfo (param) {
    dispatch(setBasicInfo(param))
  }
}))

export default class PersonalCenter extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '我',
  };

  constructor() {
    super();
    this.state={
      isOpened:false,
    }

  }

  componentWillMount () {
    let rst = Taro.getStorageSync('userInfo');
    this.props.setBasicInfo(rst)

  }

  componentDidMount () {

  }
  componentWillUnmount () {}

  componentDidShow () { }

  componentDidHide () { }

  //去登陆页面
  gotoLogin = () => {
    Taro.navigateTo({
      url: `/pages/login/login`
    })
  };
  logout = () => {
    this.setState({
      isOpened:true
    })
  };
  handleCancel = () => {
    this.setState({isOpened:false})
  };
  handleConfirm = () => {
    console.log('handleConfirm');
    this.props.setBasicInfo('') //将用户信息存入redux
    Taro.removeStorageSync('userInfo')
    this.setState({isOpened:false})
  };

  render () {
    const { basicInfo } = this.props.common;

    const { isOpened } = this.state;
    return (
      <View className='personalCenter-page'>
        {/*个人登陆信息*/}

          <View className='avatarContent'>
            {
              basicInfo.avatarUrl
                ? <AtAvatar circle image={basicInfo.avatarUrl}></AtAvatar>
                : <AtAvatar circle image={defalutAvatar}></AtAvatar>
            }
          </View>

        <View style='padding:0 30px;margin-top:50px;'>
          <View className='borderCss'>
            <View className='at-row at-row__justify--center marginTop15'>
              <View className='at-col at-col-4 textCenter'>
                {
                  basicInfo.nickName
                    ? <Text className='text_nickName'>{basicInfo.nickName}</Text>
                    : <Text className='text_login' onClick={this.gotoLogin}>现在登录</Text>
                }
              </View>
            </View>
            <View className='at-row at-row__justify--center marginTop20'>
              <View className='at-col at-col-4 textCenter'>
                <Text className='text_my'><AtIcon prefixClass='fa' value='clock' size='30' color='#F00'></AtIcon>个人中心</Text>
              </View>
            </View>
          </View>
        </View>
        <View style='padding:0 20px;margin-top:50px;'>
          <AtListItem title='收藏的职位' arrow='right' thumb={keepImg} />
          <AtListItem title='投递的职位' arrow='right' thumb={applyImg}/>
          <AtListItem title='关于' arrow='right' thumb={aboutImg} />
        </View>
        <View className='at-row at-row__justify--center marginTop40'>
          <View className='at-col at-col-10 textCenter'>
            {
              basicInfo.nickName
                ?  <View className='logout-btn'>
                  <AtButton onClick={this.logout}>退出账号</AtButton>
                </View>
                : null
            }
          </View>
        </View>
        <View className='logout-model'>
          <AtModal
            isOpened={isOpened}
            title='确定退出？'
            cancelText='取消'
            confirmText='确认'
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
            content='退出登录后有些功能将无法使用，重新登录即可查看'
          />
        </View>
      </View>
    )
  }
}

