import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';


export class AddStore extends Component {
    state = { open: false }
    modalShow = () => { this.setState({ open: true }) }
    close = () => this.setState({ open: false })
    addStore(newStore) {
        axios.request({
            method: 'post',
            url: 'https://localhost:44394/api/Stores',
            data: newStore
        }).then(response => {
            console.log("addstore", response.data);
            this.props.history.push('/');
        }).catch(err => console.log(err));
        this.close();
        window.location.reload();
    }
    onSubmit(e) {
        const newStore = {
            name: this.refs.storename.value,
            address: this.refs.address.value,
        }
        this.addStore(newStore);
        e.preventDefault();
    }
    render() {
        const { open } = this.state
        return (
            <div>
                <br />
                <Button primary onClick={this.modalShow}> Add Store</Button>
                <Modal
                    open={open}
                    onClose={this.close}>
                    <Modal.Header>Add Store</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure do you want to add Store?</p>
                        <div className="ui form">
                            <div className="field">
                                <label>Store Name</label>
                                <input type="text" name="StoreName" ref="storename" placeholder="store Name" />
                            </div>
                            <div className="field">
                                <label>Address</label>
                                <input type="text" name="Address" ref="address" placeholder="address" />
                            </div>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.close} negative>Cancel </Button>
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