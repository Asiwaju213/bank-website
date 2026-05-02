const USERS_KEY = 'banking_app_users';
const CURRENT_USER_KEY = 'banking_app_current_user';
const TRANSACTIONS_KEY = 'banking_app_transactions';
const DEPOSITS_KEY = 'banking_app_deposits';
const PENDING_ACCOUNT_KEY = 'banking_app_pending_account';

const safeParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export const getAllUsers = () => {
  const raw = localStorage.getItem(USERS_KEY);
  return safeParse(raw) || [];
};

export const saveAllUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getCurrentUser = () => {
  const raw = localStorage.getItem(CURRENT_USER_KEY);
  const parsed = safeParse(raw);
  return typeof parsed === 'string' ? parsed : parsed?.username || null;
};

export const saveCurrentUser = (username) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ username }));
};

export const clearCurrentUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getAllTransactions = () => {
  const raw = localStorage.getItem(TRANSACTIONS_KEY);
  return safeParse(raw) || [];
};

export const saveTransactions = (transactions) => {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
};

export const getPendingAccount = () => {
  const raw = localStorage.getItem(PENDING_ACCOUNT_KEY);
  return safeParse(raw);
};

export const savePendingAccount = (data) => {
  localStorage.setItem(PENDING_ACCOUNT_KEY, JSON.stringify(data));
};

export const clearPendingAccount = () => {
  localStorage.removeItem(PENDING_ACCOUNT_KEY);
};

export const addUser = (user) => {
  const users = getAllUsers();
  users.push(user);
  saveAllUsers(users);
};

export const updateUser = (username, updatedUser) => {
  const users = getAllUsers();
  const nextUsers = users.map((user) => (user.username === username ? { ...user, ...updatedUser } : user));
  saveAllUsers(nextUsers);
};

export const getUserByUsername = (username) => {
  return getAllUsers().find((user) => user.username === username) || null;
};

export const getUserByEmail = (email) => {
  return getAllUsers().find((user) => user.email === email) || null;
};

export const getUserByPhone = (phone) => {
  return getAllUsers().find((user) => user.phone === phone) || null;
};

export const getUserByIdentifier = (identifier) => {
  if (!identifier) return null;
  const normalized = identifier.trim();
  return (
    getAllUsers().find(
      (user) =>
        user.username === normalized ||
        user.accountNumber === normalized ||
        user.email === normalized ||
        user.phone === normalized
    ) || null
  );
};

export const usernameExists = (username) => {
  return Boolean(getUserByUsername(username));
};

export const emailExists = (email) => {
  return Boolean(getUserByEmail(email));
};

export const phoneExists = (phone) => {
  return Boolean(getUserByPhone(phone));
};

export const accountNumberExists = (accountNumber) => {
  return getAllUsers().some((user) => user.accountNumber === accountNumber);
};

export const generateAccountNumber = () => {
  let accountNumber;
  do {
    accountNumber = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
  } while (accountNumberExists(accountNumber));
  return accountNumber;
};

export const addTransaction = (transaction) => {
  const transactions = [transaction, ...getAllTransactions()];
  saveTransactions(transactions);

  const user = getUserByUsername(transaction.user);
  if (user) {
    const userTransactions = [...(user.transactions || []), transaction];
    updateUser(user.username, { transactions: userTransactions });
  }
};

export const getAllDeposits = () => {
  const raw = localStorage.getItem(DEPOSITS_KEY);
  return safeParse(raw) || [];
};

export const saveDeposits = (deposits) => {
  localStorage.setItem(DEPOSITS_KEY, JSON.stringify(deposits));
};

export const addDeposit = (deposit) => {
  const deposits = [deposit, ...getAllDeposits()];
  saveDeposits(deposits);
};

export const updateDeposit = (id, updates) => {
  const deposits = getAllDeposits();
  const nextDeposits = deposits.map((deposit) => (deposit.id === id ? { ...deposit, ...updates } : deposit));
  saveDeposits(nextDeposits);
};

export const getDepositsByUser = (username) => {
  return getAllDeposits().filter((deposit) => deposit.user === username);
};

export const getTransactionsByUser = (currentUser) => {
  if (!currentUser) return [];
  const { username, accountNumber } = currentUser;
  return getAllTransactions().filter(
    (transaction) =>
      transaction.user === username ||
      transaction.target === username ||
      transaction.user === accountNumber ||
      transaction.target === accountNumber
  );
};
