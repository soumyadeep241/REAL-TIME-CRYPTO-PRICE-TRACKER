import React from 'react';

interface MiniChartProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}

const MiniChart: React.FC<MiniChartProps> = ({ 
  data, 
  width = 120, 
  height = 40,
  color = '#10B981' 
}) => {
  // Safety check
  if (!data || data.length < 2) {
    return <div className="w-full h-full bg-neutral-100 rounded"></div>;
  }

  // Find min and max values for scaling
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const range = maxValue - minValue;
  
  // Calculate point coordinates
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const normalizedValue = range === 0 
      ? 0.5 // If all values are the same, draw a horizontal line in the middle
      : (value - minValue) / range;
    const y = height - (normalizedValue * height);
    return `${x},${y}`;
  }).join(' ');

  // Determine if the trend is positive (last value > first value)
  const isPositive = data[data.length - 1] >= data[0];
  const lineColor = isPositive ? color : '#EF4444';

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={lineColor}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default MiniChart;