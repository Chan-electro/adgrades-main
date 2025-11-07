const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

const SESSION_KEY = 'adgrades_admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const authenticateAdmin = (username: string, password: string): boolean => {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
};

export const createAdminSession = (): void => {
  const sessionData = {
    timestamp: Date.now(),
    expires: Date.now() + SESSION_DURATION,
    isAdmin: true
  };
  
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
};

export const isAdminAuthenticated = (): boolean => {
  try {
    const sessionData = localStorage.getItem(SESSION_KEY);
    if (!sessionData) return false;
    
    const session = JSON.parse(sessionData);
    return Date.now() < session.expires && session.isAdmin;
  } catch (error) {
    return false;
  }
};

export const logoutAdmin = (): void => {
  localStorage.removeItem(SESSION_KEY);
};