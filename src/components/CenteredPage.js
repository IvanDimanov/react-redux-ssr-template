import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    margin: '50px auto 0px',
    width: 600,
  },
};

const CenteredPage = ({children, className}) => (
  <div className={className} style={styles.content}>
    {children}
  </div>
);

CenteredPage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.string,
};

export default CenteredPage;
