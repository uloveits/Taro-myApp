import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import '@tarojs/async-await'

import configStore from './store'
import Index from './pages/home/home'

import './app.scss'

//引入这句话的目的是为了用弹性布局（flex）
if (process.env.TARO_ENV === "weapp") {
  require("taro-ui/dist/weapp/css/index.css")
} else if (process.env.TARO_ENV === "h5") {
  require("taro-ui/dist/h5/css/index.css")
}

const store = configStore();

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/home/home',
      'pages/company/companyDetail',
      'pages/job/jobList',
      'pages/resume/resumeList',
      'pages/user/personalCenter',
      'pages/login/login',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#37383a',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: '#fff'
    },
    tabBar: {
      list: [{
        pagePath: "pages/home/home",
        text: "首页",
        iconPath: "./images/tab/home.png",
        selectedIconPath: "./images/tab/home-active.png"
      }, {
        pagePath: "pages/job/jobList",
        text: "找工作",
        iconPath: "./images/tab/job.png",
        selectedIconPath: "./images/tab/job-active.png"
      }, {
        pagePath: "pages/resume/resumeList",
        text: "找简历",
        iconPath: "./images/tab/resume.png",
        selectedIconPath: "./images/tab/resume-active.png"
      },{
        pagePath: "pages/user/personalCenter",
        text: "我的",
        iconPath: "./images/tab/user.png",
        selectedIconPath: "./images/tab/user-active.png"
      }],
      color: '#1afa29',
      selectedColor: '#37383a',
      backgroundColor: '#fff',
      borderStyle: '#37383a'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
