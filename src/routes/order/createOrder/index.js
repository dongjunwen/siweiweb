import React from 'react'
import { Table, Form, Row, Col, Input, Button, Select, Popconfirm, notification, DatePicker } from 'antd'
import PropTypes from 'prop-types'
import { request } from 'utils'

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
  },
  {
    title: '品名',
  },
  {
    title: '品种',
  },
  {
    title: '形状',
  },
  {
    title: '长',
    dataIndex: 'formularType',
  },
  {
    title: '宽',
    dataIndex: 'formularName',
  },
  {
    title: '单位',
  },
  {
    title: '数量',
  },
  {
    title: '单价公式代码',
  },
  {
    title: '单价公式',
  },
  {
    title: '单价',
  },
  {
    title: '金额',
  },
  {
    title: '面料品号',
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
  },
  {
    title: '面料需求',
  },
  {
    title: '面料基础价',
  },
  {
    title: '工艺代码',
  },
  {
    title: '工艺名称',
  },
  {
    title: '工艺单价',
  },
  {
    title: '工艺公式',
  },
  {
    title: '成品定价',
  },
  {
    title: '是否定价品',
  },
  {
    title: '分类',
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
    };
  }

  setModal() {
    this.setState({
      visible: true,
      dataDetail: {},
    })
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

  render() {
    const { getFieldDecorator } = this.props.form;
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
              {getFieldDecorator('asdfasdfd1', {
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
              {getFieldDecorator('asdfasdfd2', {
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
              {getFieldDecorator('asdfasdfd5')(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="生产方" {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}>
              {getFieldDecorator('asdfasdfd3')(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FormItem label="联系人" {...formItemRow}>
              {getFieldDecorator('asdfasdfd6')(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="手机" {...formItemRow}>
              {getFieldDecorator('asdfasdfd7')(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="联系人" {...formItemRow}>
              {getFieldDecorator('asdfasdfd8')(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="手机" {...formItemRow}>
              {getFieldDecorator('asdfasdfd9')(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FormItem label="电话" {...formItemRow}>
              {getFieldDecorator('asdfasdfd11')(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="传真" {...formItemRow}>
              {getFieldDecorator('asdfasdfd12')(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="电话" {...formItemRow}>
              {getFieldDecorator('asdfasdfd13')(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="传真" {...formItemRow}>
              {getFieldDecorator('asdfasdfd14')(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="地址" {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}>
              {getFieldDecorator('asdfasdfd15')(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="地址" {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}>
              {getFieldDecorator('asdfasdfd16')(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FormItem label="付款方式" {...formItemRow}>
              {getFieldDecorator('asdfasdfd17', {
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
              {getFieldDecorator('asdfasdfd18')(
                <DatePicker style={{ width: '100%'}} format="YYYY-MM-DD" />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="交货日期" {...formItemRow}>
              {getFieldDecorator('asdfasdfd19')(
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
        <Row>
          <Col span={6} offset="1">
            <Button type="primary" onClick={this.setModal.bind(this)}>新增</Button>
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
  }

  getList(param) {
    Object.assign(param, { pageSize: 10, currPage: 1 });
    request({ url: '/api/formular', method: 'GET', data: param }).then(data => this.setState({ data: data.data.list }))
  }

  render () {
    return (
      <div className="content-inner">
        <WrappedAdvancedSearchForm payWays={this.state.payWays} orderTypes={this.state.orderTypes} saleTypes={this.state.saleTypes} search={this.getList.bind(this)} />
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
