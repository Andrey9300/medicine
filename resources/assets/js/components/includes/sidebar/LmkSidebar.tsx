import React from 'react';
import {Link} from 'react-router-dom';

import {NavItem, Collapse} from 'reactstrap';

interface IProps {}

interface IState {
  collapseLmk: boolean;
}

export class LmkSidebarComponent extends React.PureComponent<IProps, IState> {
  public state: IState = {
    collapseLmk: false,
  };

  private toggleLmk = () => {
    const {collapseLmk} = this.state;
    this.setState({collapseLmk: !collapseLmk});
  };

  render() {
    const {collapseLmk} = this.state;

    return (
      <>
        <NavItem onClick={this.toggleLmk}>
          <Link to={'#'}>
            <i className="fa fa-user-md" aria-hidden="true" /> ЛМК{' '}
            <i className="fa fa-caret-down" aria-hidden="true" />
          </Link>
        </NavItem>
        <Collapse isOpen={collapseLmk} style={{marginLeft: '12px'}}>
          <NavItem>
            <Link to={'/services/lmk/organizations'}>
              <i className="fa fa-building-o" aria-hidden="true" /> Объекты
            </Link>
          </NavItem>
          <NavItem>
            <Link to={'/services/lmk/employees'}>
              <i className="fa fa-users" aria-hidden="true" /> Сотрудники
            </Link>
          </NavItem>
          <NavItem>
            <Link to={'/services/lmk/hospitals'}>
              <i className="fa fa-stethoscope" aria-hidden="true" /> Медицинские
              центры
            </Link>
          </NavItem>
          <NavItem>
            <Link to={'/services/lmk/researches'}>
              <i className="fa fa-heartbeat" aria-hidden="true" /> Исследования
            </Link>
          </NavItem>
        </Collapse>
      </>
    );
  }
}

