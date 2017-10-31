import React from 'react'
import { Form, Row, Col, Input, Button, notification, Radio } from 'antd'
import { request } from 'utils'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const Fields = {
  compName: {
    name: 'compName',
    userProps: { label: '公司名称', labelCol: { span: 6 }, wrapperCol: { span: 16 } },
  },
  compNo: {
    name: 'compNo',
    userProps: { label: '公司代码', labelCol: { span: 6 }, wrapperCol: { span: 16 } },
  },
  addr: {
    name: 'addr',
    userProps: { label: '地址', labelCol: { span: 6 }, wrapperCol: { span: 16 } },
  },
  contactName: {
    name: 'contactName',
    userProps: { label: '联系人', labelCol: { span: 6 }, wrapperCol: { span: 16 } },
  },
  email: {
    name: 'email',
    userProps: { label: '邮箱', labelCol: { span: 6 }, wrapperCol: { span: 16 } },
  },
  isSelf: {
    name: 'isSelf',
    userProps: { label: '是否本公司', labelCol: { span: 6 }, wrapperCol: { span: 16 } },
  },
  mobile: {
    name: 'mobile',
    userProps: { label: '手机', labelCol: { span: 6 }, wrapperCol: { span: 16 } },
  },
  tax: {
    name: 'tax',
    userProps: { label: '传真', labelCol: { span: 6 }, wrapperCol: { span: 16 } },
  },
  telphone: {
    name: 'telphone',
    userProps: { label: '电话', labelCol: { span: 6 }, wrapperCol: { span: 16 } },
  },
};
export default class AdvancedSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marketNo: '',
    };
  }

  setModal() {
    console.log(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        // dddd
      } else {
        // 验证通过
        this.props.submit(values);
      }
    });
  }

  render() {
    const { form: { getFieldDecorator }, dataDetail, readOnly } = this.props;

    return (
      <Form
        onSubmit={this.handleSubmit.bind(this)}
      >
        <FormItem {...Fields.compName.userProps}>
          {getFieldDecorator(Fields.compName.name, { ...Fields.compName.userRules })(
            <Input />
          )}
        </FormItem>
        <FormItem {...Fields.compNo.userProps}>
          {getFieldDecorator(Fields.compNo.name, { ...Fields.compNo.userRules })(
            <Input />
          )}
        </FormItem>
        <FormItem {...Fields.addr.userProps}>
          {getFieldDecorator(Fields.addr.name, { ...Fields.addr.userRules })(
            <Input />
          )}
        </FormItem>
        <FormItem {...Fields.contactName.userProps}>
          {getFieldDecorator(Fields.contactName.name, { ...Fields.contactName.userRules })(
            <Input />
          )}
        </FormItem>
        <FormItem {...Fields.email.userProps}>
          {getFieldDecorator(Fields.email.name, { ...Fields.email.userRules })(
            <Input />
          )}
        </FormItem>
        <FormItem {...Fields.isSelf.userProps}>
          {getFieldDecorator(Fields.isSelf.name, { ...Fields.isSelf.userRules, initialValue: 'N' })(
            <RadioGroup>
              <Radio value="Y">是</Radio>
              <Radio value="N">否</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...Fields.mobile.userProps}>
          {getFieldDecorator(Fields.mobile.name, { ...Fields.mobile.userRules })(
            <Input />
          )}
        </FormItem>
        <FormItem {...Fields.tax.userProps}>
          {getFieldDecorator(Fields.tax.name, { ...Fields.tax.userRules })(
            <Input />
          )}
        </FormItem>
        <FormItem {...Fields.telphone.userProps}>
          {getFieldDecorator(Fields.telphone.name, { ...Fields.telphone.userRules })(
            <Input />
          )}
        </FormItem>
        <FormItem {...{
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 14,
              offset: 6,
            },
          },
        }}
        >
          {!readOnly && <Button type="primary" htmlType="submit">保存</Button>}
        </FormItem>
      </Form>
    );
  }
}
