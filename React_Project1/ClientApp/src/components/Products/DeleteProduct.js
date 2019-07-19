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


    modalShow = () => { this.setState({ open: true }) }


    close = () => this.setState({ open: false })

    componentDidMount() {
        
      //  axios.get("https:///localhost:44394/api/Products").then(response => {
        axios.get("https://reactonboard.azurewebsites.net/api/Products").then(response => {
           // console.log(response.data);
            this.setState({
                ProductData: response.data
            });
        });
    }

    onDelete() {
        
       

           // fetch(`https:///localhost:44394/api/Products/` + this.props.delid, {
                fetch( `https://reactonboard.azurewebsites.net/api/Products/` + this.props.delid, {

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
                <Button onClick={this.modalShow} className="btn red "> <i className="trash icon"></i>Delete </Button>
                <Modal
                    open={open}
                    onClose={this.close}>
                    <Modal.Header>Delete Product</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure, Do you want to delete this Product?</p>
                        
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.close} negative> Cancel </Button>
                        <Button
                            onClick={(id) => this.onDelete(this.props.delid)}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Delete' />
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}