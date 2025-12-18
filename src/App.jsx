


import { Route, Routes } from 'react-router';
import Home from './Public/pages/Home';
import Layoutpage from './Layout/Layoutpage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layoutpage></Layoutpage>}>
       <Route path='/' element={<Home></Home>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
