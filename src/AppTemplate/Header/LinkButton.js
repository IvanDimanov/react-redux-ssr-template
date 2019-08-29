import React from 'react';
import PropTypes from 'prop-types';
import useReactRouter from 'use-react-router';
import {Link} from 'react-router-dom';

const LinkButton = ({path, label}) => {
  const {location} = useReactRouter();

  return (
    <Link
      to={path}
      className={location.pathname.startsWith(path) ? 'nav-link active' : 'nav-link'}
    >
      {label}
    </Link>
  );
};

LinkButton.propTypes = {
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default LinkButton;
