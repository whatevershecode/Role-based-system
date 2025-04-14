export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return {
      username: decoded.username,
      role: decoded.role,
    };
  } catch (error) {
    console.error('Invalid token');
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};
