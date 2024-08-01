import axios from 'axios';
import { IResolvers } from '@graphql-tools/utils';
import { loadFiles } from '@graphql-tools/load-files';
import path from 'path';

const SWAPI_BASE_URL = 'https://swapi.dev/api/people/';

const resolvers: IResolvers = {
  Query: {
    StarWarsCharacter: async (_: any, { id }: { id: string }) => {
      try {
        const response = await axios.get(`${SWAPI_BASE_URL}${id}/`);
        console.log('API response (StarWarsCharacter):', response.data); // Log the API response
        return {
          id,
          name: response.data.name || 'Unknown',
          height: response.data.height || 'Unknown',
          mass: response.data.mass || 'Unknown',
          hair_color: response.data.hair_color || 'Unknown',
          skin_color: response.data.skin_color || 'Unknown',
          eye_color: response.data.eye_color || 'Unknown',
          birth_year: response.data.birth_year || 'Unknown',
          gender: response.data.gender || 'Unknown',
        };
      } catch (error) {
        console.error(`Failed to fetch character with id ${id}: `, error);
        throw new Error(`Failed to fetch character with id ${id}`);
      }
    },

    allStarWarsCharacters: async () => {
      try {
        const response = await axios.get(SWAPI_BASE_URL);
        console.log('API response (allStarWarsCharacters):', response.data); // Log the API response
        return response.data.results.map((character: any, index: number) => ({
          id: index + 1,
          name: character.name || 'Unknown',
          height: character.height || 'Unknown',
          mass: character.mass || 'Unknown',
          hair_color: character.hair_color || 'Unknown',
          skin_color: character.skin_color || 'Unknown',
          eye_color: character.eye_color || 'Unknown',
          birth_year: character.birth_year || 'Unknown',
          gender: character.gender || 'Unknown',
        }));
      } catch (error) {
        console.error('Failed to fetch characters: ', error);
        throw new Error('Failed to fetch characters');
      }
    },
  },
};

export default resolvers;

export const getResolvers = async () => {
  const resolversArray = await loadFiles(path.join(__dirname, './**/*resolvers.{js,ts}'));
  const resolvers = resolversArray.reduce((acc, resolver) => {
    return { ...acc, ...resolver };
  }, {});
  return resolvers;
};
