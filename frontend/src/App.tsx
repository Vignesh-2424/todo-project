// @ts-ignore
import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Plus, Filter, BarChart3 } from 'lucide-react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import StatsCard from './components/StatsCard';
import FilterBar from './components/FilterBar';
import { todoApi, Todo, TodoStats } from './services/api';
import toast from 'react-hot-toast';

export interface TodoFilters {
  status: 'all' | 'completed' | 'pending';
  priority: 'all' | 'low' | 'medium' | 'high';
  sortBy: 'createdAt' | 'title' | 'dueDate' | 'priority';
  order: 'asc' | 'desc';
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [stats, setStats] = useState<TodoStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [filters, setFilters] = useState<TodoFilters>({
    status: 'all',
    priority: 'all',
    sortBy: 'createdAt',
    order: 'desc',
  });

  // Fetch todos based on current filters
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const filterParams = {
        ...(filters.status !== 'all' && { status: filters.status }),
        ...(filters.priority !== 'all' && { priority: filters.priority }),
        sortBy: filters.sortBy,
        order: filters.order,
      };
      
      const todosData = await todoApi.getTodos(filterParams);
      setTodos(todosData);
    } catch (error) {
      toast.error('Failed to fetch todos');
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const statsData = await todoApi.getStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
    fetchStats();
  }, [filters]);

  const handleCreateTodo = async (todoData: any) => {
    try {
      await todoApi.createTodo(todoData);
      toast.success('Todo created successfully!');
      setShowForm(false);
      fetchTodos();
      fetchStats();
    } catch (error) {
      toast.error('Failed to create todo');
      console.error('Error creating todo:', error);
    }
  };

  const handleUpdateTodo = async (id: string, todoData: any) => {
    try {
      await todoApi.updateTodo(id, todoData);
      toast.success('Todo updated successfully!');
      setEditingTodo(null);
      fetchTodos();
      fetchStats();
    } catch (error) {
      toast.error('Failed to update todo');
      console.error('Error updating todo:', error);
    }
  };

  const handleToggleTodo = async (id: string) => {
    try {
      await todoApi.toggleTodo(id);
      fetchTodos();
      fetchStats();
    } catch (error) {
      toast.error('Failed to toggle todo');
      console.error('Error toggling todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await todoApi.deleteTodo(id);
      toast.success('Todo deleted successfully!');
      fetchTodos();
      fetchStats();
    } catch (error) {
      toast.error('Failed to delete todo');
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Todo Master</h1>
                <p className="text-gray-600 text-sm">Organize your tasks efficiently</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowStats(!showStats)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                title="Toggle Statistics"
              >
                <BarChart3 size={20} />
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
              >
                <Plus size={18} />
                <span>Add Todo</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        {showStats && stats && (
          <div className="mb-8 animate-slide-up">
            <StatsCard stats={stats} />
          </div>
        )}

        {/* Filter Bar */}
        <div className="mb-6">
          <FilterBar
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>

        {/* Todo List */}
        <div className="bg-white/60 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl">
          <TodoList
            todos={todos}
            loading={loading}
            onToggle={handleToggleTodo}
            onEdit={setEditingTodo}
            onDelete={handleDeleteTodo}
          />
        </div>
      </main>

      {/* Todo Form Modal */}
      {(showForm || editingTodo) && (
        <TodoForm
          todo={editingTodo}
          onSubmit={editingTodo ? 
            (data) => handleUpdateTodo(editingTodo._id, data) : 
            handleCreateTodo
          }
          onClose={() => {
            setShowForm(false);
            setEditingTodo(null);
          }}
        />
      )}
    </div>
  );
}

export default App;