import axios from 'axios';

const basrUrl = "http://localhost:888";

function filterUrl(url){
    if(url.startsWith('http') || url.startsWith('https')){
        return url;
    };
    return basrUrl+"/"+url;
}

export default {
    get(url, params){
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: filterUrl(url),
                params: params || {}
            }).then(res => {
                resolve(res);
            }).catch(error => {
                reject(error);
            });
        });
    },
    post(url, params){
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: filterUrl(url),
                data: params || {},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret;
                  }],
            }).then(res => {
                resolve(res);
            }).catch(error => {
                reject(error);
            });
        });
    }
}