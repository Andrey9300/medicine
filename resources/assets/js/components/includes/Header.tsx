import React from 'react';
import {Nav, NavbarToggler, NavbarBrand} from 'reactstrap';

interface IProps {}

interface IState {
  dropdownOpen: boolean;
}

export class Header extends React.PureComponent<IProps> {
  public state: IState = {
    dropdownOpen: false,
  };

  private toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  private sidebarToggle = (event: any) => {
    event.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  };

  private sidebarMinimize = (event: any) => {
    event.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  };

  private mobileSidebarToggle = (event: any) => {
    event.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  };

  private asideToggle = (event: any) => {
    event.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  };

  render() {
    return (
      <header className="app-header navbar d-print-none">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          &#9776;
        </NavbarToggler>
        <NavbarBrand href="/services/profile" />
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
          &#9776;
        </NavbarToggler>
        <Nav className="d-md-down-none" navbar />
        <Nav className="ml-auto" navbar />
      </header>
    );
  }
}
