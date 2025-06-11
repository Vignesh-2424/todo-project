import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, ListTodo } from 'lucide-react';
import { TodoStats } from '../services/api';

interface StatsCardProps {
  stats: TodoStats;
}

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Todos',
      value: stats.total,
      icon: ListTodo,
      color: 'bg-blue-50 text-blue-600',
      bgColor: 'bg-blue-500',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle2,
      color: 'bg-green-50 text-green-600',
      bgColor: 'bg-green-500',
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'bg-yellow-50 text-yellow-600',
      bgColor: 'bg-yellow-500',
    },
    {
      label: 'High Priority',
      value: stats.highPriority,
      icon: AlertTriangle,
      color: 'bg-red-50 text-red-600',
      bgColor: 'bg-red-500',
    },
  ];

  const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

  return (
    <div className="bg-white/60 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Statistics</h2>
        <div className="text-sm text-gray-600">
          <span className="font-medium">{completionRate.toFixed(1)}%</span> completion rate
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/70 transition-all duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${item.color}`}>
                <item.icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                <p className="text-sm text-gray-600">{item.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Progress</span>
          <span>{stats.completed} of {stats.total} completed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;