import { Table, Form, Row, Col, Input, Button, Select, Icon, notification, DatePicker, AutoComplete } from 'antd';
import PropTypes from 'prop-types'
import React from 'react'
import './style.less';

class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      editable: false,
    };
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({value});
  }

  check() {
    this.setState({editable: false});
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  edit() {
    this.setState({editable: true});
  }

  formatDate(date, dateString) {
    this.setState({value: dateString});
    setTimeout(() => {
      this.check();
    }, 0);
  }

  autoSelect(value) {
    this.setState({value: /^\d+/.exec(value)[0]});
    setTimeout(() => {
      this.check();
    }, 0);
  }

  render() {
    const {value, editable} = this.state;
    // const disabledDate = {
    //   dateStart: (currentValue, record) => {
    //     if ((!record.beginTime && !record.endTime) || currentValue === undefined) {
    //       return false;
    //     }
    //     return currentValue.valueOf() > (new Date(record.endTime)).valueOf() + 86400000;
    //   },
    //   dateEnd: (currentValue, record) => {
    //     if ((!record.beginTime && !record.endTime) || currentValue === undefined) {
    //       return false;
    //     }
    //     return currentValue.valueOf() <= (new Date(record.beginTime)).valueOf();
    //   }
    // };

    return (<div className="editable-cell">
      {
        editable ?
        <div className="editable-cell-input-wrapper">
          <Input
            value={value}
            onChange={this.handleChange.bind(this)}
            onPressEnter={this.check.bind(this)}
            onBlur={this.check.bind(this)}
          />
          <Icon
            type="check"
            className="editable-cell-icon-check"
            onClick={this.check.bind(this)}
          />
        </div>
        :
        <div className="editable-cell-text-wrapper">
          {value || ' '}
          <Icon
            type="edit"
            className="editable-cell-icon"
            onClick={this.edit.bind(this)}
          />
        </div>
      }
    </div>);
  }
}

EditableCell.propTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
}

export default EditableCell
