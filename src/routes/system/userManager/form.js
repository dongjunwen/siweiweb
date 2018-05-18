import React from 'react'
import { Form, Row, Col, Input, Button, notification, Select } from 'antd'
import { request } from 'utils'

const FormItem = Form.Item;
const Option = Select.Option;

const Fields = {
  userNo: {
    name: 'userNo',
    userProps: { label: '账号', labelCol: { span: 6 }, wrapperCol: { span: 16 } },
  },
  userName: {
    name: 'userName',
    userProps: { label: '姓名', labelCol: { span: 6 }, wrapperCol: { span: 16 } },
  },
  nickName: {
    name: 'nickName',
    userProps: { label: '昵称', labelCol: { span: 6 }, wrapperCol: { span: 16 } },
  },
  phoneNum: {
    name: 'phoneNum',
    userProps: { label: '手机号', labelCol: { span: 6 }, wrapperCol: { span: 16 } },
  },
  emailAddr: {
    name: 'emailAddr',
    userProps: { label: '邮箱地址', labelCol: { span: 6 }, wrapperCol: { span: 16 } },
  },
  status: {
    name: 'status',
    userProps: { label: '账号状态', labelCol: { span: 6 }, wrapperCol: { span: 16 } },
  },
  memo: {
    name: 'memo',
    userProps: { label: '备注', labelCol: { span: 6 }, wrapperCol: { span: 16 } },
  },
};
export default class AdvancedSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marketNo: '',
    };
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
    //const materialOptions = this.props.materials.map(material => <Option key={material.dictCode}>{material.dictName}</Option>)

    return (
      <Form
        onSubmit={this.handleSubmit.bind(this)}
      >
        <FormItem {...Fields.userNo.userProps}>
          {getFieldDecorator(Fields.userNo.name, { ...Fields.userNo.userRules,initialValue: dataDetail.userNo })(
            <Input />
          )}
        </FormItem>
        <FormItem {...Fields.userName.userProps}>
          {getFieldDecorator(Fields.userName.name, {  ...Fields.userName.userRules,initialValue: dataDetail.userName })(
            <Input />
          )}
        </FormItem>
        <FormItem {...Fields.nickName.userProps}>
          {getFieldDecorator(Fields.nickName.name, { ...Fields.nickName.userRules, initialValue: dataDetail.nickName  })(
            /*<Select>
              {materialOptions}
            </Select>*/
          )}
        </FormItem>
        <FormItem {...Fields.phoneNum.userProps}>
          {getFieldDecorator(Fields.phoneNum.name, {  ...Fields.phoneNum.userRules,initialValue: dataDetail.phoneNum })(
            <Input />
          )}
        </FormItem>
        <FormItem {...Fields.emailAddr.userProps}>
          {getFieldDecorator(Fields.emailAddr.name, {  ...Fields.emailAddr.userRules, initialValue: dataDetail.emailAddr })(
            <Input />
          )}
        </FormItem>
        <FormItem {...Fields.status.userProps}>
          {getFieldDecorator(Fields.status.name, {   ...Fields.status.userRules,initialValue: dataDetail.name })(
            <Input />
          )}
        </FormItem>
         <FormItem {...Fields.memo.userProps}>
          {getFieldDecorator(Fields.memo.name, {  ...Fields.memo.userRules, initialValue: dataDetail.memo })(
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
