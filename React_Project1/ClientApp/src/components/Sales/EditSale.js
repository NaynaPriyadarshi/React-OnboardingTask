import React, { Component } from 'react';
import { Button, Modal,Form} from 'semantic-ui-react';
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

        this.getSale();
        this.getSales();
        
    }

            
  getSale() {

    //  axios.get("https:///localhost:44394/api/Sales").then(response => {
      axios.get("https://reactonboard.azurewebsites.net/api/Sales").then(response => {

          this.setState({
              SaleData: response.data
          })
      });


      //axios.get("https:///localhost:44394/api/Customers").then(response => {
      axios.get("https://reactonboard.azurewebsites.net/api/Customers").then(response => {

            this.setState({

                CustomerData: response.data

            });
        });



    //  axios.get("https:///localhost:44394/api/Products").then(response => {

      axios.get("https://reactonboard.azurewebsites.net/api/Products").then(response => {

            this.setState({
                ProductData: response.data

            });
        });


      //axios.get("https:///localhost:44394/api/Stores").then(response => {

      axios.get("https://reactonboard.azurewebsites.net/api/Stores").then(response => {

            this.setState({
                StoreData: response.data
            });
        });

    }

   

   getSales() {
      // axios.get(`https:///localhost:44394/api/Sales/` + this.props.editid).then(response => {
       axios.get(`https://reactonboard.azurewebsites.net/api/Sales/` + this.props.editid).then(response => {

            this.setState({
                id: response.data.id,
                dateSold: response.data.dateSold,
                customerId: response.data.customerId,

                productId: response.data.productId,

               
            }, () => {
                // console.log("hi");

            });



        }).catch(err => console.log(err));

    }


    editSale(newSale) {

        let id = this.state.id;
        let sale = {
            id: this.state.id,
                   
           dateSold: newSale.dateSold,
            customerId: newSale.customerId,

            productId: newSale.productId,

            storeId: newSale.storeId


        }
        console.log(sale);
        axios.request({
            method: 'put',
           // url: `https:///localhost:44394/api/Sales/ ` + id,
            url: `http://reactonboard.azurewebsites.net/api/Sales/ ` + id,
            data: sale

        }).then(response => {

            this.props.history.push('/');
            this.setState({
                dateSold: newSale.dateSold,
                customerId: newSale.customerId,

                productId: newSale.productId,

                storeId: newSale.storeId

            }, () => {
                console.log("hi", this.state);

            });

        }).catch(err => console.log(err));

        this.close();
        window.location.reload();
    }

    onSubmit(e) {
        debugger;
        const newSale = {

            dateSold: this.refs.dateSold.value,
            customerId: this.refs.customerId.value,

            productId: this.refs.productId.value,
            
            storeId: this.refs.storeId.value,
           
        }
        
        this.editSale(newSale);
       
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


                                    <input type="text" name="dateSold" ref="dateSold" defaultValue={this.state.dateSold} placeholder='DD/MM/YYYY' onChange={this.handleInputChange} />

                                    </Form.Field>
                                
                                <Form.Field>
                                    <label>Customer Name</label>
                                    <select name="customerId" ref="customerId" defaultValue={this.state.customerId} onChange={this.handleInputChange}>
                                        {this.state.CustomerData.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}

                                                  
                                    </select>
                                    
                                </Form.Field>



                                
                                   

                                <Form.Field>

                                    <label>Product Name</label>

                                    <select name="ProductId" ref="productId" defaultValue={this.state.productId} onChange={this.handleInputChange}>


                                        {this.state.ProductData.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </select>




                                </Form.Field>
                                <Form.Field>

                                    <label>Store Name</label>

                                    <select name="storeId" ref="storeId" defaultValue={this.state.storeId} onChange={this.handleInputChange} >

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
                                content='Edit' />
                        </Modal.Actions>
                    </Modal>

                </div>

            </React.Fragment>
        );
    }
}
