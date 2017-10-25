import React from 'react'
import { Table, Form, Row, Col, Input, Button, Select, Modal, DatePicker, Popconfirm, notification } from 'antd'
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
    dataIndex: 'id',
  },
  {
    title: '客户名称',
    dataIndex: 'custCompName',
  },
  {
    title: '订单号',
    dataIndex: 'orderNo',
  },
  {
    title: '订单日期',
    dataIndex: 'goodDate',
  },
  {
    title: '单据类型',
    dataIndex: 'orderType',
  },
  {
    title: '销售类型',
    dataIndex: 'saleType',
  },
  {
    title: '单据状态',
    dataIndex: 'orderStatus',
  },
  {
    title: '创建人',
    dataIndex: 'creator',
  },
  {
    title: '操作',
    dataIndex: 'action',
    render: (data, record) => (<div>
      <a onClick={() => console.log(data)}>查看详情</a> |
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

    return (
      <Form
        layout="horizontal"
        onSubmit={this.handleSearch.bind(this)}
      >
        <Row>
          <Col span={6}>
            <FormItem label="订单日期" {...formItemRow}>
              {getFieldDecorator('startTime')(
                <DatePicker format={'YYYY-MM-DD'} />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="~" {...formItemRow} colon={false}>
              {getFieldDecorator('endTime')(
                <DatePicker format={'YYYY-MM-DD'} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FormItem label="订单号" {...formItemRow}>
              {getFieldDecorator('orderNo')(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="客户名称" {...formItemRow}>
              {getFieldDecorator('name')(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FormItem label="单据类型" {...formItemRow}>
              {getFieldDecorator('type', { initialValue: '1' })(
                <Select>
                  <Option value="1">全部</Option>
                  <Option value="2">样品单</Option>
                  <Option value="3">正常单</Option>
                  <Option value="4">补单</Option>
                  <Option value="5">赠品</Option>
                  <Option value="6">工程单</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="销售类型" {...formItemRow}>
              {getFieldDecorator('saleType', { initialValue: '1' })(
                <Select>
                  <Option value="1">全部</Option>
                  <Option value="2">内销</Option>
                  <Option value="3">外销</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FormItem label="单据状态" {...formItemRow}>
              {getFieldDecorator('status', { initialValue: '1' })(
                <Select>
                  <Option value="1">全部</Option>
                  <Option value="2">待初审</Option>
                  <Option value="3">已作废</Option>
                  <Option value="4">初审通过</Option>
                  <Option value="5">终审通过</Option>
                  <Option value="6">生产中</Option>
                  <Option value="7">已完成</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            &emsp;<Button type="primary" htmlType="submit">查询</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

class OrderListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataDetail: {},
      data: [],
    };
  }

  getList(param) {
    Object.assign(param, { pageSize: 10, currPage: 1 });
    request({ url: '/api/order', method: 'GET', data: param }).then(data => this.setState({ data: data.data.list }))
  }

  render () {
    return (
      <div className="content-inner">
        <WrappedAdvancedSearchForm search={this.getList.bind(this)} />
        <h2 style={{ margin: '16px 0' }}>查询结果</h2>
        <Table
          rowKey={(record, key) => key}
          pagination={false}
          bordered
          columns={columns}
          dataSource={this.state.data}
        />
      </div>
    )
  }
}

OrderListPage.propTypes = {
  dispatch: PropTypes.func,
}
export default OrderListPage
