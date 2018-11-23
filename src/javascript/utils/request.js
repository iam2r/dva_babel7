import axios from 'axios';
const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default async (url, { type, payload: params }) => {
  console.log(`${type}:${url}====================>`)
  console.log('req==============>')
  console.log(params)
  try {

    const response = await axios[type](url, type == 'post' ? params : { params })
    checkStatus(response);
    console.log('res==============>')
    console.log(response)
    return response.data
  } catch (err) {
    console.log('res==============>')
    console.log({err})
    return { err }
  }
}
