import React from 'react'
import { Table, Form, Row, Col, Input, Button, Select, Modal, Popconfirm } from 'antd'
import PropTypes from 'prop-types'
import { request } from 'utils'

const FormItem = Form.Item;
const Option = Select.Option;

// 定义form项目
const Fields = {
  marketNo: {
    name: 'marketNo',
    userProps: { label: '物料类型', labelCol: { span: 7 }, wrapperCol: { span: 16 } },
  },
  tranOutMerNo: {
    name: 'tranOutMerNo',
    userProps: { label: '物料名称', labelCol: { span: 8 }, wrapperCol: { span: 16 } },
  },
};

const columns = [
  {
    title: '品种编号',
    dataIndex: 'props',
  },
  {
    title: '品名',
    dataIndex: 'desciption',
  },
  {
    title: '品种',
    dataIndex: 'type',
  },
  {
    title: '规格',
    dataIndex: 'default',
  },
  {
    title: '型号',
    dataIndex: 'props2',
  },
  {
    title: '单位',
    dataIndex: 'desciption2',
  },
  {
    title: '物料类型',
    dataIndex: 'type2',
  },
  {
    title: '备注',
    dataIndex: 'default2',
  },
  {
    title: '操作',
    dataIndex: 'action',
    render: data => (<div>
      <a onClick={() => console.log(data)}>查看</a> |
      <a> 修改</a> |
      <Popconfirm
        title="确定删除吗?"
        overlayStyle={{ width: '200px' }}
        onConfirm={() => console.warn()}
        okText="删除"
        cancelText="取消"
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
    console.log(this);
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
            <FormItem {...Fields.marketNo.userProps}>
              {getFieldDecorator(Fields.marketNo.name, { ...Fields.marketNo.userRules, initialValue: '1' })(
                <Select>
                  <Option key="1">面料</Option>
                  <Option key="2">纱线</Option>
                  <Option key="3">白纱布</Option>
                  <Option key="4">半成品（染色后的白坯布）</Option>
                  <Option key="5">残次品</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...Fields.tranOutMerNo.userProps}>
              {getFieldDecorator(Fields.tranOutMerNo.name, { ...Fields.tranOutMerNo.userRules })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={6} offset="1">
            <Button type="primary" htmlType="submit">查询</Button>
            &emsp;<Button type="primary" onClick={this.setModal.bind(this)}>新增</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

class MaterialPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: [],
    };
  }

  getList(param) {
    Object.assign(param, { pageSize: 10, currPage: 1 });
    request({ url: '/api/material', method: 'GET', data: param }).then(data => this.setState({ data: data.data.list }))
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
        <Modal
          visible={this.state.visible}
          onCancel={() => this.setState({ visible: false })}
        >
          <p>ddffsad</p>
        </Modal>
      </div>
    )
  }
}

MaterialPage.propTypes = {
  dispatch: PropTypes.func,
}
export default MaterialPage
