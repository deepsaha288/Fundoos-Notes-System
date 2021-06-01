import axios from 'axios'


class Axios{

    postMethod =(url,data,isHeaderRequired = false) =>{
        return axios.post(url,data,isHeaderRequired)
    }
    getMethod =(url,isHeaderRequired = false) =>{
        return axios.get(url,isHeaderRequired)
    }

}
export default Axios;