import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { ShippingForm } from '.';

class Store extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          name: 'Water Bottle',
          picture:
            'https://images-na.ssl-images-amazon.com/images/I/61dtC2URIPL._SX425_.jpg',
          price: 10,
        },
        {
          name: 'Adidas Stan Smith',
          picture:
            'https://shop.r10s.jp/auc-rodeo/cabinet/adidas/m20325-11.jpg',
          price: 20,
        },
        {
          name: 'School Supplies',
          picture:
            'https://www.mesaunitedway.org/helenshope/wp-content/uploads/2017/08/School-Supplies.jpg',
          price: 10,
        },
        {
          name: 'Coffee',
          picture:
            'https://milklife.com/sites/default/files/styles/recipe_zoomable_images_large/public/main_image/Recipe/2013/09/18/Protein-Packed%20Latte_square.jpg?itok=vwVtOEyA',
          price: 5,
        },
      ],
      modal: false,

      nestedModal: false,
      closeAll: false
    };
    this.toggleForm = this.toggleForm.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  toggleForm() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
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
    let featured = null;
    let rewards = [];
    this.state.data.sort((a, b) =>
      a.price < b.price ? 1 : b.price < a.price ? -1 : 0
    );
    featured = this.state.data[0];
    rewards = this.state.data.slice(1);
    return (
      <>

        <Modal id="modal" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggleForm} className="modalHeader">
            <div  class="text-align: justify">Purchase Confirmation  </div>
          </ModalHeader> 
           <ModalBody>
              <ShippingForm />

<Button outline color="danger" onClick={this.toggleNested} >Yes</Button>{' '}
<div class="divider"/>
<Button outline color="danger">No</Button>{' '}

        <Modal id="modal" isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
              <ModalHeader className="modalHeader">
              <div  class="text-align: justify">Purchase Successful!</div>
              </ModalHeader>
              <ModalBody className="msg" >We'll reach out to you through email for shipping information shortly. If you have any questions, please feel free to contact us at help@joinbound.com.</ModalBody>
              
              <Button outline color="danger" size="sm" block onClick={this.toggleAll}>All Done</Button>{' '}
        </Modal>
            </ModalBody>
        </Modal>

        <div id="store">
          <div id="storeBody">
            <div id="featured">
              <img
                id="featuredImg"
                src={featured.picture}
                onClick={this.toggleForm}
                alt=""
              />
              <div id="featuredInfo">
                <div className="rewardsTxt">
                  <h1 id="featuredName">
                  {featured.name}
                  <br></br>
                  <img id="berryIcon" src="/images/redBerryIcon.png" alt="" />
                  {featured.price}
                  </h1>
                </div>
              </div>
            </div>
            <div id="rewards">
              {rewards.map(reward => (
                <div id="rewardCard">
                  <img src={reward.picture} alt="" />
                  <div id="rewardsInfo">
                    <div className="rewardsTxt">
                      <h1 id="itemName">
                      {reward.name}
                      <br></br>
                      <img id="berryIcon" src="/images/redBerryIcon.png" alt="" />
                      <h1 className="berryNum">{reward.price}</h1>
                      </h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Store;
