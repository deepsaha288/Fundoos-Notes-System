import axios from 'axios';

export default function axios_service(){

}

axios_service.prototype.post =  function(url,data,header){
  console.log(data);
    return axios.post(url,data,header)
}

axios_service.prototype.delete = function(url){
  return axios.delete(url,{
    headers: {
      Authorization: localStorage.getItem('token')
    },
  });
}

axios_service.prototype.Get =  function(url){
  return axios.get(url,{
      headers: {
        Authorization: localStorage.getItem('token')
      },
    });
  }