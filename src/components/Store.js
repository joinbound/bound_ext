import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { ShippingForm } from '.';

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      store: [],
      featured: {},
      rewards: [],
    };
    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  componentDidMount() {
    const { firebase } = this.props;
    firebase
      .exportToDB()
      .collection('marketplace')
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({
          store: data.sort((a, b) =>
            a.berries < b.berries ? 1 : b.berries < a.berries ? -1 : 0
          ),
        });
        this.setState({ featured: this.state.store[0] });
        this.setState({ rewards: this.state.store.slice(1) });
      });
  }

  render() {
    let { featured, rewards } = this.state;
    if (!featured) featured = {};

    return (
      <>
        <Modal
          id="modal"
          isOpen={this.state.modal}
          toggle={this.toggleForm}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleForm} className="modalHeader">
            <div class="text-align: justify">Purchase Confirmation </div>
          </ModalHeader>
          <ModalBody>
            <ShippingForm toggleForm={this.toggleForm} />
          </ModalBody>
        </Modal>

        <div id="store">
          <div id="storeBody">
            <div id="featured">
              <img
                id="featuredImg"
                src={featured.image}
                onClick={this.toggleForm}
                alt=""
              />
              <div id="featuredInfo">
                <div className="rewardsTxt">
                  <h1 id="featuredName">
                    {featured.name}
                    <br />
                    <img id="berryIcon" src="/images/redBerryIcon.png" alt="" />
                    {featured.berries}
                  </h1>
                </div>
              </div>
            </div>
            <div id="rewards">
              {rewards.map(reward => (
                <div id="rewardCard">
                  <img src={reward.image} onClick={this.toggleForm} alt="" />
                  <div id="rewardsInfo">
                    <div className="rewardsTxt">
                      <h1 id="itemName">
                        {reward.name}
                        <br />
                        <img
                          id="berryIcon"
                          src="/images/redBerryIcon.png"
                          alt=""
                        />
                        <h1 className="berryNum">{reward.berries}</h1>
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
