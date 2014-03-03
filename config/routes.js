/* jshint strict:false */

exports.setup = function(app, passport) {

	app.get('/', function(req, res){
		res.render('layout', { title: 'Boiler' });
	});

	app.get('/partials/:type/:file', function(req, res) {
		res.render('/partials'+req.params.type+'/'+req.params.file);
	});

	// route middleware to make sure a user is logged in
	this.isLoggedIn = function(req, res, next) {
		if (req.isAuthenticated()) {
			// if user is authenticated in the session, carry on
			return next();
		} else {
			// if they aren't redirect them to the home page
			res.redirect('/');
		}
	};

	// route for showing the profile page
	app.get('/profile', this.isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	/**
	 * Facebook Routes
	 */

	// Route for Facebook authentication and login
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	// Route to handle the Facebook authentication callback
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

	// Route for logout
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

};