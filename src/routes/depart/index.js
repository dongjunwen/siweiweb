import React from 'react'
import { Table, Form, Row, Col, Input, Button, Modal, Popconfirm, notification } from 'antd'
import PropTypes from 'prop-types'
import { request, config } from 'utils'
import ModalFrom from './form'

const FormItem = Form.Item;

// 定义form项目
const Fields = {
  compName: {
    name: 'compName',
    userProps: { label: '公司名称', labelCol: { span: 8 }, wrapperCol: { span: 16 } },
  },
};

class AdvancedSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marketNo: '',
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
            &emsp;<Button type="primary" onClick={this.props.setModal}>新增</Button>
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
      data: [],
      total: 0,
      pageSize: 10,
      dataDetail: {},
      currentPage: 1,
      visible: false,
      readOnly: false,
    };

    this.columns = [
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
          <a onClick={() => this.setModal(record, false, true)}>查看</a> |
          <a onClick={() => this.setModal(record, true, false)}> 修改</a> |
          <Popconfirm
            okText="删除"
            cancelText="取消"
            title="确定删除吗?"
            overlayStyle={{ width: '200px' }}
            onConfirm={() => this.deleteRecord(record.departNo)}
          >
            <a> 删除</a>
          </Popconfirm>
        </div>),
      },
    ];
  }

  componentWillMount() {
    this.getList({});
  }

  getList(param) {
    Object.assign(param, { currPage: this.state.currentPage, pageSize: this.state.pageSize });
    if (typeof param !== 'number') {
      this.condition = param;
    } else {
      this.condition.currPage = param;
    }
    request({ url: `${config.APIV0}/api/depar`, method: 'GET', data: this.condition })
      .then(data => this.setState({
        data: data.data.list,
        total: data.data.total,
        currentPage: data.data.currPage,
      }))
  }

  setModal(data, modify, readOnly) {
    this.setState({
      visible: true,
      dataDetail: data,
      readOnly,
      modify,
    })
  }

  addRecord(data) {
    request({ url: `${config.APIV0}/api/comp`, method: this.state.modify ? 'PUT' : 'POST', data })
      .then((res) => {
        this.setState({ visible: false }, this.getList({}))
        notification.success({ message: '操作成功', description: res.data })
      });
  }

  deleteRecord (id) {
    request({ url: `${config.APIV0}/api/depart/${id}`, method: 'delete' })
      .then((data) => {
        notification.success({ message: '操作成功', description: data.data });
        this.getList({});
      })
      .catch(err => console.warn(err, this));
  }

  render () {
    return (
      <div className="content-inner">
        <WrappedAdvancedSearchForm search={this.getList.bind(this)} setModal={() => this.setModal({}, false, false)} />
        <h2 style={{ margin: '16px 0' }}>查询结果</h2>
        <Table
          bordered
          columns={this.columns}
          dataSource={this.state.data}
          rowKey={(record, key) => key}
          pagination={{ pageSize: this.state.pageSize, onChange: this.getList.bind(this), defaultCurrent: 1, current: this.state.currentPage, total: this.state.total }}
        />
        <Modal
          footer={null}
          title="编辑部门信息"
          visible={this.state.visible}
          onCancel={() => this.setState({ visible: false })}
        >
          <WrappedModalFrom dataDetail={this.state.dataDetail} readOnly={this.state.readOnly} submit={value => !this.state.readOnly && this.addRecord(value)} />
        </Modal>
      </div>
    )
  }
}

DepartPage.propTypes = {
  dispatch: PropTypes.func,
}
export default DepartPage
