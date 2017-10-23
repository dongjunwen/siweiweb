import React from 'react'
import { Form, Row, Col, Input, Button, notification } from 'antd'
import { request } from 'utils'

const FormItem = Form.Item;

const Fields = {
  formularName: {
    name: 'formularName',
    userProps: { label: '公式名称', labelCol: { span: 8 }, wrapperCol: { span: 16 } },
  },
  formularNo: {
    name: 'formularNo',
    userProps: { label: '公式代码', labelCol: { span: 8 }, wrapperCol: { span: 16 } },
  },
  formularType: {
    name: 'formularType',
    userProps: { label: '公式类型', labelCol: { span: 8 }, wrapperCol: { span: 16 } },
  },
  formularValue: {
    name: 'formularValue',
    userProps: { label: '公式值', labelCol: { span: 8 }, wrapperCol: { span: 16 } },
  },
  memo: {
    name: 'memo',
    userProps: { label: '公式备注', labelCol: { span: 8 }, wrapperCol: { span: 16 } },
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
        // this.props.submit(values);
        request({ url: '/api/formular', method: 'post', data: values }).then(data => notification.success({ message: '操作成功', description: data.data }))
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form
        onSubmit={this.handleSubmit.bind(this)}
      >
        <FormItem {...Fields.formularName.userProps}>
          {getFieldDecorator(Fields.formularName.name, { ...Fields.formularName.userRules })(
            <Input />
          )}
        </FormItem>
        <FormItem {...Fields.formularNo.userProps}>
          {getFieldDecorator(Fields.formularNo.name, { ...Fields.formularNo.userRules })(
            <Input />
          )}
        </FormItem>
        <FormItem {...Fields.formularType.userProps}>
          {getFieldDecorator(Fields.formularType.name, { ...Fields.formularType.userRules })(
            <Input />
          )}
        </FormItem>
        <FormItem {...Fields.formularValue.userProps}>
          {getFieldDecorator(Fields.formularValue.name, { ...Fields.formularValue.userRules })(
            <Input />
          )}
        </FormItem>
        <FormItem {...Fields.memo.userProps}>
          {getFieldDecorator(Fields.memo.name, { ...Fields.memo.userRules })(
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
          <Button type="primary" htmlType="submit">保存</Button>
        </FormItem>
      </Form>
    );
  }
}
