export const listItems = {
  index(config = {}) {
    return fetch(process.env.VUE_APP_LIST_API, config)
      .then((response) => response.json())
      .then((data) => data);
  },
};
