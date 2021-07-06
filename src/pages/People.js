import React, {useEffect} from 'react';
import useReactRouter from 'use-react-router';
import {useDispatch, useSelector} from 'react-redux';

import {fetchPerson, selectPeople} from '../AppTemplate/reducers/peopleSlice';

import Button from 'react-bootstrap/Button';

import CenteredPage from '../components/CenteredPage';
import PersonCard from '../forms/PersonCard';

import getRandomNumber from '../utils/getRandomNumber';

const LUKE_PERSON_ID = 1;
const LEIA_PERSON_ID = 5;

const styles = {
  header: {
    textAlign: 'center',
  },
  buttonWrap: {
    textAlign: 'center',
  },
  button: {
    width: '120px',
  },
  error: {
    color: 'red',
  },
};

const People = () => {
  const {match: {params: {personId: paramsPersonId}}, history} = useReactRouter();
  const {person, isLoading, errors} = useSelector(selectPeople);
  const dispatch = useDispatch();

  const personId = Number(paramsPersonId);

  useEffect(() => {
    if (isLoading || errors.length) {
      /* No need to check anything if loading is in progress or user need to fix validation errors */
      return;
    }

    if (!person) {
      /* When we initially render the page there's no Person loaded yet */
      dispatch(fetchPerson(personId));
    } else if (person.personId !== personId) {
      /* Update the URL according to the loaded Person */
      history.push(`/people/${person.personId}`);
    }
  }, [(person || {}).personId, isLoading, errors.length]);

  const onClickHandler = (personId) => () => dispatch(fetchPerson(personId));

  return (
    <CenteredPage style={styles.CenteredPage}>
      <h3 style={styles.header}>Star Wars notable characters</h3>
      <br />

      {person && <PersonCard person={person} isLoading={isLoading} />}

      <br />
      <hr />
      <br />

      <div style={styles.buttonWrap}>
        <Button
          className="m-2"
          style={styles.button}
          variant='outline-primary'
          onClick={onClickHandler(LUKE_PERSON_ID)}
          disabled={isLoading}
        >
          Luke
        </Button>

        <Button
          className="m-2"
          style={styles.button}
          variant='outline-danger'
          onClick={onClickHandler(LEIA_PERSON_ID)}
          disabled={isLoading}
        >
          Leia
        </Button>

        <Button
          className="m-2"
          style={styles.button}
          variant='outline-dark'
          onClick={onClickHandler(getRandomNumber(1, 83))}
          disabled={isLoading}
        >
          Random ?
        </Button>

        <br />
        <br />

        <Button
          className="m-2"
          style={styles.button}
          variant='danger'
          onClick={onClickHandler()}
          disabled={isLoading}
        >
          Form Validation Error #1
        </Button>

        <Button
          className="m-2"
          style={styles.button}
          variant='danger'
          onClick={onClickHandler(0)}
          disabled={isLoading}
        >
          Form Validation Error #2
        </Button>

        <Button
          className="m-2"
          style={styles.button}
          variant='danger'
          onClick={onClickHandler(100)}
          disabled={isLoading}
        >
          Response Error
        </Button>
      </div>

      <br />
      <br />

      {errors.map(({message}, index) => <div key={index} style={styles.error}>{message}</div>)}

      <br />
    </CenteredPage>
  );
};

export default People;
