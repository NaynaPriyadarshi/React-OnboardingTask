import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';


export class EditStore extends Component {
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

        this.editStore();

    }

    componentDidUpdate() {

        this.editStore();

    }



    editStore() {
        axios.get(`https://localhost:44394/api/Stores/` + this.props.editid).then(response => {

            this.setState({
                id: response.data.id,
                name: response.data.name,
                address: response.data.address

            }, () => {
                console.log("hi", this.state);

            });



        }).catch(err => console.log(err));

    }


    editStores(newStore) {

        let id = this.state.id;
        let store = {
            id: this.state.id,
            name: newStore.name,
            address: newStore.address
        }
        console.log(store);
        axios.request({
            method: 'put',
            url: `https://localhost:44394/api/Stores/` + id,
            data: store

        }).then(response => {

            this.props.history.push('/');
            this.setState({
                name: newStore.name,
                address: newStore.address

            }, () => {
                console.log("hi", this.state);

            });

        }).catch(err => console.log(err));

        this.close();
        window.location.reload();
    }





    onSubmit(e) {
        const newStore = {

            name: this.refs.storename.value,
            address: this.refs.address.value
        }
        this.editStores(newStore);
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
                    <Modal.Header>Edit Store</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure do you want to Edit this Store?</p>
                        <div className="ui form">
                            <div className="field">
                                <label>Store Name</label>
                                <input type="text" name="storename" ref="storename" defaultValue={this.state.name} onChange={this.handleInputChange} />
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

