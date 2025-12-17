


import { Route, Routes } from 'react-router';
import Home from './Public/pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
