import React from 'react'
import { Table, Form, Row, Col, Input, Button, Modal, Popconfirm } from 'antd'
import PropTypes from 'prop-types'
import { request } from 'utils'
import ModalFrom from './form'

const FormItem = Form.Item;

// 定义form项目
const Fields = {
  tranOutMerNo: {
    name: 'formularNo',
    userProps: { label: '公式代码', labelCol: { span: 8 }, wrapperCol: { span: 16 } },
  },
};
const deleteRecord = (id) => {
  request({ url: `/api/formular/${id}`, method: 'delete' }).then(data => notification.success({ message: '操作成功', description: data.data })).catch(err => console.warn(err));
}
const columns = [
  {
    title: '公式代码',
    dataIndex: 'formularNo',
  },
  {
    title: '描述',
    dataIndex: 'formularType',
  },
  {
    title: '公式',
    dataIndex: 'formularName',
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

    return (
      <Form
        layout="horizontal"
        onSubmit={this.handleSearch.bind(this)}
      >
        <Row>
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
const WrappedModalFrom = Form.create()(ModalFrom);

class FormularPage extends React.Component {
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
    request({ url: '/api/formular', method: 'GET', data: param }).then(data => this.setState({ data: data.data.list }))
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
          title="编辑公式"
          width="700"
          onCancel={() => this.setState({ visible: false })}
        >
          <WrappedModalFrom dataDetail={this.state.dataDetail} submit={value => console.log(value)} />
        </Modal>
      </div>
    )
  }
}

FormularPage.propTypes = {
  dispatch: PropTypes.func,
}
export default FormularPage
