import React, { Component } from 'react';
import { Button, Modal} from 'semantic-ui-react';
import axios from 'axios';

export class DeleteProduct extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            ProductData: []
        }
        this.onDelete = this.onDelete.bind(this);
    }

    state = { open: false }

    deleteShow = (deleteOn) => () => {
        this.setState({ deleteOn, open: true })
    }

    close = () => this.setState({ open: false })

    componentDidMount() {
        
        axios.get("https://localhost:44394/api/Products").then(response => {
           // console.log(response.data);
            this.setState({
                ProductData: response.data
            });
        });
    }

    onDelete() {
        
        fetch(`https://localhost:44394/api/Products/` + this.props.delid, {

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
                    <Modal.Header>Delete Product</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure Do you want to delete this Product?</p>
                        <div className="ui form">
                            <div className="field">
                                <label>Product Name</label>
                                <input type="text" name="productname" ref="productname" placeholder="Product Name" />
                            </div>
                            <div className="field">
                                <label>Price</label>
                                <input type="text" name="price" ref="price" placeholder="Price" />
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