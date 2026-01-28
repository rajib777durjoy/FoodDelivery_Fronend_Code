


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
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './Redux/userSlice';
import MenuPage from './Dashboard/Component/Restaurant/MenuPage';
import AddFood from './Dashboard/Component/Restaurant/AddFood';
import Delivery_History from './Dashboard/Component/Restaurant/Delivery_History';
import OrdersPage from './Dashboard/Component/Restaurant/OrdersPage';
import JoinOurTeam from './Public/JoinOurTeam/JoinOurTeam';
import BecomePartner from './Public/JoinOurTeam/BecomePartner';
import DeliveryPartner from './Public/JoinOurTeam/DeliveryPartner';
import Food_Edit from './Dashboard/Component/Restaurant/Food_Edit';
import AllFood from './Public/pages/Food_item/AllFood';
import FoodDetails from './Public/pages/Food_item/FoodDetails';
import { useContext } from 'react';
import { AuthContext } from './Public/Provider/AuthProvider';
import OrderConfirm from './Public/pages/OrderConfirm/OrderConfirm';
import Successpage from './Public/pages/Paymentpage/Successpage';
import Myorders from './Public/pages/OrderConfirm/Myorders';
import PaymentFail from './Public/pages/Paymentpage/PaymentFail';
import AddToCart from './Public/pages/AddToCart/AddToCart';
import Orderpage from './Dashboard/Component/DeliveryComponent/Orderpage';
import SelectDVHero from './Dashboard/Component/Restaurant/SelectDVHero';
import NotificationPage from './Public/pages/Notification/NotificationPage';
import OrderDetails from './Public/pages/OrderConfirm/OrderDetails';
import PaymentInbox from './Public/pages/Paymentpage/paymentInbox';
import Profile from './Public/pages/userProfile/Profile';
import Earning from './Dashboard/Component/Restaurant/Earning';
import TrackingMap from './Public/LocationTracking/TrackingMap';
import StaticPage from './Dashboard/Component/Restaurant/StaticPage';
import Staticpage from './Dashboard/Component/DeliveryComponent/Staticpage';
import Static from './Public/pages/Static/Staticpage';
import EarningPage from './Dashboard/Component/DeliveryComponent/EarningPage';
import Protect from './Public/ProtectRoute/Protect';

function App() {
  const axiosPublic = useAxiosPublic();
  const { user, loading } = useContext(AuthContext)
  
  return (
    <Routes>
      <Route path="/" element={<Layoutpage></Layoutpage>}>
        {/* Public page  */}
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/All_restaurant' element={<All_Restaurant></All_Restaurant>}></Route>
        <Route path='/menu_Of_restaurant/:id' element={<Restaurant_menu />}></Route>
        <Route path='/FoodByCategory/:name' element={<FoodByCategory></FoodByCategory>}></Route>
        <Route path='/JoinOurTeam' element={<Protect><JoinOurTeam></JoinOurTeam></Protect>}></Route>
        <Route path='/BecomePartner' element={<Protect><BecomePartner></BecomePartner></Protect>}></Route>
        <Route path='/BecomeDeliveryHero' element={<Protect><DeliveryPartner></DeliveryPartner></Protect>} ></Route>
        <Route path='/All_FoodItem' element={<AllFood></AllFood>}></Route>
        <Route path='/Food_details/:id' element={<FoodDetails></FoodDetails>}></Route>
        <Route path='/order_confirm/:id/:quantity' element={<Protect><OrderConfirm></OrderConfirm></Protect>}></Route>
        <Route path='/payment/success/:tran_id' element={<Successpage></Successpage>}></Route>
        <Route path='/payment/fail/:tran_id' element={<PaymentFail></PaymentFail>} ></Route>
        <Route path='/OrderDetails/:id' element={<Protect><OrderDetails></OrderDetails></Protect>} ></Route>
        <Route path='/TrackingMap' element={<Protect><TrackingMap></TrackingMap></Protect>}></Route>
      </Route>
      {/* Restaurant dashboard page */}
      <Route path='/restaurant_Dashboard' element={<RestaurantDashboard></RestaurantDashboard>}>
        {/* here is her children */}
        <Route index={true} element={<StaticPage></StaticPage>} ></Route>
        <Route path='/restaurant_Dashboard/menu' element={<MenuPage></MenuPage>}></Route>
        <Route path='/restaurant_Dashboard/AddFood' element={<AddFood></AddFood>}></Route>
        <Route path='/restaurant_Dashboard/Food_Edit/:id' element={<Food_Edit></Food_Edit>} ></Route>
        <Route path='/restaurant_Dashboard/delivery_history' element={<Delivery_History></Delivery_History>}></Route>
        <Route path='/restaurant_Dashboard/orders' element={<OrdersPage></OrdersPage>}></Route>
        <Route path='/restaurant_Dashboard/select_deliver_hero/:id' element={<SelectDVHero></SelectDVHero>} ></Route>
        <Route path='/restaurant_Dashboard/profile' element={<Profile></Profile>} ></Route>
        <Route path='/restaurant_Dashboard/notification' element={<NotificationPage></NotificationPage>}></Route>
        <Route path='/restaurant_Dashboard/earnings' element={<Earning></Earning>} ></Route>
        <Route path='/restaurant_Dashboard/TrackingMap' element={<TrackingMap></TrackingMap>}></Route>
      </Route>

      {/* DeliveryMan Dashboard page */}
      <Route path='/delivery_Dashboard' element={<DeliverManDashboard></DeliverManDashboard>}>
        {/* here is her children */}
        <Route index={true} element={<Staticpage></Staticpage>} ></Route>
        <Route path='/delivery_Dashboard/order_page' element={<Orderpage></Orderpage>}></Route>
        <Route path='/delivery_Dashboard/profile' element={<Profile></Profile>} ></Route>
        <Route path='/delivery_Dashboard/notification' element={<NotificationPage></NotificationPage>}></Route>
        <Route path='/delivery_Dashboard/TrackingMap' element={<TrackingMap></TrackingMap>}></Route>
        <Route path='/delivery_Dashboard/earnings' element={<EarningPage></EarningPage>}></Route>
      </Route>

      {/* Customer Dashboard page */}
      <Route path='/dashboard' element={<CustomerDashboard></CustomerDashboard>}>
        {/* here is children route */}
        <Route index={true} element={<Static></Static>}></Route>
        <Route path='/dashboard/myCart' element={<AddToCart></AddToCart>} ></Route>
        <Route path='/dashboard/my_orders' element={<Myorders></Myorders>} ></Route>
        <Route path='/dashboard/payment_inbox' element={<PaymentInbox></PaymentInbox>} ></Route>
        <Route path='/dashboard/profile' element={<Profile></Profile>} ></Route>
        <Route path='/dashboard/notification' element={<NotificationPage></NotificationPage>}></Route>
        <Route path='/dashboard/TrackingMap' element={<TrackingMap></TrackingMap>}></Route>

      </Route>

      <Route path='/SignIn' element={<SignIn></SignIn>} />
      <Route path='/SignUp' element={<SignUp></SignUp>} />
    </Routes>
  );
}

export default App;
