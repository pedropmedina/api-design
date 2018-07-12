import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

import { User } from '../resources/user/user.model';

const jwtSecret = 'helloThereSecret';
const checkToken = expressJwt({ secret: jwtSecret });
const disableAuth = false;

export const signin = (req, res, next) => {
	const token = signToken(req.user.id);
	res.json({ token: token });
};

export const decodeToken = () => (req, res, next) => {
	if (disableAuth) {
		return next();
	}

	if (req.query && req.query.hasOwnProperty('access_token')) {
		req.headers.authorization = `Bearer ${req.query.access_token}`;
	}

	// the result of calling expressJwt({secret: 'some secret'})
	// returns a function that we saved in checkToken
	// It will check for tokens in the header of the request
	// and verify with the provided secret. If valid it'll create
	// a user in the req with the info from the token.
	// All it does is automate the process, so that we don't have
	// to do the validation ourselves
	checkToken(req, res, next);
};

export const getFreshUser = () => (req, res, next) => {
	return User.findById(req.user.id)
		.then(user => {
			if (!user) {
				res.status(401).send('Unauthorized');
			} else {
				req.user = user;
				next();
			}
		})
		.catch(error => next(error));
};

export const verifyUser = () => (req, res, next) => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.status(400).send('You need a username and password');
	}

	User.findOne({ username: username })
		.then(user => {
			if (!user) {
				res.status(401).send('No user with the given username');
			} else {
				if (!user.authenticate(password)) {
					res.status(401).send('Wrong password');
				} else {
					req.user = user;
					next();
				}
			}
		})
		.catch(error => next(error));
};

export const signToken = id =>
	jwt.sign({ id }, jwtSecret, { expiresIn: '30d' });

export const protect = [decodeToken(), getFreshUser()];
