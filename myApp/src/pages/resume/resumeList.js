import Taro, { Component, Config } from '@tarojs/taro'
import {View,Text} from '@tarojs/components'
import { AtSearchBar,AtPagination  } from 'taro-ui'

import * as resumeApi from '../../apis/resume/service';
import * as CommonFnc from  '../../utils/commonFnc'
import { PERSON } from  '../../constants'


export default class ResumeList extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '找简历',
  };

  constructor() {
    super();
    this.state={
      total:0,
      pageSize:10,
      current:1,
      search_content:'',
      resumeInfoList:[],
    }

  }

  componentWillMount () {
  }

  componentDidMount () {
    this.getResumeInfoList(1)
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  //获取公司详情的信息
  async getResumeInfoList(newPage) {
    const res = await resumeApi.getResumeInfoList({
      search_content : this.state.search_content,
      expect_city:'',
      work_year:'',
      educate:'',
      expect_industry:'',
      order_type:'',
      page:newPage,
      size:10
    });
    console.log('简历列表详情信息');
    console.log(res.data);
    if (res.status == 1) {
      this.setState({
        total:parseInt(res.data.total),
        resumeInfoList:res.data.data
      });
    }
  }

  onChange (value) {
    this.setState({
      search_content: value
    })
  }
  //分页的翻页点击事件
  onPageChangeClick (param) {
    this.getResumeInfoList(param.current);
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
    const resumeInfoList = this.state.resumeInfoList.map((resumeInfo, index) => (
      <View className='listBoardCss' key={index}>
        <View className='at-row'>
          <View className='at-col at-col-12'>
            <Text>{CommonFnc.getConstantValue(PERSON.EXPECT_JOB,resumeInfo.expect_job)}</Text>
          </View>
        </View>
        <View className='at-row marginTop15'>
          <View className='at-col at-col-12 fontSize22'>
            <Text>姓名：</Text><Text>{resumeInfo.true_name}</Text>
            <Text className='paddingLeft15'>性别：</Text><Text>{CommonFnc.getConstantValue(PERSON.SEX,resumeInfo.sex)}</Text>
            <Text className='paddingLeft15'>年限：</Text><Text>{CommonFnc.getConstantValue(PERSON.WORK_YEAR,resumeInfo.work_year)}</Text>
            <Text className='paddingLeft15'>学历：</Text><Text>{CommonFnc.getConstantValue(PERSON.EDUCATE,resumeInfo.educate)}</Text>
          </View>
        </View>
      </View>
    ));
    return (
      <View className='companyDetail-page'>
        {/*搜索栏*/}
        <View>
          <AtSearchBar
            actionName='找简历'
            value={this.state.search_content}
            onChange={this.onChange.bind(this)}
            onActionClick={this.getResumeInfoList.bind(this,1)}
          />
        </View>
        {/*职位列表*/}
        <View style='padding:0 10px;'>
          <View>{resumeInfoList}</View>
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

