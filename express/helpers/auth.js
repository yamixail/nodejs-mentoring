import { user } from "../consts/auth";

export const findUser = ({ login, password }) => {
	if (login !== user.login || password !== user.password) {
		return false;
	}

	return user;
};

export const checkUser = ({ login, password }) => {
	console.log(login, password);
	return login === user.login && password === user.password;
};
