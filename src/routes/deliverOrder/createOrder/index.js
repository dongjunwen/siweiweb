import { Table, Form, Row, Col, Input, Button, Select, Popconfirm, notification, DatePicker, AutoComplete, Checkbox } from 'antd'
import { EditableCell } from 'components'
import PropTypes from 'prop-types'
import { request, config } from 'utils'
import React from 'react'

const FormItem = Form.Item;
const Option = Select.Option;

// 定义form项目
const formItemRow = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }

class AdvancedSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      url: `${config.APIV0}/api/comp/findCompLike/${value}`,
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
            <FormItem label="发货单号" {...formItemRow}>
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
            <FormItem label="预发货日期" {...formItemRow}>
              {getFieldDecorator('saleType', {
                rules: [{required: true, message: '请选择日期'}],
              })(
                <DatePicker style={{ width: '100%'}} format="YYYY-MM-DD" />
              )}
            </FormItem>
          </Col>
          <Col span={6} offset={2}>
            <Button type="primary" onClick={this.handleSubmit}>保存</Button>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FormItem label="货运方式" {...formItemRow}>
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
            <FormItem label="发货人" {...formItemRow}>
              {getFieldDecorator('saleType', {
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="是否保价" {...formItemRow}>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: false,
              })(
                <Checkbox>是</Checkbox>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="客户" {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}>
              {getFieldDecorator('custCompName', {
                rules: [{required: true, message: '请选择或输入客户信息'}],
              })(
                <AutoComplete dataSource={companys.map(comp => `${comp.compNo} ${comp.compName}`)} onSearch={this.searchComp} onSelect={this.selectComp} />
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
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="备注" {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}>
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
        title: '订单序号',
        dataIndex: 'prodNo',
      },
      {
        title: '订单号',
        dataIndex: 'prodName',
      },
      {
        title: '箱号',
        dataIndex: 'prodType',
      },
      {
        title: '品名',
        dataIndex: 'prodForm',
      },
      {
        title: '品种',
        dataIndex: 'prodLong',
      },
      {
        title: '型号',
        dataIndex: 'prodWidth',
      },
      {
        title: '形状',
        dataIndex: 'prodUnit',
      },
      {
        title: '长',
        dataIndex: 'prodPrice',
      },
      {
        title: '宽',
        dataIndex: 'prodNum',
      },
      {
        title: '工艺要求',
        dataIndex: 'prodAmt',
      },
      {
        title: '单位',
        dataIndex: 'area',
        render: (text, record) => this.renderColumns(text, record, 'area'),
      },
      {
        title: '数量',
        dataIndex: 'materialNo',
        render: (text, record, index) => (<EditableCell
          type="autoComplete"
          value={text}
          column="materialNo"
          source="Material"
          editable={record.editable}
          onSelect={value => this.handleChangeMaterialNo(value, index)}
          onChange={value => this.handleChange(value, record.key, 'materialNo')}
        />),
      },
      {
        title: '单价',
        dataIndex: 'materialName',
      },
      {
        title: '备注',
        dataIndex: 'memo',
        render: (text, record) => this.renderColumns(text, record, 'memo'),
      },
    ];
  }

  componentWillMount() {
    Promise.all([
      request({url: `${config.APIV0}/api/sysDict/ORDER_TYPE`}),
      request({url: `${config.APIV0}/api/sysDict/SALE_TYPE`}),
      request({url: `${config.APIV0}/api/sysDict/PAY_WAY`}),
      request({url: `${config.APIV0}/api/getCurrentUser`}),
    ]).then((res) => {
      this.setState({
        orderTypes: res[0].data,
        saleTypes: res[1].data,
        payWays: res[2].data,
        userInfo: res[3].data,
      });
    });
  }

  getList(param) {
    Object.assign(param, { pageSize: 10, currPage: 1 });
    request({ url: `${config.APIV0}/api/formular`, method: 'GET', data: param }).then(data => this.setState({ data: data.data.list }))
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

  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      // 计算价格
      switch (column) {
        case 'prodNum':
          target.prodAmt = (target.prodPrice || 0) * Number(value) || 0;
          break;
        default:
          break;
      }
      this.setState({ data: newData });
    }
  }

  handleChangeProdNo = (value, index) => {
    const {data} = this.state;
    data[index] = Object.assign(data[index], {
      prodWidth: value.materialWidth,
      prodName: value.materialName,
      prodLong: value.materialLong,
      prodNo: value.materialNo,
      prodForm: value.pattern,
      prodPrice: value.price,
      prodType: value.spec,
      prodUnit: value.unit,
    });
    this.setState({data});
  }

  handleChangeMaterialNo = (value, index) => {
    const {data} = this.state;
    data[index] = Object.assign(data[index], {
      materialName: value.materialName,
    });
    this.setState({data});
  }

  handleChangeFormularlNo = (value, index) => {
    const {data} = this.state;
    data[index] = Object.assign(data[index], {
      materialPriceExpress: value.formularValue,
      materialPriceName: value.formularName,
    });
    this.setState({data});
  }

  handleChangeTechNo = (value, index) => {
    const {data} = this.state;
    data[index] = Object.assign(data[index], {
      techName: value.formularName,
      techPrice: value.formularPrice,
      techPriceExpress: value.formularValue,
    });
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
      url: `${config.APIV0}/api/order`,
      method: 'POST',
      data: {
        swOrderBaseVo: formValue,
        swOrderDetailVos: this.state.data,
      },
    }).then((res) => {
      notification.success({
        message: '操作成功',
        description: res.data,
      })
      this.setState({data: []});
    }).catch((err) => {
      notification.error({
        message: '操作失败',
        description: err.message,
      })
    });
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
          scroll={{x: 1500}}
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
