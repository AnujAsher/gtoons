import axios, { AxiosRequestConfig } from 'axios';

const client = axios.create({
  baseURL: `/api/`
});

export const request = (options: AxiosRequestConfig) => {
  const onSuccess = (response: any) => {
    return response.data;
  };

  const onError = (error: any) => {
    console.error('Request Failed:', error.config);

    if (error.response) {
      // Request was made but server responded with something other than 2xx
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);

      switch (error.response.status) {
        case 401:
          console.error('Login expired. Logging the user out');
          break;
      }
    } else {
      // Something else happened while setting up the request that triggered an error
      console.error('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export const queryParams = (params: any) => {
  console.log(params);
  const query = Object.keys(params).map(key => `${key}=${params[key]}`);
  return `?${query.join('&')}`;
};
