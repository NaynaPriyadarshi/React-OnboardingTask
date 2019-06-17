import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';


export class EditProduct extends Component {
    state = { open: false }
    modalShow = () => { this.setState({ open: true }) }
    close = () => this.setState({ open: false })


    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            price:''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {

        this.editProduct();
    
    }

    componentDidUpdate() {

        this.editProduct();

    }



    editProduct() {
        axios.get(`https://localhost:44394/api/Products/` + this.props.editid,).then(response => {

            this.setState({
                id: response.data.id,
                name: response.data.name,
                price: response.data.price

            }, () => {
              // console.log("hi");

            });
        

           
        }).catch(err => console.log(err));
        
    }


    editProducts(newProduct) {

        let id = this.state.id;
        let product = {
            id: this.state.id,
            name: newProduct.name,
            price: newProduct.price
        }
        console.log(product);
        axios.request({
            method: 'put',
            url: `https://localhost:44394/api/Products/` + id,
            data: product

        }).then(response => {

            this.props.history.push('/');
            this.setState({
                name:newProduct.name,
                price: newProduct.price

            }, () => {
                //console.log("hi", this.state);

            });

            }).catch(err => console.log(err));

        this.close();
        window.location.reload();
    }



   

    onSubmit(e) {
        const newProduct = {
          
            name: this.refs.productname.value,
            price: this.refs.price.value
        }
        this.editProducts(newProduct);
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


    render() {
        const { open } = this.state
        return (
            <div>
                <Button onClick={this.modalShow} color='yellow' > <i className="edit outline icon"></i>Edit</Button>
                <Modal
                    open={open}
                    onClose={this.close}>
                    <Modal.Header>Edit Product</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure do you want to Edit this Product?</p>
                        <div className="ui form">
                            <div className="field">
                                <label>Product Name</label>
                                <input type="text" name="productname" ref="productname" defaultValue={this.state.name} onChange={this.handleInputChange} />
                            </div>
                            <div className="field">
                                <label>Price</label>
                                <input type="text" name="price" ref="price" defaultValue={this.state.price} onChange={this.handleInputChange} />
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