import './App.css';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu/menu';
import Order from './components/Order/order';
import Bill from './components/Bill/bill';
import Admin from './components/Admin/add_menu';
import NoMatch from './components/nomatch';

function App() {
  return (
  <div className="App">
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/order" element={<Order />} />
      <Route path="/bill" element={<Bill />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  </div>
  );
}


export default App;
