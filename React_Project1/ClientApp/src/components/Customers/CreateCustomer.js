import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';
export class CreateCustomer extends Component {



    state = { open: false }
    modalShow = () => { this.setState({ open: true }) }
    close = () => this.setState({ open: false })


    addCustomer(newCustomer) {
        axios.request({
            method: 'post',
            //url: 'https:///localhost:44394/api/Customers',

            url: 'https://reactonboard.azurewebsites.net/api/Customers',
            data: newCustomer
        }).then(response => {
            console.log("createCust", response.data);
            this.props.history.push('/');
        }).catch(err => console.log(err));
        this.close();
        window.location.reload();
    }
    onSubmit(e) {
        const newCustomer = {
            name: this.refs.customername.value,
            address: this.refs.address.value,
        }
        this.addCustomer(newCustomer);
        e.preventDefault();
    }
    render() {
        const { open } = this.state
        return (
            <div>
                <br />
                <Button primary onClick={this.modalShow}> Add Customer</Button>
                <Modal
                    open={open}
                    onClose={this.close}>
                    <Modal.Header>Add Customer</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure Do you want to add this Customer?</p>
                        <div className="ui form">
                            <div className="field">
                                <label>Customer Name</label>
                                <input type="text" name="customertname" ref="customername" placeholder="Customer Name" />
                            </div>
                            <div className="field">
                                <label>Address</label>
                                <input type="text" name="address" ref="address" placeholder="address" />
                            </div>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.close} negative> No </Button>
                        <Button
                            onClick={this.onSubmit.bind(this)}
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