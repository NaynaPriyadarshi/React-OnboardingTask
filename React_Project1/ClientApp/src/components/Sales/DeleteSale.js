import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import axios from 'axios';

export class DeleteSale extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: '',
            SaleData: [],
            ProductData: [],
            CustomerData: [],
            StoreData: []
        }
        this.onDelete = this.onDelete.bind(this);
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
    }

    onDelete() {

        fetch(`https://localhost:44394/api/Sales/` + this.props.delid, {

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
                    <Modal.Header>Delete Sale</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure Do you want to delete this Sale?</p>
                        <Form>


                            <Form.Field>
                                <label>Date Sold</label>
                                <DateInput
                                    name="date"
                                    placeholder="Date"
                                    value={this.state.date}
                                    iconPosition="left"
                                    onChange={this.handleChange}
                                />
                            </Form.Field>



                            <Form.Field>
                                <label>Customer Name</label>
                                <select name="CustomerId" onChange={this.onChange} value={this.state.customerId}>


                                    {this.state.CustomerData.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}




                                </select>


                            </Form.Field>


                            <Form.Field>

                                <label>Product Name</label>

                                <select name="ProductId" onChange={this.onChange} value={this.state.productId}>


                                    {this.state.ProductData.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>




                            </Form.Field>
                            <Form.Field>

                                <label>Store Name</label>

                                <select name="StoreId" onChange={this.onChange} value={this.state.storeId}>

                                    {this.state.StoreData.map((store) => <option key={store.id} value={store.id}>{store.name}</option>)}
                                </select>


                            </Form.Field>

                        </Form>

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