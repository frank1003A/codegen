import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//components
import Navbar from './components/Navbar';
import AddCustomerForm from '../src/components/AddCustomerForm'
import CustomerDB from './components/CustomerDB';
import ItemSearch from './components/ItemSearch';
import UpdateItem from './components/UpdateItem';
import UpdateCustomer from './components/updateCustomer';
import AddItemForm from './components/AddItemForm';
import CustomerItem from './components/CustomerItem';
import Manifest from './components/Manifest';
import ManifestMain from './components/ManifestMain';
import ManifestView from './components/ManifestView';

//pages 
import Home from '../src/pages/Home'
import Customer from '../src/pages/Customer'
import Items from '../src/pages/Items'
import Errorpage from '../src/pages/Errorpage'


function App() {
  //usestates

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/customer" element={<Customer/>}/>
        <Route path="/customer/create" element={<AddCustomerForm/>}/>
        <Route path="/items" element={<Items/>}/>
        <Route path="/customer/all" element={<CustomerDB/>} />
        <Route path="/items/create-item" element={<AddItemForm/>} />
        <Route path="/items/item" element={<ItemSearch/>} />
        <Route path="/items/update-item" element={<UpdateItem/>} />
        <Route path="/customer/customer-update" element={<UpdateCustomer/>} />
        <Route path="/customer/customer-item-add" element={<CustomerItem/>}/>
        <Route path="/create-manifest" element={<Manifest/>}/>
        <Route path="/manifest" element={<ManifestView/>}/>
        <Route path="/create-manifest/manifest" element={<ManifestMain/>}/>
        <Route path="*" element={<Errorpage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
