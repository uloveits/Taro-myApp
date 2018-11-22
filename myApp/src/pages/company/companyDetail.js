import Taro, { Component, Config } from '@tarojs/taro'
import {View,Image,Text,RichText} from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'

import * as companyApi from '../../apis/company/service';
import * as CommonFnc from  '../../utils/commonFnc'
import { JOB } from  '../../constants'

import './companyDetail.scss'

export default class CompanyDetail extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '企业详情',
  };

  constructor() {
    super();
    this.state = {
      current:0,
      companyId : '',
      company_logo : '',
      bus_name  : '',
      bus_phone:'',
      address:'',
      email:'',
      /*企业描述*/
      des:'',
      jobDataList:[]
    }
  }

  componentWillMount () {
    console.log(this.$router.params)
    this.setState({
      companyId:this.$router.params.id,
    })
  }

  componentDidMount () {
    this.getCompanyDetailInfo(this.state.companyId);
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  //获取公司详情的信息
  async getCompanyDetailInfo(id) {
    console.log(id);
    console.log('*************getCompanyDetaiInfo_start');
    const res = await companyApi.getCompanyDetailInfo({
      id: id
    });
    console.log('公司详情信息');
    console.log(res.data);
    if (res.status == 1) {
      this.setState({
        company_logo:res.data.logo,
        bus_name:res.data.bus_name,
        bus_phone:res.data.bus_phone,
        address:res.data.address,
        email:res.data.email,
        des:res.data.des,
        jobDataList:res.data.jobs,
      })
    }
  }

  //切换Tab
  handleClick (value) {
    this.setState({
      current: value
    })
  }

  render () {
    const { jobDataList } = this.state;
    /*所有职位*/
    const jobAllConst = jobDataList.map((jobData, index) => (
      <View className='listBoardCss' key={index}>
        <View className='at-row'>
          <View className='at-col at-col-12'>
            <Text>{jobData.job_name}</Text>
          </View>
        </View>
        <View className='at-row marginTop15'>
          <View className='at-col at-col-12 fontSize22'>
            <Text>月薪：</Text><Text>{CommonFnc.getConstantValue(JOB.SALARY,jobData.job_salary)}</Text>
            <Text className='paddingLeft15'>经验：</Text><Text>{CommonFnc.getConstantValue(JOB.SEN,jobData.job_sen)}</Text>
            <Text className='paddingLeft15'>最低学历：</Text><Text>{CommonFnc.getConstantValue(JOB.EDUCATE,jobData.job_educate)}</Text>
          </View>
        </View>
      </View>
    ));
    /*一般职位*/
    const jobLowConst = jobDataList.map((jobData, index) => (
      jobData.job_level == '1'
        ?<View className='listBoardCss' key={index}>
          <View className='at-row'>
            <View className='at-col at-col-12'>
              <Text>{jobData.job_name}</Text>
            </View>
          </View>
          <View className='at-row marginTop15'>
            <View className='at-col at-col-12 fontSize22'>
              <Text>月薪：</Text><Text>{CommonFnc.getConstantValue(JOB.SALARY,jobData.job_salary)}</Text>
              <Text className='paddingLeft15'>经验：</Text><Text>{CommonFnc.getConstantValue(JOB.SEN,jobData.job_sen)}</Text>
              <Text className='paddingLeft15'>最低学历：</Text><Text>{CommonFnc.getConstantValue(JOB.EDUCATE,jobData.job_educate)}</Text>
            </View>
          </View>
        </View>
        :''
    ));
    /*中级职位*/
    const jobMiddleConst = jobDataList.map((jobData, index) => (
      jobData.job_level == '2'
        ?<View className='listBoardCss' key={index}>
          <View className='at-row'>
            <View className='at-col at-col-12'>
              <Text>{jobData.job_name}</Text>
            </View>
          </View>
          <View className='at-row marginTop15'>
            <View className='at-col at-col-12 fontSize22'>
              <Text>月薪：</Text><Text>{CommonFnc.getConstantValue(JOB.SALARY,jobData.job_salary)}</Text>
              <Text className='paddingLeft15'>经验：</Text><Text>{CommonFnc.getConstantValue(JOB.SEN,jobData.job_sen)}</Text>
              <Text className='paddingLeft15'>最低学历：</Text><Text>{CommonFnc.getConstantValue(JOB.EDUCATE,jobData.job_educate)}</Text>
            </View>
          </View>
        </View>
        :''
    ));
    /*高级职位*/
    const jobHighConst = jobDataList.map((jobData, index) => (
      jobData.job_level == '3'
        ?<View className='listBoardCss' key={index}>
          <View className='at-row'>
            <View className='at-col at-col-12'>
              <Text>{jobData.job_name}</Text>
            </View>
          </View>
          <View className='at-row marginTop15'>
            <View className='at-col at-col-12 fontSize22'>
              <Text>月薪：</Text><Text>{CommonFnc.getConstantValue(JOB.SALARY,jobData.job_salary)}</Text>
              <Text className='paddingLeft15'>经验：</Text><Text>{CommonFnc.getConstantValue(JOB.SEN,jobData.job_sen)}</Text>
              <Text className='paddingLeft15'>最低学历：</Text><Text>{CommonFnc.getConstantValue(JOB.EDUCATE,jobData.job_educate)}</Text>
            </View>
          </View>
        </View>
        :''
    ));
    return (
      <View className='companyDetail-page'>
        {/*企业LOGO，名称等信息*/}
        <View className='at-row'>
          <View className='at-col at-col-5'>
            <Image style='width: 100%;height: 90px;border:' src={this.state.company_logo}/>
          </View>
          <View className='at-col at-col__offset-1 at-col-6'>
            <View className='marginTop20'>
              <Text className='titleName'>{this.state.bus_name}</Text>
            </View>
            <View className='marginTop15'>
              <Text className='titleName fontSize22'>电话：</Text>
              <Text className='fontSize22'>{this.state.bus_phone}</Text>
            </View>
            <View className='marginTop15'>
              <Text className='titleName fontSize22'>邮箱：</Text>
              <Text className='fontSize22'>{this.state.email}</Text>
            </View>
          </View>
        </View>
        <View>
          <RichText className='fontSize22' nodes={this.state.des} />
        </View>
        <View>
          <AtTabs
            current={this.state.current}
            scroll
            swipeable
            tabList={[
              { title: '全部' },
              { title: '一般职位' },
              { title: '中级职位' },
              { title: '高级职位' }
            ]}
            className='atTabsCss'
            onClick={this.handleClick.bind(this)}>
            <AtTabsPane current={this.state.current} index={0}>
              <View>{jobAllConst}</View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={1}>
              <View>{jobLowConst}</View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={2}>
              <View>{jobMiddleConst}</View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={3}>
              <View>{jobHighConst}</View>
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    )
  }
}

