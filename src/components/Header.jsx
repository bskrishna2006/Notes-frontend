import React from 'react';

const Header = ({ handleToggleDarkMode, setIsAuthenticated }) => {
	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setIsAuthenticated(false);
	};

	return (
		<div className='header'>
			<h1>Notes</h1>
			<div className='header-buttons'>
				<button
					onClick={() =>
						handleToggleDarkMode(
							(previousDarkMode) => !previousDarkMode
						)
					}
					className='save'
				>
					Toggle Mode
				</button>
				<button onClick={handleLogout} className='save'>
					Logout
				</button>
			</div>
		</div>
	);
};

export default Header;