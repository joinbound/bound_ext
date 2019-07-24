import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';


class ShippingForm extends Component {
  constructor() {
    super();
    this.state = {
      nestedModal: false,
      closeAll: false
    }; 
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }



  render() {
    console.log(this.props);
    return (
    <div>
        <h2 id="ques" class="col text-center" >Are you sure you want to purchase this item?</h2>
        <Button outline color="danger" onClick={this.toggleNested} >Yes</Button>{' '}
<div class="divider"/>
<Button outline color="danger" onClick={this.toggleAll}>No</Button>{' '}

        <Modal id="modal" isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.props.toggleForm : undefined}>
              <ModalHeader className="modalHeader">
              <div  class="text-align: justify">Purchase Successful!</div>
              </ModalHeader>
              <ModalBody className="msg" >We'll reach out to you through email for shipping information shortly. If you have any questions, please feel free to contact us at help@joinbound.com.</ModalBody>
              <div id="allDoneBttn" class="col text-center">
              <Button outline color="danger" size="sm" onClick={this.toggleAll}>All Done</Button>{' '}
              </div>
        </Modal>
    </div>
    );
  }
}
export default ShippingForm;
