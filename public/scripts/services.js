"use strict";

app.service("Auth",
	function ($http) {
		return {

			signUp: function(params) {
				return $http.post("/signup", params);
			},

			signin: function(params) {
				return $http.post("/signin", params);
			},

			signOut: function() {
				return $http.get("/signout");
			},

			signedin: function() {
				return $http.get("/signedin");
			}

		};
});