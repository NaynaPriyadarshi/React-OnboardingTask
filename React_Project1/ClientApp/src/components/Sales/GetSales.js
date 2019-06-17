import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import Moment from 'react-moment';
import axios from 'axios';
import { CreateSale } from './CreateSale';
import { DeleteSale } from './DeleteSale';
import { EditSale } from './EditSale';




export class GetSales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SaleData: [],
            CustomerData: [],
            ProductData: [],
            StoreData: []
        }
    }

    state = { open: false }

    deleteShow = (deleteOn) => () => {
        this.setState({ deleteOn, open: true })
    }

    close = () => this.setState({ open: false })


    componentDidMount() {


        axios.get("https://localhost:44394/api/Sales").then(response => {

            this.setState({
                SaleData: response.data
            });
        });



        axios.get("https://localhost:44394/api/Customers").then(response => {

            this.setState({
                CustomerData: response.data
            });
        });

       

        axios.get("https://localhost:44394/api/Products").then(response => {
            //console.log(response.data);
            this.setState({
                ProductData: response.data
            });
        });


        axios.get("https://localhost:44394/api/Stores").then(response => {
           // console.log(response.data);
            this.setState({
                StoreData: response.data
            });
        });
    
    }


    
        
   
    

    render() {

        //const { open, deleteOn } = this.state
        return (
            <div>


                <CreateSale />
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>ProductName</Table.HeaderCell>
                            <Table.HeaderCell>CustomerName</Table.HeaderCell>
                            <Table.HeaderCell>StoreName</Table.HeaderCell>
                            <Table.HeaderCell>DateSold</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.SaleData.map((sale) => {
                            return (
                                <Table.Row key={sale.id}>

                                    <Table.Cell>{sale.id}</Table.Cell>


                                    {this.state.ProductData.map((p) => {
                                        if (sale.productId === p.id) {
                                            return (<Table.Cell key={p.id}>{p.name}</Table.Cell>)
                                        }
                                    })}






                                    {this.state.CustomerData.map((c) => {
                                        if (sale.customerId === c.id) {
                                            return (<Table.Cell key={c.id}>{c.name}</Table.Cell>)
                                        }
                                    })}



                                    {this.state.StoreData.map((store) => {
                                        if (sale.storeId === store.id) {
                                            return (<Table.Cell key={store.id}>{store.name}</Table.Cell>)
                                        }
                                    })}



                                    <Table.Cell>
                                        <Moment format="DD/MM/YYYY">

                                            {sale.dateSold}


                                             </Moment>
                                            
                                            
                                            </Table.Cell>

                                   


                                    <Table.Cell>

                                        <EditSale editid />
                                    </Table.Cell>


                                    <Table.Cell>

                                        <DeleteSale delid={sale.id} />

                                    </Table.Cell>



                                </Table.Row>

                            );
                        })}


                    </Table.Body>



                </Table>


            </div>
        );
    }
}