import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const styles = {
  card: {
    width: 500,
    margin: 'auto',
  },
  title: {
    fontSize: 14,
  },

  propertyLabel: {
    verticalAlign: 'top',
    textTransform: 'capitalize',
    marginLeft: 10,
  },
  propertyDimension: {
    verticalAlign: 'super',
    fontSize: 10,
  },
};

const PersonCard = ({person, isLoading}) => (
  <Card style={styles.card}>
    <Card.Body>
      <h4>
        {person.name}
        {isLoading && <Spinner animation='border' className="ml-1" />}
      </h4>

      <Container>
        <Row>
          <Col>
            <i className='material-icons'>accessibility_new</i>
            <span style={styles.propertyLabel}>
              {person.fetchedSpecies.map(({name}) => name).join(', ')}
            </span>
            <br />

            <i className='material-icons'>visibility</i>
            <span style={styles.propertyLabel}>
              {person.eye_color}
            </span>
          </Col>

          <Col>
            <i className='material-icons'>vertical_align_top</i>
            <span style={styles.propertyLabel}>
              {person.height}
              <em style={styles.propertyDimension}>cm</em>
            </span>
            <br />

            <i className='material-icons'>stop</i>
            <span style={styles.propertyLabel}>
              {person.mass}
              <em style={styles.propertyDimension}>kg</em>
            </span>
          </Col>
        </Row>
      </Container>
    </Card.Body>
  </Card>
);

PersonCard.propTypes = {
  person: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default PersonCard;
