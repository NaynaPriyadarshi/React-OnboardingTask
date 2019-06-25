import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';

export class EditSale extends Component {

    state = { open: false }
    modalShow = () => { this.setState({ open: true }) }
    close = () => this.setState({ open: false })

    constructor(props) {
        super(props);
        this.state = {


            id: '',
            customerId: '',
            productId: '',
            storeId: '',
            dateSold: '',


           
            SaleData: [],
            CustomerData: [],

            ProductData: [],
            
            StoreData: [],
            date: ''

            
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
    }

   

    componentDidMount() {

        this.editSale();

     }

    componentDidUpdate() {

        this.editSale();

    }




    editSale() {
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

            this.setState({
                ProductData: response.data
                
            });
        });


        axios.get("https://localhost:44394/api/Stores").then(response => {
           
            this.setState({
                StoreData: response.data
            });
        });

    }

    handleEdit(newSale) {
        let id = this.state.id;
        let sale = {
            id: this.state.id,
            productId:newSale.productId,
            customerId: newSale.customerId,
            storeId: newSale.storeId,
            dateSold: newSale.dateSold
        }
        console.log(sale);
        axios.request({
            method: 'put',

            url: `https://localhost:44394/api/Sales/` + id,

            data: sale
        }).then(response => {

            this.props.history.push('/');
            this.setState({
                
                productId: newSale.productId,
                customerId: newSale.customerId,
                storeId: newSale.storeId,
                dateSold: newSale.dateSold
            }, () => {
                console.log("hi", this.state);
            });
        }).catch(err => console.log(err));
        this.close();
        window.location.reload();
    }

    onSubmit(e) {
        const newSale = {
            //id: this.props.editId,
            //productId: this.props.productId,
            //customerId: this.props.customerId,
            //storeId: this.props.storeId,
            //dateSold: this.props.dateSold
           
            productId: this.refs.productId.value,
            customerId: this.refs.customerId.value,
            storeId: this.refs.storeId.value,
            dateSold: this.refs.dateSold.value
        }
        console.log("EditSale:", newSale);
        this.handleEdit(newSale);
        e.preventDefault();
    }

    handleInputChange(e) {
 
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
  
    onChange(e) {
        console.log(e.target.value)
        this.setState({ [e.target.name]: e.target.value });
    }

   

   
       

    render() {


        const { open } = this.state
        return (
            <React.Fragment>
                <div>
                    
                        <Button onClick={this.modalShow} color='yellow' > <i className="edit outline icon"></i>Edit</Button>
                    <Modal
                        open={open}
                        onClose={this.close}>
                        <Modal.Header>Edit Sale</Modal.Header>
                        <Modal.Content>
                            <p>Are you sure do you want to Edit this Sale?</p>
                            <Form>


                                <Form.Field>
                                    <label>Date Sold</label>

                                     
                                    <input type="text" name="dateSold" ref="dateSold" defaultValue={this.props.DateSold} placeholder='YYYY/MM/DD' onChange={this.props.onChange} />

                            
                                </Form.Field>


                           <Form.Field>
                                    <label>Customer Name</label>
                                    <select name="CustomerId" ref="customerId" onChange={this.props.onChange} value={this.props.customerId}>


                                    {this.state.CustomerData.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}




                                </select>


                            </Form.Field>


                            <Form.Field>

                                <label>Product Name</label>

                                    <select name="ProductId" ref="productId" onChange={this.props.onChange} value={this.props.productId}>


                                    {this.state.ProductData.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>




                            </Form.Field>
                            <Form.Field>

                                <label>Store Name</label>

                                    <select name="StoreId" ref="storeId" onChange={this.props.onChange} value={this.props.storeId} >

                                    {this.state.StoreData.map((store) => <option key={store.id} value={store.id}>{store.name}</option>)}
                                </select>


                            </Form.Field>
                            
                        </Form>




                        </Modal.Content>
                        <Modal.Actions>

                            <Button onClick={this.close} negative> Cancel </Button>
                            <Button

                                onClick={(id) => this.onSubmit(this.props.editid)}
                                positive
                                labelPosition='right'
                                icon='checkmark'
                                content='Create' />
                        </Modal.Actions>
                    </Modal>

                </div>

            </React.Fragment>
        );
    }
}