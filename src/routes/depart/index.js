import React from 'react'
import { Table, Form, Row, Col, Input, Button, Modal, Popconfirm, notification } from 'antd'
import PropTypes from 'prop-types'
import { request } from 'utils'
import ModalFrom from './form'

const FormItem = Form.Item;

// 定义form项目
const Fields = {
  compName: {
    name: 'compName',
    userProps: { label: '公司名称', labelCol: { span: 8 }, wrapperCol: { span: 16 } },
  },
};
const deleteRecord = (id) => {
  request({ url: `/api/depart/${id}`, method: 'delete' }).then(data => notification.success({ message: '操作成功', description: data.data })).catch(err => console.warn(err));
}
const columns = [
  {
    title: '公司编码',
    dataIndex: 'compNo',
  },
  {
    title: '公司名称',
    dataIndex: 'compName',
  },
  {
    title: '部门编码',
    dataIndex: 'departNo',
  },
  {
    title: '部门名称',
    dataIndex: 'departName',
  },
  {
    title: '上级部门',
    dataIndex: 'fhDepartNo',
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
        onConfirm={() => deleteRecord(record.departNo )}
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
            <FormItem {...Fields.compName.userProps}>
              {getFieldDecorator(Fields.compName.name, { ...Fields.compName.userRules })(
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

class DepartPage extends React.Component {
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
    request({ url: '/api/depart', method: 'GET', data: param }).then(data => this.setState({ data: data.data.list }))
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
          title="编辑部门信息"
          width="700"
          onCancel={() => this.setState({ visible: false })}
        >
          <WrappedModalFrom dataDetail={this.state.dataDetail} submit={value => console.log(value)} />
        </Modal>
      </div>
    )
  }
}

DepartPage.propTypes = {
  dispatch: PropTypes.func,
}
export default DepartPage
