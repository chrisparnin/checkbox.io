buffer_string.toString();
// read in different encoding
buffer_string.toString('hex');
// read from 0 to 10.
buffer_string.toString('utf-8', 0, 10);

function sortUsersByAge(users) {
	users.sort(function(a, b) {
		return a.age < b.age ? -1 : 1
	})
}

function verifyPassword(user, password, done) {
	if(typeof password !== 'string') {
		done(new Error("password should be a string"))
		return
	}

	computeHash(password, user.passwordHashOpts, function(err, hash) {
		if(err) {
			done(err)
			return
		}
		
		done(null, hash === user.passwordHash)
	})
}