import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  loyaltyPoints: number;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  addLoyaltyPoints: (points: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Validate inputs
      if (!email || !password || !name) {
        throw new Error('All fields are required');
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some((u: User) => u.email === email)) {
        throw new Error('User already exists');
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        loyaltyPoints: 0,
        createdAt: new Date().toISOString(),
      };

      // Save user data (excluding password in user object for security)
      const userData = { ...newUser, password }; // Store password separately in real app
      users.push(userData);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Set current user
      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: any) => u.email === email && u.password === password);

      if (!foundUser) {
        throw new Error('Invalid credentials');
      }

      // Remove password before setting user state
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Update in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  const addLoyaltyPoints = (points: number) => {
    if (!user) return;
    updateProfile({ loyaltyPoints: user.loyaltyPoints + points });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, addLoyaltyPoints }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
