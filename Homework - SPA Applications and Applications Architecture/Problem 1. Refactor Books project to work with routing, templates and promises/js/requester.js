var App = App || {};

App.baseUrl = "https://api.parse.com/1/classes/";

App.Requester = (function () {
	function makeRequest(method, url, data, onSuccess, onError){
		return $.ajax({
			method: method,
			url: url,
			data: data,
			headers: {
				'X-Parse-Application-Id' : '9aWvS8y2dSQ6QOwHG6I1bqCmYWJltpMlcXFY7sbo',
				'X-Parse-REST-API-Key': 'iEi0GmpDXhGYIP6ehczN1eyVwGTHklPcYC98D5VW'
			},
			success: onSuccess,
			error: onError
		});
	}

	function getRequest (url, onSuccess, onError) {
		return makeRequest('GET', url, null , onSuccess, onError);
	}

	function postRequest (url, data, onSuccess, onError) {
		return makeRequest('POST', url, data , onSuccess, onError);
	}

	function putRequest (url, data, onSuccess, onError) {
		return makeRequest('PUT', url, data , onSuccess, onError);
	}

	function deleteRequest (url, onSuccess, onError) {
		return makeRequest('DELETE', url, null , onSuccess, onError);
	}

	return {
		getRequest: getRequest,
		postRequest: postRequest,
		putRequest: putRequest,
		deleteRequest: deleteRequest
	};
})(); 