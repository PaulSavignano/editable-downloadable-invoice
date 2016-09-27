import React from 'react'
import { browserHistory } from 'react-router'
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap'
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { Meteor } from 'meteor/meteor'

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'))

const userName = () => {
  const user = Meteor.user()
  const name = user && user.profile ? user.profile.name : ''
  return user ? `${name.first} ${name.last}` : ''
}

export const AuthenticatedNavigation = () => (
  <div>
    <Nav>
      <LinkContainer to="/invoices">
        <NavItem eventKey={ 1 } href="/invoices">Invoices</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={ 2 } title={ userName() } id="basic-nav-dropdown">
        <MenuItem eventKey={ 2.1 } onClick={ handleLogout }>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
)
