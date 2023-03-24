// actually is a proxy that routes http reqs through TOR because the 'TVMAZE' is filter.

const baseUri = "http://localhost:3002/tvmaze";

export default {
  get(params) {
    let url = baseUri + params;

    return fetch(url).then((resp) => resp.json());
  },
};
