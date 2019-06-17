import React, { Component } from 'react';
import { } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { Menu, Segment } from 'semantic-ui-react';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
        <div>
            <Segment inverted>
                <Menu inverted >

                    <Menu.Item>
                        OnboardingTask_React
                    </Menu.Item>
                    <Menu.Item as={Link} to='/getproducts'>
                        Products
                    </Menu.Item>
                    <Menu.Item as={Link} to='/getcustomers'>
                        Customers
                    </Menu.Item>
                    <Menu.Item as={Link} to='/getstores'>
                        Stores
                    </Menu.Item>
                    <Menu.Item as={Link} to='/getsales'>
                        Sales
                    </Menu.Item>

                </Menu>
            </Segment>
        </div>
    );
  }
}
