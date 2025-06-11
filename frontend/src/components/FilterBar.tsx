import React from 'react';
import { Filter, SortAsc, SortDesc } from 'lucide-react';
import { TodoFilters } from '../App';

interface FilterBarProps {
  filters: TodoFilters;
  onFiltersChange: (filters: TodoFilters) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (key: keyof TodoFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleSortOrder = () => {
    onFiltersChange({
      ...filters,
      order: filters.order === 'asc' ? 'desc' : 'asc',
    });
  };

  return (
    <div className="bg-white/60 backdrop-blur-lg rounded-xl border border-white/20 p-4 shadow-lg">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Status:</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Priority:</label>
          <select
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70"
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Sort by:</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70"
          >
            <option value="createdAt">Created Date</option>
            <option value="title">Title</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        {/* Sort Order */}
        <button
          onClick={toggleSortOrder}
          className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          title={`Sort ${filters.order === 'asc' ? 'Ascending' : 'Descending'}`}
        >
          {filters.order === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
          <span>{filters.order === 'asc' ? 'Asc' : 'Desc'}</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;