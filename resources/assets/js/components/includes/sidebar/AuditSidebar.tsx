import React from 'react';
import {Link} from 'react-router-dom';

import {NavItem, Collapse} from 'reactstrap';

interface IProps {}

interface IState {
  collapseAudit: boolean;
}

export class AuditSidebarComponent extends React.PureComponent<IProps, IState> {
  public state: IState = {
    collapseAudit: false,
  };

  private toggleAudit = () => {
    const {collapseAudit} = this.state;
    this.setState({collapseAudit: !collapseAudit});
  };

  render() {
    const {collapseAudit} = this.state;

    return (
      <>
        <NavItem onClick={this.toggleAudit}>
          <Link to={'#'}>
            <i className="fa fa-search" aria-hidden="true" /> Аудит{' '}
            <i className="fa fa-caret-down" aria-hidden="true" />
          </Link>
        </NavItem>
        <Collapse isOpen={collapseAudit} style={{marginLeft: '12px'}}>
          <NavItem>
            <Link to={'/services/audits/criterionLists'}>
              <i className="fa fa-book" aria-hidden="true" /> Чек-листы
            </Link>
          </NavItem>
          <NavItem>
            <Link to={'/services/audits/auditors'}>
              <i className="fa fa-user-circle" aria-hidden="true" /> Аудиторы
            </Link>
          </NavItem>
          <NavItem>
            <Link to={'/services/audits/objects'}>
              <i className="fa fa-book" aria-hidden="true" /> Объекты
            </Link>
          </NavItem>
        </Collapse>
      </>
    );
  }
}
