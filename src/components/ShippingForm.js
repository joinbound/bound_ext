import React, { Component } from 'react';
import { Button } from 'reactstrap';


class ShippingForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      shippingAddress: '',
      shippingAddress2: '',
      city: '',
      state: '',
    }; 
  }

  render() {
    return (
    <div>
        <h2 id="ques" class="col text-center" >Are you sure you want to purchase this item?</h2>
        <Button outline color="danger" >Yes</Button>{' '}
        <div class="divider"/>
        <Button outline color="danger">No</Button>{' '}
    </div>
    );
  }
}
export default ShippingForm;
