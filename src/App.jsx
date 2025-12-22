


import { Route, Routes } from 'react-router';
import Home from './Public/pages/Home';
import Layoutpage from './Layout/Layoutpage';
import All_Restaurant from './Public/pages/Restaurants/All_Restaurant';
import Restaurant_menu from './Public/pages/Restaurants/Restaurant_menu';
import FoodByCategory from './Public/pages/Restaurants/FoodByCategory';
import SignUp from './Public/Authentication/SignUp';
import SignIn from './Public/Authentication/SignIn';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layoutpage></Layoutpage>}>
       <Route path='/' element={<Home></Home>}></Route>
       <Route path='/All_restaurant' element={<All_Restaurant></All_Restaurant>}></Route>
       <Route path='/menu_Of_restaurant/:id' element={<Restaurant_menu/>}></Route>
       <Route path='/FoodByCategory/:name' element={<FoodByCategory></FoodByCategory>}></Route>
      </Route>
      <Route path='/SignIn' element={<SignIn></SignIn>} />
      <Route path='/SignUp' element={<SignUp></SignUp>} />
    </Routes>
  );
}

export default App;
