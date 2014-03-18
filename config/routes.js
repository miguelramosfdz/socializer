/* jshint strict:false */

exports.setup = function(app, passport) {

	// Route for serving templates
	app.get('/partials/:type/:file', function(req, res) {
		res.render('partials/'+req.params.type+'/'+req.params.file);
	});

	// route middleware to make sure a user is logged in
	this.isLoggedIn = function(req, res, next) {
		if (req.isAuthenticated()) {
			// if user is authenticated in the session, carry on
			next();
		} else {
			// if they aren't redirect them to the home page
			res.send(401);
		}
	};

	// Route for confirming if user is logged in
	app.get('/api/user', function(req, res) {
		res.send(req.isAuthenticated() ? { user: req.user } : { message: 'No user signed in' });
	});

	// Route to handle local authentication
	app.post('/api/user', passport.authenticate('local'));

	// Route for Facebook authentication and login
	app.get('/auth/facebook', passport.authenticate('facebook'));

	// Route to handle the Facebook authentication callback
	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
																	successRedirect: '/profile',
																	failureRedirect: '/'
																})
															);

	// Route for Twitter authentication and login
	app.get('/auth/twitter', passport.authenticate('twitter'));

	// Route to handle the Twitter authentication callback
	app.get('/auth/twitter/callback', passport.authenticate('twitter', {
																	successRedirect: '/profile',
																	failureRedirect: '/'
																})
															);
	// Route for logout
	app.post('/deauthenticate', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// Catch-all Route
	app.get('*', function(req, res){
		res.render('index', { title: 'Boiler' });
	});

};
