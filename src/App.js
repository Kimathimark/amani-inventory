import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";



// Import pages
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Inventory from './Pages/Inventory';
import Sales from './Pages/Sales';
import Income from './Pages/Income';
import Expenses from './Pages/Expenses';
import Deliveries from './Pages/Deliveries';
import Employees from './Pages/Employees';

// users
import UserIncome from './Pages/UserIncome';
import UserInventory from './Pages/UserInventory';
import UserSales from './Pages/UserSales';
import Userdelivery from './Pages/Userdelivery';
import MostSold from './Pages/MostSold';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/income" element={<Income />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/deliveries" element={<Deliveries />} />
              <Route path="/employees" element={<Employees />} />

              <Route path="/user/inventory" element={<UserInventory />} />
              <Route path="/user/sales" element={<UserSales  />} />
              <Route path="/user/delivery" element={<Userdelivery  />} />
              <Route path="/mostsold" element={<MostSold  />} />
          </Routes>
      </BrowserRouter>  
      
    </div>
  );
}

export default App;
