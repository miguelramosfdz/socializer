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

	app.get('/isLoggedIn', function(req, res) {
		res.send(req.isAuthenticated() ? req.user : '0');
	});

	/**
	 * Facebook Routes
	 */

	// Route for Facebook authentication and login
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	// Route to handle the Facebook authentication callback
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect: '/profile',
			failureRedirect: '/'
		}));

	// Route to handle local authentication
	app.post('/login', passport.authenticate('local'), function(req, res) {
		res.send(req.user);
	});
	
	// Route for logout
	app.post('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// Catch-all Route
	app.get('*', function(req, res){
		res.render('index', { title: 'Boiler' });
	});

};