import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerView from './components/CustomerView/CustomerView';
import WaiterView from './components/WaiterView/WaiterView';
import KitchenView from './components/KitchenView/KitchenView';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerView />}></Route>
        <Route path="/customer" element={<CustomerView />}></Route>
        <Route path="/waiter" element={<WaiterView />}></Route>
        <Route path="/kitchen" element={<KitchenView />}></Route>
      </Routes>
    </BrowserRouter>   
  );
}

export default App;
