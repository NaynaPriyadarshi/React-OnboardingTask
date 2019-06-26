import React, { Component } from 'react';
import { Table, Pagination} from 'semantic-ui-react';
import axios from 'axios';
import { CreateCustomer } from './CreateCustomer';
import { DeleteCustomer } from './DeleteCustomer';
import { EditCustomer } from './EditCustomer';




export class GetCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CustomerData: [],
            defaultActivePage: 1,
            totalPages: 10

        }
    }

    state = { open: false }

    deleteShow = (deleteOn) => () => {
        this.setState({ deleteOn, open: true })
    }

    close = () => this.setState({ open: false })

    componentDidMount() {
        
        axios.get("https://localhost:44394/api/Customers").then(response => {
           
            this.setState({
                CustomerData: response.data
            });
        });
    }

    /*handlepageChanger(pageNumber) {

        console.log(`active page is  ${pageNumber} `);
        this.setState({ activePage: pageNumber });



    }*/
   

    render() {

        //const { open, deleteOn } = this.state
        return (


            <div style={{ width: '80%', marginLeft: '200px' }}>
           
                <CreateCustomer />


                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            {/*  <Table.HeaderCell>Id</Table.HeaderCell> */}
                            <Table.HeaderCell>Name--</Table.HeaderCell>
                            <Table.HeaderCell>Address--</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.CustomerData.map((c) => {
                            return (
                                <Table.Row key={c.id}>

                                    {/* <Table.Cell>{c.id} </Table.Cell> */}
                                    <Table.Cell>{c.name}</Table.Cell>
                                    <Table.Cell>{c.address}</Table.Cell>
                                    
                                    <Table.Cell>
                                        <EditCustomer editid = {c.id}  />
                                       
                                        </Table.Cell>
                                        <Table.Cell>

                                        <DeleteCustomer delid = {c.id}  />

                                        </Table.Cell>
                                    
                                   

                                    
                                </Table.Row>

                            );
                        })}
                    </Table.Body>

                   


                   
                </Table>

               

                <div style={{ marginLeft: '650px' }}>

                    <Pagination defaultActivePage={5} totalPages={10} onPageChange={this.handlepageChanger} />

                    </div>
                    
               


                <footer>Copyright &copy;2019  -Nayna Priyadarshi </footer>


                </div>



           
            
        );
    }
}