import React from 'react';
import {Nav, NavbarToggler, NavbarBrand} from 'reactstrap';

class Header extends React.PureComponent {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  sidebarToggle(event) {
    event.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(event) {
    event.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(event) {
    event.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(event) {
    event.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar d-print-none">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          &#9776;
        </NavbarToggler>
        <NavbarBrand href="/lmk/profile" />
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
          &#9776;
        </NavbarToggler>
        <Nav className="d-md-down-none" navbar />
        <Nav className="ml-auto" navbar />
      </header>
    );
  }
}

export default Header;
