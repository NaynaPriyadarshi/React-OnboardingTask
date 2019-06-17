import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';

export class DeleteCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            CustomerData: []
        }
        this.onDelete = this.onDelete.bind(this);
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

    onDelete() {

        fetch(`https://localhost:44394/api/Customers/` + this.props.delid, {

            method: 'delete'
        })
            .then(response => {
                // this.props.history.push('/'); 
            }).catch(err => console.log(err));

        this.close();
       window.location.reload();
    }




    render() {
        const { open } = this.state
        return (
            <div>
                { /* <Button onClick={this.modalShow} color='red'> <i className="trash icon"></i>Delete </Button> */}

                <Button onClick={this.onDelete.bind(this)} className="btn red "> <i className="trash icon"></i>Delete </Button>
                <Modal
                    open={open}
                    onClose={this.close}>
                    <Modal.Header>Delete Customer</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure Do you want to delete this Customer?</p>
                        <div className="ui form">
                            <div className="field">
                                <label>Customer Name</label>
                                <input type="text" name="customername" ref="customername" placeholder="Customer Name" />
                            </div>
                            <div className="field">
                                <label>Address</label>
                                <input type="text" name="address" ref="address" placeholder="address" />
                            </div>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.close} negative> Cancel </Button>
                        <Button
                            onClick={(id) => this.onDelete(this.props.delid)}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Save' />
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}