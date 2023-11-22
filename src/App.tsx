import React, { useState } from 'react';
import CryptoChart from './CryptoChart';

const App: React.FC = () => {
  // Sample data structure, replace with your actual data
  const [data, setData] = useState<{ date: Date; price: number }[]>([
    { date: new Date('2023-01-01'), price: 10000 },
    // Add more data points as needed
  ]);

  const [forecastingLine, setForecastingLine] = useState<number[] | null>(null);

  return (
    <div>
      <h1>Crypto Investment Chart</h1>
      <CryptoChart data={data} forecastingLine={forecastingLine} />
      {/* Add controls or other components here */}
    </div>
  );
};

export default App;