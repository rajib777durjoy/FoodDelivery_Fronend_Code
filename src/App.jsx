


import { Route, Routes } from 'react-router';
import Home from './Public/pages/Home';
import Layoutpage from './Layout/Layoutpage';
import All_Restaurant from './Public/pages/Restaurants/All_Restaurant';
import Restaurant_menu from './Public/pages/Restaurants/Restaurant_menu';
import FoodByCategory from './Public/pages/Restaurants/FoodByCategory';
import SignUp from './Public/Authentication/SignUp';
import SignIn from './Public/Authentication/SignIn';
import RestaurantDashboard from './Dashboard/RestaurantDashboard';
import DeliverManDashboard from './Dashboard/DeliverManDashboard';
import CustomerDashboard from './Dashboard/CustomerDashboard';
import { useEffect } from 'react';
import useAxiosPublic from './Public/Hook/useAxiosPublic';
import { useDispatch } from 'react-redux';
import { setUser } from './Redux/userSlice';
import MenuPage from './Dashboard/Component/Restaurant/MenuPage';
import AddFood from './Dashboard/Component/Restaurant/AddFood';
import Delivery_History from './Dashboard/Component/Restaurant/Delivery_History';
import OrdersPage from './Dashboard/Component/Restaurant/OrdersPage';
import JoinOurTeam from './Public/JoinOurTeam/JoinOurTeam';
import BecomePartner from './Public/JoinOurTeam/BecomePartner';
import DeliveryPartner from './Public/JoinOurTeam/DeliveryPartner';
import Food_Edit from './Dashboard/Component/Restaurant/Food_Edit';

function App() {
  const axiosPublic = useAxiosPublic();
  const dispatch = useDispatch()
  useEffect(() => {
    const getCurrentuser = async() => {
      const res = await axiosPublic.get(`/api/user/user_data`);
      console.log('app js fill user::', res?.data)
      dispatch(setUser(res.data))
    }
    getCurrentuser()
  },[])
  return (
    <Routes>
      <Route path="/" element={<Layoutpage></Layoutpage>}>
        {/* Public page  */}
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/All_restaurant' element={<All_Restaurant></All_Restaurant>}></Route>
        <Route path='/menu_Of_restaurant/:id' element={<Restaurant_menu />}></Route>
        <Route path='/FoodByCategory/:name' element={<FoodByCategory></FoodByCategory>}></Route>
        <Route path='/JoinOurTeam' element={<JoinOurTeam></JoinOurTeam>}></Route>
        <Route path='/BecomePartner' element={<BecomePartner></BecomePartner>}></Route>
        <Route path='/BecomeDeliveryHero' element={<DeliveryPartner></DeliveryPartner>} ></Route>
      </Route>
      {/* Restaurant dashboard page */}
      <Route path='/restaurant_Dashboard' element={<RestaurantDashboard></RestaurantDashboard>}>
        {/* here is her children */}
        <Route path='/restaurant_Dashboard/menu' element={<MenuPage></MenuPage>}></Route>
        <Route path='/restaurant_Dashboard/AddFood' element={<AddFood></AddFood>}></Route>
        <Route path='/restaurant_Dashboard/Food_Edit/:id' element={<Food_Edit></Food_Edit>} ></Route>
        <Route path='/restaurant_Dashboard/delivery_history' element={<Delivery_History></Delivery_History>}></Route>
        <Route path='/restaurant_Dashboard/orders' element={<OrdersPage></OrdersPage>}></Route>
      </Route>

      {/* DeliveryMan Dashboard page */}
      <Route path='/delivery_Dashboard' element={<DeliverManDashboard></DeliverManDashboard>}>
       {/* here is her children */}
      </Route>

      {/* Customer Dashboard page */}
      <Route path='/dashboard' element={<CustomerDashboard></CustomerDashboard>}>

      {/* here is her children */}
      </Route>

      <Route path='/SignIn' element={<SignIn></SignIn>} />
      <Route path='/SignUp' element={<SignUp></SignUp>} />
    </Routes>
  );
}

export default App;
