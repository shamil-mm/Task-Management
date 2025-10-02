import React from 'react';
import { BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon } from 'lucide-react';

interface ChartSelectorProps {
  selectedChart: 'bar' | 'line' | 'pie';
  onSelectChart: (chartType: 'bar' | 'line' | 'pie') => void;
}

const ChartSelector: React.FC<ChartSelectorProps> = ({ selectedChart, onSelectChart }) => {
  const chartTypes = [
    { type: 'bar' as const, icon: BarChart3, label: 'Bar Chart' },
    { type: 'line' as const, icon: LineChartIcon, label: 'Line Chart' },
    { type: 'pie' as const, icon: PieChartIcon, label: 'Pie Chart' },
  ];

  return (
    <div className="flex gap-2 bg-white p-2 rounded-lg shadow-sm">
      {chartTypes.map(({ type, icon: Icon, label }) => (
        <button
          key={type}
          onClick={() => onSelectChart(type)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
            selectedChart === type
              ? 'bg-green-950 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title={label}
        >
          <Icon size={18} />
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default ChartSelector;