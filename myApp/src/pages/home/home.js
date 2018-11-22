import Taro, { Component, Config } from '@tarojs/taro'
import {View, Swiper, SwiperItem ,Image} from '@tarojs/components'
import { AtAccordion,AtList,AtListItem} from 'taro-ui'
import { AtIcon } from 'taro-ui'
import * as homeApi from '../../apis/home/service';
import * as CommonFnc from  '../../utils/commonFnc'
import { JOB } from  '../../constants'

import './home.scss'

import banner1 from '../../images/home/banner1.jpg'
import banner2 from '../../images/home/banner2.jpg'
import banner3 from '../../images/home/banner3.jpg'

export default class Home extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页',
  };

  constructor() {
    super();
    this.state = {
      companyLogo:'',
      //推荐V企
      companyInfoList:[],

      jobInfoList:[],
      dayComInfoList:[],
      weekComInfoList:[],
      monthComInfoList:[],
      //标题是否展开或者折叠查看更多
      isExpand_c:true,
      isExpand_j:true,
      isExpand_d:true,
      isExpand_w:true,
      isExpand_m:true,
    };
  }

  componentWillMount () {
    console.log('*************componentWillMount_start');
    //this.getHomeInfo();
  }

  componentDidMount () {
    console.log('*************componentDidMount_start');
    this.getHomeInfo();
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  //获取首页所有的信息
  async getHomeInfo() {
    console.log('*************getHomeInfo_start');
    const res = await homeApi.getHomeInfo();
    console.log('首页所有信息详情');
    console.log(res.data);
    if (res.status == 1) {
      this.setState({
        companyInfoList: res.data.v_bus,
        jobInfoList: res.data.v_job,
        dayComInfoList: res.data.is_day_recomm,
        weekComInfoList: res.data.is_week_recomm,
        monthComInfoList: res.data.is_mouth_recomm,
      })
    }
  }

  //展开折叠按钮点击时间
  toExpand(type) {
    switch (type) {
      case 'companyInfo':
        this.setState({
          isExpand_c:!this.state.isExpand_c
        });
        break;
      case 'jobInfo':
        this.setState({
          isExpand_j:!this.state.isExpand_j
        });
        break;
      case 'dayInfo':
        this.setState({
          isExpand_d:!this.state.isExpand_d
        });
        break;
      case 'weekInfo':
        this.setState({
          isExpand_w:!this.state.isExpand_w
        });
        break;
      case 'monthInfo':
        this.setState({
          isExpand_m:!this.state.isExpand_m
        });
        break;
    }
  }
  //去往详情页
  gotoCompanyDetail(id) {
    console.log(id);
    // 跳转页面并传入参数 id
    Taro.navigateTo({
      url: `/pages/company/companyDetail?id=${id}`
    })
  }


  render () {
    console.log('============render_start');
    const { companyInfoList, jobInfoList, dayComInfoList, weekComInfoList, monthComInfoList } = this.state;
    /*推荐V企*/
    const companyInfoConst = companyInfoList.map((companyInfo, index) => (
      <AtListItem
        onClick={this.gotoCompanyDetail.bind(this,companyInfo.id)}
        key={index}
        title={companyInfo.bus_name}
        arrow='right'
        thumb={companyInfo.logo}
      />
    ));
    /*推荐V职*/
/*    const jobInfoConst = jobInfoList.map((jobInfo, index) => (
      <AtCard
        key={index}
        title={CommonFnc.getConstantValue(JOB.TYPE,jobInfo[0].job_type)}
      >
        这也是内容区 可以随意定义功能
      </AtCard>
    ));*/
    /*今日推荐*/
    const dayInfoConst = dayComInfoList.map((dayInfo, index) => (
      <AtListItem
        onClick={this.gotoCompanyDetail.bind(this,dayInfo.id)}
        key={index}
        title={dayInfo.bus_name}
        arrow='right'
        thumb={dayInfo.logo}
      />
    ));
    /*本周推荐*/
    const weekInfoConst = weekComInfoList.map((weekInfo, index) => (
      <AtListItem
        onClick={this.gotoCompanyDetail.bind(this,weekInfo.id)}
        key={index}
        title={weekInfo.bus_name}
        arrow='right'
        thumb={weekInfo.logo}
      />
    ));
    /*本月推荐*/
    const monthInfoConst = monthComInfoList.map((monthInfo, index) => (
      <AtListItem
        onClick={this.gotoCompanyDetail.bind(this,monthInfo.id)}
        key={index}
        title={monthInfo.bus_name}
        arrow='right'
        thumb={monthInfo.logo}
      />
    ));
    return (
      <View className='home-page'>
        {/*轮播图*/}
        <View>
          <Swiper
            className='banner'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            vertical={false}
            interval={3000}
            circular
            indicatorDots
            autoplay
          >
            <SwiperItem>
              <Image className='banner1' src={banner1} />
            </SwiperItem>
            <SwiperItem>
              <Image className='banner2' src={banner2} />
            </SwiperItem>
            <SwiperItem>
              <Image className='banner3' src={banner3} />
            </SwiperItem>
          </Swiper>
        </View>

        {/*推荐V企*/}
        <View className='at-row common-title'>
          <View className='at-col at-col-10'>
            <Text className="text">推荐V企</Text>
          </View>
          <View className='at-col at-col-2 textCenter' onClick={this.toExpand.bind(this,'companyInfo')}>
            {
              this.state.isExpand_c
                ? <AtIcon value='chevron-up' size='24' color='#37383a'></AtIcon>
                : <AtIcon value='chevron-down' size='24' color='#37383a'></AtIcon>
            }

          </View>
        </View>
        <View>
          <AtList hasBorder={false} className='atList'>
          {
            this.state.isExpand_c
              ? companyInfoConst
              : ''
          }
          </AtList>
        </View>

        {/*推荐V职*/}
        <View className='at-row common-title'>
          <View className='at-col at-col-10'>
            <Text className="text">推荐V职</Text>
          </View>
          <View className='at-col at-col-2 textCenter' onClick={this.toExpand.bind(this,'jobInfo')}>
            {
              this.state.isExpand_j
                ? <AtIcon value='chevron-up' size='24' color='#37383a'></AtIcon>
                : <AtIcon value='chevron-down' size='24' color='#37383a'></AtIcon>
            }

          </View>
        </View>

        {/*今日推荐*/}
        <View className='at-row common-title'>
          <View className='at-col at-col-10'>
            <Text className="text">今日推荐</Text>
          </View>
          <View className='at-col at-col-2 textCenter' onClick={this.toExpand.bind(this,'dayInfo')}>
            {
              this.state.isExpand_d
                ? <AtIcon value='chevron-up' size='24' color='#37383a'></AtIcon>
                : <AtIcon value='chevron-down' size='24' color='#37383a'></AtIcon>
            }

          </View>
        </View>
        <View>
          <AtList hasBorder={false} className='atList'>
            {
              this.state.isExpand_d
                ? dayInfoConst
                : ''
            }
          </AtList>
        </View>

        {/*本周推荐*/}
        <View className='at-row common-title'>
          <View className='at-col at-col-10'>
            <Text className="text">本周推荐</Text>
          </View>
          <View className='at-col at-col-2 textCenter' onClick={this.toExpand.bind(this,'weekInfo')}>
            {
              this.state.isExpand_w
                ? <AtIcon value='chevron-up' size='24' color='#37383a'></AtIcon>
                : <AtIcon value='chevron-down' size='24' color='#37383a'></AtIcon>
            }

          </View>
        </View>
        <View>
          <AtList hasBorder={false} className='atList'>
            {
              this.state.isExpand_w
                ? weekInfoConst
                : ''
            }
          </AtList>
        </View>

        {/*本月推荐*/}
        <View className='at-row common-title'>
          <View className='at-col at-col-10'>
            <Text className="text">本月推荐</Text>
          </View>
          <View className='at-col at-col-2 textCenter' onClick={this.toExpand.bind(this,'monthInfo')}>
            {
              this.state.isExpand_m
                ? <AtIcon value='chevron-up' size='24' color='#37383a'></AtIcon>
                : <AtIcon value='chevron-down' size='24' color='#37383a'></AtIcon>
            }

          </View>
        </View>
        <View>
          <AtList hasBorder={false} className='atList'>
            {
              this.state.isExpand_m
                ? monthInfoConst
                : ''
            }
          </AtList>
        </View>
      </View>
    )
  }
}

