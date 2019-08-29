import React from 'react';
import {useSelector} from 'react-redux';

import {selectPeople} from '../reducers/peopleSlice';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import LinkButton from './LinkButton';

const Header = () => {
  const {person} = useSelector(selectPeople);

  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <LinkButton path='/home' label='Home' />
          <LinkButton path='/people' label='People' />
          <LinkButton path='/not-found' label='(Test broken link)' />
        </Nav>

        {person && (<div>
          Last loaded character: <b>{person.name}</b>
        </div>)}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
