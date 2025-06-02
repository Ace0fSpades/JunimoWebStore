import api from './api';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/User';

interface UserUpdateData {
  name?: string;
  secondName?: string;
  thirdName?: string;
  email?: string;
  phoneNumber?: string;
}

export const AuthService = {
  login: async (credentials: LoginRequest) => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest) => {
    const response = await api.post<AuthResponse>('/auth/signup', userData);
    return response.data;
  },

  getCurrentUser: async () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return user as User;
    }
    return null;
  },

  updateUser: async (userId: number, userData: UserUpdateData) => {
    const response = await api.patch<User>(`/users/${userId}/`, userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
}; 