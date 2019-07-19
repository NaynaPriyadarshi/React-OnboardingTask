import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
//import { DateInput } from 'semantic-ui-calendar-react';
import axios from 'axios';

export class CreateSale extends Component {


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
            date: '',


        };
        
   }


    state = { open: false }
    modalShow = () => { this.setState({ open: true }) }
    close = () => this.setState({ open: false })

    /* handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    } */

   
    addSale(newSale) {

        console.log(newSale);
        axios.request({
            method: 'post',
          //  url: 'https:///localhost:44394/api/Sales',
            url: 'https://reactonboard.azurewebsites.net/api/Sales',
            data: newSale
        }).then(response => {

            this.props.history.push('/');
        }).catch(err => console.log(err));
        this.close();
        window.location.reload();
    }


    onSubmit(e) {
        debugger;
        const newSale = {
            'dateSold': this.refs.datesold.value,
            'productId': this.refs.productname.value,
            'customerId': this.refs.customername.value,
            'storeId': this.refs.storename.value,
            
        }
        this.addSale(newSale);
       // e.preventDefault();
    };


   
    

    componentDidMount() {



        axios.get("https://reactonboard.azurewebsites.net/api/Sales").then(response => {

            this.setState({
                SaleData: response.data
            })
        });



        axios.get("https://reactonboard.azurewebsites.net/api/Customers").then(response => {

            this.setState({
                CustomerData: response.data
            })
        });



        axios.get("https://reactonboard.azurewebsites.net/api/Products").then(response => {
            
            this.setState({
                ProductData: response.data
            })
        });


        axios.get("https://reactonboard.azurewebsites.net/api/Stores").then(response => {
            console.log(response.data);
            this.setState({
                StoreData: response.data
            });
        });


    
    }


render() {

    
        const { open } = this.state
        return (
            <React.Fragment>
            <div>
                <br />
                <Button primary onClick={this.modalShow}> New Sale</Button>
                <Modal
                        open={open}
                        onClose={this.close} size='small'  >

                        
                    <Modal.Header>Create Sales</Modal.Header>
                    <Modal.Content>
                       

                        <Form>


                            <Form.Field>
                                    <label>Date Sold</label>

                                    <input type="text" name="datesold" ref="datesold" placeholder="DateSold" />


                                    {  /*  <DateInput
                                        name="date"
                                        //ref="dateSold"
                                    placeholder="Date"
                                     value={this.state.date}
                                    iconPosition="left"
                                    onChange={this.handleChange}}



                                />*/}
                            </Form.Field>



                            <Form.Field>
                                <label>Customer Name</label>
                                    <select name="CustomerId" ref="customername">


                                    {this.state.CustomerData.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}


                                    

                                </select>
                               
                                
                            </Form.Field>


                            <Form.Field>

                                <label>Product Name</label>

                                    <select name="ProductId" ref="productname" >


                                    {this.state.ProductData.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>


                                
                                                               
                            </Form.Field>
                            <Form.Field>

                                <label>Store Name</label>

                                    <select name="StoreId" ref="storename" >

                                    {this.state.StoreData.map((store) => <option key={store.id} value={store.id}>{store.name}</option>)}
                                </select>

                                                                
                            </Form.Field>
                            
                        </Form>



                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.close} secondary > Cancel </Button>
                        
                        <Button
                            onClick={this.onSubmit.bind(this)}
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