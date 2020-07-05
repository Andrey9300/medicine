import React from 'react';
import {Input} from 'reactstrap';

interface IState {
  inputValue: string;
}

interface IProps {
  tableId: string;
}

export class TableSearch extends React.PureComponent<IProps, IState> {
  public state = {inputValue: ''};

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({inputValue: event.target.value});
  };

  private tableSearch = () => {
    const {inputValue} = this.state;
    const {tableId} = this.props;
    const table = document.getElementById(tableId) as HTMLTableElement;
    const regPhrase = new RegExp(inputValue, 'i');
    let flag = false;

    for (let i = 1; i < table.rows.length; i++) {
      flag = false;
      for (let j = table.rows[i].cells.length - 1; j >= 0; j--) {
        flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
        if (flag) {
          break;
        }
      }

      if (flag) {
        table.rows[i].style.display = '';
      } else {
        table.rows[i].style.display = 'none';
      }
    }
  };

  render() {
    const {inputValue} = this.state;

    return (
      <Input
        type="text"
        placeholder="Начните вводить"
        value={inputValue}
        onChange={this.handleChange}
        onKeyUp={this.tableSearch}
      />
    );
  }
}
