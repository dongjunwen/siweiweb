import { Table, Form, Row, Col, Input, Button, Select, Popconfirm, notification, DatePicker, AutoComplete } from 'antd'
import { EditableCell } from 'components'
import PropTypes from 'prop-types'
import { request } from 'utils'
import React from 'react'

const FormItem = Form.Item;
const Option = Select.Option;

// 定义form项目
const formItemRow = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }

const deleteRecord = (id) => {
  request({ url: `/api/formular/${id}`, method: 'delete' }).then(data => notification.success({ message: '操作成功', description: data.data })).catch(err => console.warn(err));
}
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
  },
  {
    title: '编码',
    dataIndex: 'prodNo',
  },
  {
    title: '品名',
    dataIndex: 'materialName',
    render: (data) => <EditableCell value="3434" />,
  },
  {
    title: '品种',
    dataIndex: 'prodType',
  },
  {
    title: '形状',
    dataIndex: 'prodForm',
  },
  {
    title: '长',
    dataIndex: 'prodLong',
  },
  {
    title: '宽',
    dataIndex: 'prodWidth',
  },
  {
    title: '单位',
    dataIndex: 'prodUnit',
  },
  {
    title: '数量',
    dataIndex: 'prodNum',
  },
  {
    title: '单价公式代码',
    dataIndex: 'formularType',
  },
  {
    title: '单价公式',
    dataIndex: 'prodFormular',
  },
  {
    title: '单价',
    dataIndex: 'prodPrice',
  },
  {
    title: '金额',
    dataIndex: 'prodAmt',
  },
  {
    title: '面料品号',
    dataIndex: 'materialNo',
  },
  {
    title: '面料品名',
  },
  {
    title: '有效幅宽',
  },
  {
    title: '面料公式代码',
  },
  {
    title: '面料公式名称',
  },
  {
    title: '面料公式',
    dataIndex: 'materialPriceExpress',
  },
  {
    title: '面料需求',
  },
  {
    title: '面料基础价',
  },
  {
    title: '工艺代码',
    dataIndex: 'techNo',
  },
  {
    title: '工艺名称',
    dataIndex: 'techName',
  },
  {
    title: '工艺单价',
    dataIndex: 'techPrice',
  },
  {
    title: '工艺公式',
    dataIndex: 'techPriceExpress',
  },
  {
    title: '成品定价',
    dataIndex: 'prodPrice1',
  },
  {
    title: '是否定价品',
    dataIndex: 'ifProd',
  },
  {
    title: '分类',
    dataIndex: 'cateType',
  },
  {
    title: '备注',
    dataIndex: 'memo',
  },
  {
    title: '操作',
    dataIndex: 'action',
    render: (data, record) => (<div>
      <a onClick={() => console.log(data)}>查看</a> |
      <a> 修改</a> |
      <Popconfirm
        okText="删除"
        cancelText="取消"
        title="确定删除吗?"
        overlayStyle={{ width: '200px' }}
        onConfirm={() => deleteRecord(record.formularNo)}
      >
        <a> 删除</a>
      </Popconfirm>
    </div>),
  },
];

class AdvancedSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marketNo: '',
      companys: [{compName: '请输入', compNo: ''}],
      curCompany: {},
    };
  }

  handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        // dddd
      } else {
        // 验证通过
        this.props.search(values);
      }
    });
  }

  searchComp = (value) => {
    request({
      url: `/api/comp/findCompLike/${value}`,
      method: 'get',
    }).then(data => this.setState({ companys: data.data || [] }));
  }

  selectComp = (value) => {
    const {companys} = this.state;
    this.setState({curCompany: companys[companys.findIndex(comp => comp.compNo === value.split(/\s/)[0])] || {}});
  }

  render() {
    const {form: {getFieldDecorator}, userInfo} = this.props;
    const {curCompany, companys} = this.state;
    const orderOptions = this.props.orderTypes.map(sysDict => <Option key={sysDict.dictCode}>{sysDict.dictName}</Option>);
    const saleOptions = this.props.saleTypes.map(sysDict => <Option key={sysDict.dictCode}>{sysDict.dictName}</Option>);
    const payWayOptions = this.props.payWays.map(sysDict => <Option key={sysDict.dictCode}>{sysDict.dictName}</Option>);

    return (
      <Form
        layout="horizontal"
        onSubmit={this.handleSearch.bind(this)}
      >
        <Row>
          <Col span={6}>
            <FormItem label="单据类型" {...formItemRow}>
              {getFieldDecorator('orderType', {
                initialValue: this.props.orderTypes[0].dictCode,
              })(
                <Select>
                  {orderOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="销售类型" {...formItemRow}>
              {getFieldDecorator('saleType', {
                initialValue: this.props.saleTypes[0].dictCode,
              })(
                <Select>
                  {saleOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6} offset={2}>
            <Button type="primary">保存</Button>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="客户" {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}>
              {getFieldDecorator('custCompName')(
                <AutoComplete dataSource={companys.map(comp => `${comp.compNo} ${comp.compName}`)} onSearch={this.searchComp} onSelect={this.selectComp} />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="生产方" {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}>
              {getFieldDecorator('supplyCompName', {
                initialValue: userInfo.swCompInfoResultVo.compName,
              })(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FormItem label="联系人" {...formItemRow}>
              {getFieldDecorator('custContactName', {
                initialValue: curCompany.contactName,
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="手机" {...formItemRow}>
              {getFieldDecorator('custMobile', {
                initialValue: curCompany.mobile,
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="联系人" {...formItemRow}>
              {getFieldDecorator('supplyContactName', {
                initialValue: userInfo.nickName,
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="手机" {...formItemRow}>
              {getFieldDecorator('supplyMobile', {
                initialValue: userInfo.phoneNum,
              })(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FormItem label="电话" {...formItemRow}>
              {getFieldDecorator('custPhone', {
                initialValue: curCompany.telphone,
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="传真" {...formItemRow}>
              {getFieldDecorator('custTax', {
                initialValue: curCompany.tax,
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="电话" {...formItemRow}>
              {getFieldDecorator('supplyPhone', {
                initialValue: userInfo.swCompInfoResultVo.telphone,
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="传真" {...formItemRow}>
              {getFieldDecorator('supplyTax', {
                initialValue: userInfo.swCompInfoResultVo.tax,
              })(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="地址" {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}>
              {getFieldDecorator('custAddr', {
                initialValue: curCompany.addr,
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="地址" {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}>
              {getFieldDecorator('supplyAddr', {
                initialValue: userInfo.swCompInfoResultVo.addr,
              })(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FormItem label="付款方式" {...formItemRow}>
              {getFieldDecorator('payWay', {
                initialValue: this.props.payWays[0].dictCode,
              })(
                <Select>
                  {payWayOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="订货日期" {...formItemRow}>
              {getFieldDecorator('goodDate')(
                <DatePicker style={{ width: '100%'}} format="YYYY-MM-DD" />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="交货日期" {...formItemRow}>
              {getFieldDecorator('finishDate')(
                <DatePicker style={{ width: '100%'}} format="YYYY-MM-DD" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="订单备注" {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}>
              {getFieldDecorator('memo')(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

class CreateOrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataDetail: {},
      data: [],
      userInfo: {
        swCompInfoResultVo: {},
      },
      orderTypes: [{dictCode: 'code', dictDesc: ''}],
      saleTypes: [{dictCode: 'code', dictDesc: ''}],
      payWays: [{dictCode: 'code', dictDesc: ''}],
    };
  }

  componentWillMount() {
    request({
      url: '/api/sysDict/ORDER_TYPE',
      method: 'get',
    }).then(data => this.setState({ orderTypes: data.data }));
    request({
      url: '/api/sysDict/SALE_TYPE',
      method: 'get',
    }).then(data => this.setState({ saleTypes: data.data }));
    request({
      url: '/api/sysDict/PAY_WAY',
      method: 'get',
    }).then(data => this.setState({ payWays: data.data }));
    request({
      url: '/api/getCurrentUser',
      method: 'get',
    }).then(data => this.setState({ userInfo: data.data }));
  }

  getList(param) {
    Object.assign(param, { pageSize: 10, currPage: 1 });
    request({ url: '/api/formular', method: 'GET', data: param }).then(data => this.setState({ data: data.data.list }))
  }

  addNewOrder = () => {
    const {data} = this.state;
    data.push({key: 'ddd'});
    this.setState({data});
  }

  render () {
    return (
      <div className="content-inner">
        <WrappedAdvancedSearchForm
          payWays={this.state.payWays}
          userInfo={this.state.userInfo}
          saleTypes={this.state.saleTypes}
          search={this.getList.bind(this)}
          orderTypes={this.state.orderTypes}
        />
        <Row>
          <Col span={6} offset="1">
            <Button type="primary" onClick={this.addNewOrder}>新增</Button>
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          pagination={false}
          scroll={{x: 3000}}
          dataSource={this.state.data}
          style={{ margin: '16px 0' }}
          rowKey={(record, key) => key}
        />
      </div>
    )
  }
}

CreateOrderPage.propTypes = {
  dispatch: PropTypes.func,
}
export default CreateOrderPage
