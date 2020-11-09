import algoliasearch from 'algoliasearch';

const ALGOLIA_ID = 'SHU9ZMHYCW';
const ALGOLIA_SEARCH_KEY = '291e943309e59bc498b4e6460f162d8c';
const ALGOLIA_INDEX_NAME = 'dev_misoten';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_SEARCH_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

export default index;