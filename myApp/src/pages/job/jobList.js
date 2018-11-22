import Taro, { Component, Config } from '@tarojs/taro'
import {View,Text} from '@tarojs/components'
import { AtSearchBar,AtPagination  } from 'taro-ui'

import * as jobApi from '../../apis/job/service';

import './jobList.scss'
import {JOB} from "../../constants";
import * as CommonFnc from "../../utils/commonFnc";

export default class JobList extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '找工作',
  };

  constructor() {
    super();
    this.state={
      total:0,
      pageSize:10,
      current:1,
      search_content:'',
      jobInfoList:[],

    }

  }

  componentWillMount () {
  }

  componentDidMount () {
    this.getJobInfoList(1)
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  //获取公司详情的信息
  async getJobInfoList(newPage) {
    const res = await jobApi.getJobInfoList({
      search_content : this.state.search_content,
      job_salary:'',
      job_prop:'',
      job_type:'',
      job_sen:'',
      job_city:'',
      order_type:'',
      page:newPage,
      size:10
    });
    console.log('职位列表详情信息');
    console.log(res.data);
    if (res.status == 1) {
      this.setState({
        total:parseInt(res.data.total),
        jobInfoList:res.data.data
      });
    }
  }
  //搜索栏的change事件
  onChange (value) {
    this.setState({
      search_content: value
    })
  }
  //翻页的点击事件
  onPageChangeClick (params) {
    this.getJobInfoList(params.current);
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
    /*职位列表*/
    const jobInfoList = this.state.jobInfoList.map((jobInfo, index) => (
      <View className='listBoardCss' key={index}>
        <View className='at-row'>
          <View className='at-col at-col-12'>
            <Text>{jobInfo.job_name}</Text>
            <Text className='textColor1' onClick={this.gotoCompanyDetail.bind(this,jobInfo.bus_id)}>({jobInfo.bus_name})</Text>
          </View>
        </View>
        <View className='at-row marginTop15'>
          <View className='at-col at-col-12 fontSize22'>
            <Text>月薪：</Text><Text>{CommonFnc.getConstantValue(JOB.SALARY,jobInfo.job_salary)}</Text>
            <Text className='paddingLeft15'>经验：</Text><Text>{CommonFnc.getConstantValue(JOB.SEN,jobInfo.job_sen)}</Text>
            <Text className='paddingLeft15'>最低学历：</Text><Text>{CommonFnc.getConstantValue(JOB.EDUCATE,jobInfo.job_educate)}</Text>
          </View>
        </View>
      </View>
    ));
    return (
      <View className='companyDetail-page'>
        {/*搜索栏*/}
        <View>
          <AtSearchBar
            actionName='找工作'
            value={this.state.search_content}
            onChange={this.onChange.bind(this)}
            onActionClick={this.getJobInfoList.bind(this,1)}
          />
        </View>
        {/*职位列表*/}
        <View style='padding:0 10px;'>
          <View>{jobInfoList}</View>
        </View>
        {/*分页*/}
        <View className='marginTop15'>
          <AtPagination
            pickerSelect
            total={this.state.total}
            pageSize={this.state.pageSize}
            current={this.state.current}
            onPageChange={this.onPageChangeClick}
          >
          </AtPagination>
        </View>
      </View>
    )
  }
}

