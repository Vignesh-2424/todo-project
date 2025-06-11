import React from 'react';
import { CheckCircle2, Circle, Edit3, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { Todo } from '../services/api';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, loading, onToggle, onEdit, onDelete }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Loading todos...</span>
        </div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No todos found</h3>
        <p className="text-gray-500">Create your first todo to get started!</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
              todo.completed
                ? 'bg-gray-50/50 border-gray-200'
                : 'bg-white border-gray-100 hover:border-blue-200'
            }`}
          >
            <div className="flex items-start space-x-3">
              <button
                onClick={() => onToggle(todo._id)}
                className={`mt-1 transition-colors duration-200 ${
                  todo.completed
                    ? 'text-green-500 hover:text-green-600'
                    : 'text-gray-400 hover:text-blue-500'
                }`}
              >
                {todo.completed ? (
                  <CheckCircle2 size={20} />
                ) : (
                  <Circle size={20} />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3
                      className={`font-medium transition-colors duration-200 ${
                        todo.completed
                          ? 'text-gray-500 line-through'
                          : 'text-gray-900'
                      }`}
                    >
                      {todo.title}
                    </h3>
                    {todo.description && (
                      <p
                        className={`mt-1 text-sm ${
                          todo.completed
                            ? 'text-gray-400 line-through'
                            : 'text-gray-600'
                        }`}
                      >
                        {todo.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                        todo.priority
                      )}`}
                    >
                      {todo.priority}
                    </span>
                    <button
                      onClick={() => onEdit(todo)}
                      className="p-1 text-gray-400 hover:text-blue-500 transition-colors duration-200"
                      title="Edit todo"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(todo._id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      title="Delete todo"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                  <span>Created {formatDate(todo.createdAt)}</span>
                  {todo.dueDate && (
                    <div className="flex items-center space-x-1">
                      <Calendar size={12} />
                      <span
                        className={`${
                          isOverdue(todo.dueDate) && !todo.completed
                            ? 'text-red-500 font-medium'
                            : ''
                        }`}
                      >
                        Due {formatDate(todo.dueDate)}
                      </span>
                      {isOverdue(todo.dueDate) && !todo.completed && (
                        <AlertCircle size={12} className="text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;