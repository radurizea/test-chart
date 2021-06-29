import './App.css';

import { useState, useEffect } from 'react';
import { getData } from './api/getData';
import TestChart from './components/Chart';

function App() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getData()
      .then((data) => {
        setChartData(data);
        setLoading(false);
      })
      .catch((error) => {
        alert(`Error: ${error}`);
      });
  }, []);

  return (
    <div className="App">
      {loading ?
        <p>Loading data...</p>
        :
        <TestChart data={chartData} />
      }
    </div>
  );
}

export default App;
