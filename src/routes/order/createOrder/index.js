import { Table, Form, Row, Col, Input, Button, Select, Popconfirm, notification, DatePicker, AutoComplete } from 'antd'
import { EditableCell } from 'components'
import PropTypes from 'prop-types'
import { request } from 'utils'
import lodash from 'lodash'
import React from 'react'

const FormItem = Form.Item;
const Option = Select.Option;

// 定义form项目
const formItemRow = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }

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

  handleSubmit = () => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        notification.error({
          message: '提交失败',
          description: '请检查表单',
        });
        return;
      }
      // Should format date value before submit.
      const values = {
        ...fieldsValue,
        goodDate: fieldsValue.goodDate && fieldsValue.goodDate.format('YYYY-MM-DD'),
        finishDate: fieldsValue.finishDate && fieldsValue.finishDate.format('YYYY-MM-DD'),
      };
      this.props.handleSubmit(values);
    });
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
            <Button type="primary" onClick={this.handleSubmit}>保存</Button>
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
              {getFieldDecorator('goodDate', {valuePropName: 'value'})(
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
      currIndex: '0',
    };
    this.cacheData = this.state.data.map(item => ({ ...item }));

    this.columns = [
      {
        title: '序号',
        dataIndex: 'index',
        render: (text, record, index) => index + 1,
      },
      {
        title: '编码',
        dataIndex: 'prodNo',
        render: (text, record, index) => <EditableCell
          type="autoComplete"
          value={text}
          column="prodNo"
          source="Material"
          editable={record.editable}
          onSelect={(value) => this.handleChangeProdNo(value, index)}
          onChange={value => this.handleChange(value, record.key, 'prodNo')}
        />
      },
      {
        title: '品名',
        dataIndex: 'prodName',
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
        render: (text, record) => this.renderColumns(text, record, 'prodLong'),
      },
      {
        title: '宽',
        dataIndex: 'prodWidth',
        render: (text, record) => this.renderColumns(text, record, 'prodWidth'),
      },
      {
        title: '单位',
        dataIndex: 'prodUnit',
      },
      {
        title: '数量',
        dataIndex: 'prodNum',
        render: (text, record) => this.renderColumns(text, record, 'prodNum'),
      },
      {
        title: '单价公式代码',
        dataIndex: 'formularType',
        render: (text, record, index) => <EditableCell
          type="autoComplete"
          value={text}
          column="formularType"
          source="Formular"
          editable={record.editable}
          onSelect={(value) => this.handleChangeFormularNo(value, index)}
          onChange={value => this.handleChange(value, record.key, 'formularType')}
        />
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
        title: '区域',
        dataIndex: 'area',
        render: (text, record) => this.renderColumns(text, record, 'area'),
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
        dataIndex: 'validWidth',
        render: (text, record) => this.renderColumns(text, record, 'validWidth'),
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
        dataIndex: 'materialNeed',
        render: (text, record) => this.renderColumns(text, record, 'materialNeed'),
      },
      {
        title: '面料基础价',
        dataIndex: 'materialPrice',
        render: (text, record) => this.renderColumns(text, record, 'materialPrice'),
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
        render: (text, record) => this.renderColumns(text, record, 'prodPrice1'),
      },
      {
        title: '是否定价品',
        dataIndex: 'ifProd',
        render: (text, record) => this.renderColumns(text, record, 'ifProd'),
      },
      {
        title: '分类',
        dataIndex: 'cateType',
        render: (text, record) => this.renderColumns(text, record, 'cateType'),
      },
      {
        title: '备注',
        dataIndex: 'memo',
        render: (text, record) => this.renderColumns(text, record, 'memo'),
      },
      {
        title: '操作',
        fixed: 'right',
        dataIndex: 'action',
        render: (data, record) => {
          const { editable } = record;
          return (<div>
            {editable ? <a onClick={() => this.save(record.key)}>确定</a> : <a onClick={() => this.edit(record.key)}>编辑</a>}
             |
            <Popconfirm
              okText="删除"
              cancelText="取消"
              title="确定删除吗?"
              overlayStyle={{ width: '200px' }}
              onConfirm={() => this.deleteRecord(record.key)}
            >
              <a> 删除</a>
            </Popconfirm>
          </div>)
        },
      },
    ];
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

  renderColumns(text, record, column, type = 'input') {
    return (
      <EditableCell
        type={type}
        value={text}
        column={column}
        editable={record.editable}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }

  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }
  edit(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }
  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }

  getList(param) {
    Object.assign(param, { pageSize: 10, currPage: 1 });
    request({ url: '/api/formular', method: 'GET', data: param }).then(data => this.setState({ data: data.data.list }))
  }

  handleChangeProdNo = (value, index) => {
    const {data} = this.state;
    data[index] = Object.assign(data[index], {prodNo: value.materialNo, prodName: value.materialName, prodType: value.spec, prodForm: value.pattern, prodUnit: value.unit})
    this.setState({data});
  }

  handleChangeFormularNo = (value, index) => {
    const {data} = this.state;
    data[index] = Object.assign(data[index], {formularType: value.formularNo, prodFormular: value.formularName})
    this.setState({data});
  }

  deleteRecord = (key) => {
    const {data} = this.state;
    data.splice(data.findIndex(record => record.key === key), 1);
    this.setState({data});
  }

  addNewOrder = () => {
    const {data} = this.state;
    data.push({key: data.length ? (+data[data.length - 1].key + 1).toString() : '0'});
    this.setState({data});
  }

  handleSubmit = (formValue) => {
    request({
      url: '/api/order',
      method: 'POST',
      data: {
        swOrderBaseVo: formValue,
        swOrderDetailVos: this.state.data,
      }
    })
      .then(res => {
        notification.success({
          message: '操作成功',
          description: res.data,
        })
        this.setState({data: []});
      })
      .catch(err => {
        notification.error({
          message: '操作失败',
          description: err.message,
        })
      });
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
          handleSubmit={this.handleSubmit}
        />
        <Row>
          <Col span={6} offset="1">
            <Button type="primary" onClick={this.addNewOrder}>新增</Button>
          </Col>
        </Row>
        <Table
          bordered
          columns={this.columns}
          pagination={false}
          scroll={{x: 3500}}
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
