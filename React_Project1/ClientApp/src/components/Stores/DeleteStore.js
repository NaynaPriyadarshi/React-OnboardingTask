import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';


export class DeleteStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

        axios.get("https://localhost:44394/api/Stores").then(response => {

            this.setState({
                StoreData : response.data
            });
        });
    }

    onDelete() {

        fetch(`https://localhost:44394/api/Stores/` + this.props.delid, {

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
                <Button onClick={this.onDelete.bind(this)} className="btn red "> <i className="trash icon"></i>Delete </Button>
                <Modal
                    open={open}
                    onClose={this.close}>
                    <Modal.Header>Delete Store</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure do you want to delete this Store?</p>
                        <div className="ui form">
                            <div className="field">
                                <label>Store Name</label>
                                <input type="text" name="storename" ref="storename" placeholder="store Name" />
                            </div>
                            <div className="field">
                                <label>address</label>
                                <input type="text" name="address" ref="address" placeholder="address" />
                            </div>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.close} negative> No </Button>
                        <Button
                            onClick={(id) => this.onDelete(this.props.delid)}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Yes' />
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}