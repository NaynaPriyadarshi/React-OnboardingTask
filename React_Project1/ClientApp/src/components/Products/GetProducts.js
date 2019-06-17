import React, { Component } from 'react';
import {Table} from 'semantic-ui-react';
import axios from 'axios';
import { CreateProduct } from './CreateProduct';
import { DeleteProduct } from './DeleteProduct';
import { EditProduct } from './EditProduct';



export class GetProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ProductData: []
        }
    }

    state = { open: false }

    deleteShow = (deleteOn) => () => {
        this.setState({ deleteOn, open: true })
    }

    close = () => this.setState({ open: false })

    componentDidMount() {
        console.log("inside did mount");
        axios.get("https://localhost:44394/api/Products").then(response => {
            console.log(response.data);
            this.setState({
                ProductData: response.data
            });
        });
    }


    render() {

        //const { open, deleteOn } = this.state
        return (
            <div>
                <CreateProduct />
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.ProductData.map((p) => {
                            return (
                                <Table.Row key={p.id}>

                                    <Table.Cell>{p.id} </Table.Cell>
                                    <Table.Cell>{p.name}</Table.Cell>
                                    <Table.Cell>{p.price}</Table.Cell>
                                    <Table.Cell>
                                        <EditProduct editid={p.id} />
                                    </Table.Cell>
                                    <Table.Cell>

                                        <DeleteProduct delid={p.id}/>
                                        
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