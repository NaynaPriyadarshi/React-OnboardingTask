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


    modalShow = () => { this.setState({ open: true }) }


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
                <Button onClick={this.modalShow} className="btn red "> <i className="trash icon"></i>Delete </Button>
                <Modal
                    open={open}
                    onClose={this.close}>
                    <Modal.Header>Delete Store</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure, do you want to delete this Store?</p>
                       
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