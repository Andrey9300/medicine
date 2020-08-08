import React from 'react';
import {Link} from 'react-router-dom';

import {NavItem, Collapse} from 'reactstrap';

interface IProps {}

interface IState {
  collapseAudit: boolean;
}

export class PestSidebarComponent extends React.PureComponent<IProps, IState> {
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
            <i className="fa fa-paw" aria-hidden="true" /> PEST-control{' '}
            <i className="fa fa-caret-down" aria-hidden="true" />
          </Link>
        </NavItem>
        <Collapse isOpen={collapseAudit} style={{marginLeft: '12px'}}>
          <NavItem>
            <Link to={'/services/pest/locations'}>
              <i className="fa fa-building-o" aria-hidden="true" /> Локации
            </Link>
          </NavItem>
        </Collapse>
      </>
    );
  }
}
