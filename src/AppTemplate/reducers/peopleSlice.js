import {createSlice, createSelector} from 'redux-starter-kit';
import immutable from 'immutable';

import delay from '../../utils/delay';

import {getInitialFetchedServerData} from '../../dataFetchers/initialFetchedServerData';
import fetchPersonAndSpecies from '../../dataFetchers/fetchPersonAndSpecies';

/**
 * NB: Please know that the real limit is from 1 to 88! but in order to simulate
 * error response we need to be able to send invalid ids like 89.
 */
const minPersonId = 1;
const maxPersonId = 100;

const peopleSlice = createSlice({
  slice: 'people',

  initialState: {
    person: (getInitialFetchedServerData() || {}).person || null,
    isLoading: false,
    errors: [],
  },

  reducers: {
    setErrors(state, {payload = []}) {
      state.errors = payload;
    },

    setLoading(state, {payload = false}) {
      state.isLoading = payload;
    },

    setPerson(state, {payload = {}}) {
      state.person = payload;
    },
  },
});

export const selectPeople = createSelector(
    [peopleSlice.selectors.getPeople],
    (state) => immutable.fromJS(state).toJS()
);

export function fetchPerson(personId) {
  return async (dispatch) => {
    const newErrors = [];
    if (!Number.isInteger(personId)) {
      newErrors.push(new TypeError(`"personId" must be an Integer but it is "${personId}"`));
    }

    if (personId < minPersonId || personId > maxPersonId) {
      newErrors.push(
          new RangeError(
              `"personId"(${personId}) must be no less ` +
              `than ${minPersonId} and no higher than ${maxPersonId}`
          )
      );
    }

    dispatch(peopleSlice.actions.setErrors(newErrors));
    if (newErrors.length) {
      return;
    }

    dispatch(peopleSlice.actions.setLoading(true));

    /**
     * Normally the StarWars API is really fast so in order to test the loading UX
     * we need to artificially delay the request :D
     */
    await delay(2000);

    try {
      const person = await fetchPersonAndSpecies(personId);
      dispatch(peopleSlice.actions.setPerson(person));
    } catch (error) {
      if ((error.response || {}).status === 404) {
        dispatch(peopleSlice.actions.setErrors([new ReferenceError(`Person with id "${personId}" was not found`)]));
        return;
      }

      dispatch(peopleSlice.actions.setErrors([error]));
    } finally {
      dispatch(peopleSlice.actions.setLoading(false));
    }
  };
}

export default peopleSlice;
