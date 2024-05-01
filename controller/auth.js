const User = require('../model/user');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
	const username = req.body.username;
	const email = req.body.email; 
  const password = req.body.password;
	if ((username || email) && password) {
		User.findOne({ $or: [{username: username}, {email: email}], password: password })
			.then((user) => {
				if (user) {
					res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
						token: jwt.sign({ user: username || email }, 'secret_key'),
					});
				} else {
					res.status(401);
					res.send('username or password is incorrect');
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}
};
