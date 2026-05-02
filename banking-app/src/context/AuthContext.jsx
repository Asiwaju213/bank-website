import { useState } from 'react';
import {
  addUser,
  getCurrentUser,
  getUserByIdentifier,
  getUserByUsername,
  getUserByEmail,
  getUserByPhone,
  saveCurrentUser,
  clearCurrentUser,
  updateUser,
} from '../utils/storage';
import { AuthContext } from './auth-context';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const activeUsername = getCurrentUser();
    return activeUsername ? getUserByUsername(activeUsername) : null;
  });
  const loading = false;

  const login = (identifier, password) => {
    const user = getUserByIdentifier(identifier);
    if (!user || user.password !== password) {
      return { success: false, message: 'Invalid username or password.' };
    }
    saveCurrentUser(user.username);
    setCurrentUser(user);
    return { success: true };
  };

  const signup = ({ fullName, phone, email, username, password, accountNumber }) => {
    if (getUserByIdentifier(username)) {
      return { success: false, message: 'Username already exists.' };
    }
    if (getUserByEmail(email)) {
      return { success: false, message: 'Email already exists.' };
    }
    if (getUserByPhone(phone)) {
      return { success: false, message: 'Phone number already exists.' };
    }
    const newUser = {
      fullName,
      phone,
      email,
      username,
      password,
      accountNumber,
      balance: 0,
      transactions: [],
    };
    addUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    clearCurrentUser();
    setCurrentUser(null);
  };

  const refreshUser = () => {
    const activeUsername = getCurrentUser();
    const user = activeUsername ? getUserByUsername(activeUsername) : null;
    setCurrentUser(user);
    return user;
  };

  const updateBalance = (newBalance) => {
    if (!currentUser) return null;
    const updated = { ...currentUser, balance: newBalance };
    updateUser(currentUser.username, updated);
    setCurrentUser(updated);
    return updated;
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, loading, login, signup, logout, refreshUser, updateBalance }}
    >
      {children}
    </AuthContext.Provider>
  );
};
