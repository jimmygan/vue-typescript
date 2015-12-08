import Vue = require('vue');
import VueResource = require('vue-resource');
Vue.use(VueResource);

namespace TestGlobalOption {
	Vue.http.options.root = '/root';
	Vue.http.headers.common['Authorization'] = 'Basic';
	
	new Vue({
		http: {
			root: '/root',
			headers: {
				'Authorization': 'Basic'
			}
		}
	});
}

namespace TestHTTP {
	Vue.http.get('/someUrl', (data, status, request) => {
	}).error((data, status, request) => {
		var n: number = status;
	})
	
	new Vue({}).$http.post('/someUrl', {a: 1}, (data) => {}, {
		url: '',
		data: '30',
		method: 'GET',
		headers: {
			'Authorization': 'Basic'
		},
		success: function(data, status, request) {
			var n: number = status;
		},
		error: function(data, status, request) {
			var n: number = status;
		},
		beforeSend: function(request, options) {
			var n: number = request.DONE;
		},
		emulateHTTP: false,
		xhr: new XMLHttpRequest(),
		jsonp: "callback"
	})
}

namespace TestResource {
	var resource = Vue.resource('someItem/:id');
	resource = new Vue({}).$resource('someItem/:id');
	resource.get({id: 1}, (item, status, request) => {})
	resource.save({id: 1}, {item: {a: 1}}, (data, status, request) => {
		console.log(data)
	}).error((data, status) => {
		var n: number = status;
	})
}