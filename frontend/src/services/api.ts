import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoData {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export interface TodoStats {
  total: number;
  completed: number;
  pending: number;
  highPriority: number;
}

export const todoApi = {
  // Get all todos
  getTodos: async (filters?: {
    status?: 'completed' | 'pending';
    priority?: 'low' | 'medium' | 'high';
    sortBy?: string;
    order?: 'asc' | 'desc';
  }): Promise<Todo[]> => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.order) params.append('order', filters.order);

    const response = await api.get(`/todos?${params.toString()}`);
    return response.data;
  },

  // Get a specific todo
  getTodo: async (id: string): Promise<Todo> => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  // Create a new todo
  createTodo: async (data: CreateTodoData): Promise<Todo> => {
    const response = await api.post('/todos', data);
    return response.data;
  },

  // Update a todo
  updateTodo: async (id: string, data: Partial<CreateTodoData>): Promise<Todo> => {
    const response = await api.put(`/todos/${id}`, data);
    return response.data;
  },

  // Toggle todo completion status
  toggleTodo: async (id: string): Promise<Todo> => {
    const response = await api.patch(`/todos/${id}/toggle`);
    return response.data;
  },

  // Delete a todo
  deleteTodo: async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },

  // Get todo statistics
  getStats: async (): Promise<TodoStats> => {
    const response = await api.get('/todos/stats/summary');
    return response.data;
  },
};

export default api;