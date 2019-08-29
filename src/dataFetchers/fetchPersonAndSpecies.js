import request from './request';

const fetchPersonAndSpecies = async (personId) => {
  /* Fetch general Person data like `name`, `height`, `mass` */
  const {data: personData} = await request.get(`https://swapi.co/api/people/${personId}/`);
  // const personData = {"name":"BB8","height":"unknown","mass":"unknown","hair_color":"none","skin_color":"none","eye_color":"black","birth_year":"unknown","gender":"none","homeworld":"https://swapi.co/api/planets/28/","films":["https://swapi.co/api/films/7/"],"species":["https://swapi.co/api/species/2/"],"vehicles":[],"starships":[],"created":"2015-04-17T06:57:38.061346Z","edited":"2015-04-17T06:57:38.061453Z","url":"https://swapi.co/api/people/87/"};

  /* Fetch all the species that are related to the Person */
  const speciesResponses = await Promise.all(personData.species.map(request.get));
  // const speciesResponses = [{
  //   data: {"name":"Droid","classification":"artificial","designation":"sentient","average_height":"n/a","skin_colors":"n/a","hair_colors":"n/a","eye_colors":"n/a","average_lifespan":"indefinite","homeworld":null,"language":"n/a","people":["https://swapi.co/api/people/2/","https://swapi.co/api/people/3/","https://swapi.co/api/people/8/","https://swapi.co/api/people/23/","https://swapi.co/api/people/87/"],"films":["https://swapi.co/api/films/2/","https://swapi.co/api/films/7/","https://swapi.co/api/films/5/","https://swapi.co/api/films/4/","https://swapi.co/api/films/6/","https://swapi.co/api/films/3/","https://swapi.co/api/films/1/"],"created":"2014-12-10T15:16:16.259000Z","edited":"2015-04-17T06:59:43.869528Z","url":"https://swapi.co/api/species/2/"},
  // }];

  return {
    ...personData,
    personId,
    fetchedSpecies: speciesResponses.map(({data}) => data),
  };
};

export default fetchPersonAndSpecies;
