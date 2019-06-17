import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { GetProducts } from './components/Products/GetProducts';
import { GetCustomers } from './components/Customers/GetCustomers';
import { GetStores } from './components/Stores/GetStores';
import { GetSales } from './components/Sales/GetSales';
import { CreateProduct } from './components/Products/CreateProduct';
import { DeleteProduct } from './components/Products/DeleteProduct';
import { DeleteCustomer } from './components/Customers/DeleteCustomer';
import { DeleteStore } from './components/Stores/DeleteStore';
import { EditProduct } from './components/Products/EditProduct';
import { EditCustomer } from './components/Customers/EditCustomer';
import { EditStore } from './components/Stores/EditStore';
import { CreateSale } from './components/Sales/CreateSale';
import { EditSale } from './components/Sales/EditSale';
import { DeleteSale} from './components/Sales/DeleteSale';






export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
            <Route path='/fetch-data' component={FetchData} />
            <Route path='/getproducts' component={GetProducts} />
            <Route path='/getcustomers' component={GetCustomers} />
            <Route path='/getstores' component={GetStores} />
            <Route path='/getsales' component={GetSales} />
            <Route path='/createproduct' component={CreateProduct} />
            <Route path='/deleteproduct' component={DeleteProduct} />
            <Route path='/deletecustomer' component={DeleteCustomer} />
            <Route path='/deletestore' component={DeleteStore} />
            <Route path='/editproduct' component={EditProduct} />
            <Route path='/editcustomer' component={EditCustomer} />
            <Route path='/editstore' component={EditStore} />
            <Route path='/createsale' component={CreateSale} />
            <Route path='/editsale' component={EditSale} />
            <Route path='/deletesale' component={DeleteSale} />

           
      </Layout>
    );
  }
}
