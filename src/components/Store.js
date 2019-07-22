import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { withFirebase } from './firebase';
import { compose } from 'recompose';
import { ShippingForm } from '.';
import { connect } from 'react-redux';
import { fetchMarketplace } from '../store/marketplace';

class StoreBase extends Component {
  constructor(props) {
    super(props);
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
    };
    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  componentDidMount() {
    this.props.fetchMarketplace();
  }

  render() {
    console.log('props in store', this.props);
    let featured = null;
    let rewards = [];
    this.state.data.sort((a, b) =>
      a.price < b.price ? 1 : b.price < a.price ? -1 : 0
    );
    featured = this.state.data[0];
    rewards = this.state.data.slice(1);
    return (
      <>
        <Modal id="modal" isOpen={this.state.modal}>
          <ModalHeader toggle={this.toggleForm} id="test">
            Shipping
          </ModalHeader>
          <ModalBody>
            <ShippingForm />
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
                  <h1 id="featuredName">{featured.name}</h1>
                  <img src="/images/redBerryIcon.png" alt="" />
                  {featured.price}
                </div>
              </div>
            </div>
            <div id="rewards">
              {rewards.map(reward => (
                <div id="rewardCard">
                  <img src={reward.picture} alt="" />
                  <div id="rewardsInfo">
                    <div className="rewardsTxt">
                      <h1>{reward.name}</h1>
                      <img src="/images/redBerryIcon.png" alt="" />
                      {reward.price}
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

const Store = compose(
  withRouter,
  withFirebase
)(StoreBase);

const mapStateToProps = state => ({
  store: state.marketplace.store,
});
const mapDispatchToProps = dispatch => ({
  fetchMarketplace: () => dispatch(fetchMarketplace()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Store);
