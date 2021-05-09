export const isUserLoggedIn = () => {
	return localStorage.getItem('userId') ? true : false;
};

export const getUserId = () => {
	return localStorage.getItem('userId');
};

export const redirectToLoginPage = (history) => {
	history.push('/login');
};
