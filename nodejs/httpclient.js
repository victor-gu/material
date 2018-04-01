import axios from 'axios';
import router from '../router'

// const base_wsurl = 'ws://aiminer.cc:88';
// const base_url = 'http://aiminer.cc:88';

const base_wsurl = 'ws://floats.top:88';
const base_url = 'http://floats.top:88';

// const base_wsurl = 'ws://10.3.50.43:88';
// const base_url = 'http://localhost:88';

export default {
	base_wsurl,
	base_url,
	socket(_wsurl){
		var url = _wsurl && _wsurl.startsWith('ws') ? _wsurl : `${base_wsurl}/${_wsurl}`;
		var ws = new WebSocket(url);
		return ws;
	},
	get(_url, _params){
		var url = _url && _url.startsWith('http') ? _url : `${base_url}/${_url}`;
		return new Promise((resolve, reject) => {
 			axios({
                url: url,
				params: _params || {},
				headers: {Authorization: window.sessionStorage.getItem('dktoken')}
            }).then(res => {
				if(!res.data.status && res.data.error == "unauthorized"){
					router.push('login');
					return false;
				}
				resolve(res)
            }).catch(error => {
            	reject(error)
            })
		})
	},
	post(_url, _params){
		var url = _url && _url.startsWith('http') ? _url : `${base_url}/${_url}`;
		return new Promise((resolve, reject) => {
 			axios({
				url: url,
				method: 'post',
				data: _params || {},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: window.sessionStorage.getItem('dktoken')
				},
				transformRequest: [function (data) {
					let ret = ''
					for (let it in data) {
					  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
					return ret
				  }], 
            }).then(res => {
				if(!res.data.status && res.data.error == "unauthorized"){
					router.push('login');
					return false;
				}				
                resolve(res)
            }).catch(error => {
				
            	reject(error)
            })
		})
	}
}