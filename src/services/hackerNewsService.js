import BaseApiService from './BaseApiService';

const BASE_URL = 'https://hn.algolia.com/api/v1';
const client = new BaseApiService({ baseURL: BASE_URL });
const client2 = new BaseApiService({});

const hackerNewsApi = {};

hackerNewsApi.getPageWiseData = (page = 0) => {
    return client.get(`/search?page=${page}`);
};

hackerNewsApi.getDataFromStorageServices = (key = null) => {
    return new Promise((resolve, reject) => {
        let data = {};
        if (key) {
            data = JSON.parse(localStorage.getItem(key));
        }
        resolve(data);
    })
}

hackerNewsApi.setDataToStorageService = (key, data) => {
    return new Promise((resolve, reject) => {
        if (key) {
            let items = JSON.stringify(data);
            localStorage.setItem(key, items);
        }
        resolve('done');
    })
}


hackerNewsApi.getHello = (page = 0) => {
    return client2.get(`/hello`);
};

export default hackerNewsApi;