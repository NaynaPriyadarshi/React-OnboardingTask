import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';


export class EditCustomer extends Component {
    state = { open: false }
    modalShow = () => { this.setState({ open: true }) }
    close = () => this.setState({ open: false })


    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            address: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {

        this.editCustomer();

    }

    componentDidUpdate() {

        this.editCustomer();

    }



    editCustomer() {
        axios.get(`https://localhost:44394/api/Customers/` + this.props.editid).then(response => {

            this.setState({
                id: response.data.id,
                name: response.data.name,
                address: response.data.address

            }, () => {
               // console.log("hi");

            });



        }).catch(err => console.log(err));

    }


    editCustomers(newCustomer) {

        let id = this.state.id;
        let customer = {
            id: this.state.id,
            name: newCustomer.name,
            address: newCustomer.address
        }
        console.log(customer);
        axios.request({
            method: 'put',
            url: `https://localhost:44394/api/Customers/` + id,
            data: customer

        }).then(response => {

            this.props.history.push('/');
            this.setState({
                name: newCustomer.name,
                address: newCustomer.address

            }, () => {
                console.log("hi", this.state);

            });

        }).catch(err => console.log(err));

        this.close();
        window.location.reload();
    }





    onSubmit(e) {
        const newCustomer = {

            name: this.refs.customername.value,
            address: this.refs.address.value
        }
        this.editCustomers(newCustomer);
        // e.preventDefault();
    }
    handleInputChange(e) {

        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({

            [name]: value

        });

    }


    render() {
        const { open } = this.state
        return (
            <div>
                <Button onClick={this.modalShow} color='yellow' > <i className="edit outline icon"></i>Edit</Button>
                <Modal
                    open={open}
                    onClose={this.close}>
                    <Modal.Header>Edit Customer</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure do you want to Edit this Customer?</p>
                        <div className="ui form">
                            <div className="field">
                                <label>Customer Name</label>
                                <input type="text" name="customername" ref="customername" defaultValue={this.state.name} onChange={this.handleInputChange} />
                            </div>
                            <div className="field">
                                <label>Address</label>
                                <input type="text" name="address" ref="address" defaultValue={this.state.address} onChange={this.handleInputChange} />
                            </div>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.close} negative> Cancel </Button>
                        <Button

                            onClick={(id) => this.onSubmit(this.props.editid)}
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

