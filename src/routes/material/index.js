import React from 'react'
import { Table, Form, Row, Col, Input, Button, Select, Modal, Popconfirm } from 'antd'
import PropTypes from 'prop-types'
import { request } from 'utils'
import ModalFrom from './form'

const FormItem = Form.Item;
const Option = Select.Option;

// 定义form项目
const Fields = {
  material: {
    name: 'material',
    userProps: { label: '物料类型', labelCol: { span: 7 }, wrapperCol: { span: 16 } },
  },
  tranOutMerNo: {
    name: 'tranOutMerNo',
    userProps: { label: '物料名称', labelCol: { span: 8 }, wrapperCol: { span: 16 } },
  },
};

class AdvancedSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      material: '',
      materials: [{ materialName: '', materialNo: 'dd' }],
    };
  }

  componentWillMount() {
    request({
      url: '/api/material',
      method: 'get',
    }).then(data => this.setState({ materials: data.data.list }));
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
    const materialOptions = this.state.materials.map(material => <Option key={material.materialNo}>{material.materialName}</Option>)

    return (
      <Form
        layout="horizontal"
        onSubmit={this.handleSearch.bind(this)}
      >
        <Row>
          <Col span={6}>
            <FormItem {...Fields.material.userProps}>
              {getFieldDecorator(Fields.material.name, { ...Fields.material.userRules, initialValue: this.state.materials[0].materialNo })(
                <Select>
                  {/* <Option key="1">面料</Option>
                  <Option key="2">纱线</Option>
                  <Option key="3">白纱布</Option>
                  <Option key="4">半成品（染色后的白坯布）</Option>
                  <Option key="5">残次品</Option> */}
                  {materialOptions}
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
            &emsp;<Button type="primary" onClick={this.props.setModal}>新增</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
const WrappedModalFrom = Form.create()(ModalFrom);

class MaterialPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: [],
      readOnly: false,
    };

    this.columns = [
      {
        title: '品种编号',
        dataIndex: 'id',
      },
      {
        title: '品名',
        dataIndex: 'materialName',
      },
      {
        title: '品种',
        dataIndex: 'modiNo',
      },
      {
        title: '规格',
        dataIndex: 'spec',
      },
      {
        title: '型号',
        dataIndex: 'pattern',
      },
      {
        title: '单位',
        dataIndex: 'unit',
      },
      {
        title: '物料类型',
        dataIndex: 'materialType',
      },
      {
        title: '备注',
        dataIndex: 'memo',
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: (data, record) => (<div>
          <a onClick={() => this.setModal(record, false, true)}>查看</a> |
          <a onClick={() => this.setModal(record, true, false)}> 修改</a> |
          <Popconfirm
            title="确定删除吗?"
            overlayStyle={{ width: '200px' }}
            onConfirm={() => this.deleteRecord(record.materialNo)}
            okText="删除"
            cancelText="取消"
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
    Object.assign(param, { pageSize: 10, currPage: 1 });
    request({ url: '/api/material', method: 'GET', data: param }).then(data => this.setState({ data: data.data.list }))
  }

  setModal(data, modify, readOnly) {
    this.setState({
      visible: true,
      dataDetail: data,
      readOnly,
      modify,
    })
  }

  deleteRecord(id) {
    request({ url: `/api/material/${id}`, method: 'DELETE' }).then(() => this.getList({}));
  }

  addRecord(data) {
    request({ url: '/api/material', method: this.state.modify ? 'PUT' : 'POST', data }).then(() => this.setState({ visible: false }, this.getList({})));
  }

  render () {
    return (
      <div className="content-inner">
        <WrappedAdvancedSearchForm search={this.getList.bind(this)} setModal={() => this.setModal({}, false, false)} />
        <h2 style={{ margin: '16px 0' }}>查询结果</h2>
        <Table
          rowKey={(record, key) => key}
          pagination={false}
          bordered
          columns={this.columns}
          dataSource={this.state.data}
        />
        <Modal
          visible={this.state.visible}
          title="修改物料信息"
          okText={this.state.readOnly ? undefined : '保存'}
          onCancel={() => this.setState({ visible: false })}
        >
          <WrappedModalFrom dataDetail={this.state.dataDetail} readOnly={this.state.readOnly} submit={value => !this.state.readOnly && this.addRecord(value)} />
        </Modal>
      </div>
    )
  }
}

MaterialPage.propTypes = {
  dispatch: PropTypes.func,
}
export default MaterialPage
