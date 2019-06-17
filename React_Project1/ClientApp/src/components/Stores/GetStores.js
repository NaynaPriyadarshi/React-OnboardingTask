import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import { AddStore } from './AddStore';
import { DeleteStore } from './DeleteStore';
import { EditStore } from './EditStore';




export class GetStores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StoreData: []
        }
    }

    state = { open: false }

    deleteShow = (deleteOn) => () => {
        this.setState({ deleteOn, open: true })
    }

    close = () => this.setState({ open: false })

    componentDidMount() {
        console.log("inside did mount");
        axios.get("https://localhost:44394/api/Stores").then(response => {
            console.log(response.data);
            this.setState({
               StoreData: response.data
            });
        });
    }


    render() {

        //const { open, deleteOn } = this.state
        return (
            <div>
                <AddStore />
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.StoreData.map((s) => {
                            return (
                                <Table.Row key={s.id}>

                                    <Table.Cell>{s.id} </Table.Cell>
                                    <Table.Cell>{s.name}</Table.Cell>
                                    <Table.Cell>{s.address}</Table.Cell>

                                    <Table.Cell>
                                        <EditStore editid={s.id} />
                                    </Table.Cell>
                                    <Table.Cell>

                                        <DeleteStore delid={s.id} /> 

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





