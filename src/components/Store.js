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
      selected: {},
      user: null,
    };
    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm(evt) {
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
        this.setState({ user: this.props.user });
        this.setState({ featured: this.state.store[0] });
        this.setState({ rewards: this.state.store.slice(1) });
      });
  }

  render() {
    let { featured, rewards, user, selected } = this.state;
    if (!featured) featured = {};
    if (!user) user = {};

    return (
      <>
        <Modal
          id="modal"
          isOpen={this.state.modal}
          toggle={this.toggleForm}
          className={this.props.className}
        >
          {user.berries >= selected.berries ? (
            <>
              <ModalHeader toggle={this.toggleForm} className="modalHeader">
                <div class="text-align: justify">Purchase Confirmation </div>
              </ModalHeader>
              <ModalBody>
                <ShippingForm
                  toggleForm={this.toggleForm}
                  user={user}
                  selected={selected}
                  firebase={this.props.firebase}
                  handleUserData={this.props.handleUserData}
                />
              </ModalBody>
            </>
          ) : (
            <>
              <ModalHeader toggle={this.toggleForm} className="modalHeader">
                <div class="text-align: justify">Insufficent berries</div>
              </ModalHeader>
              <ModalBody toggle={this.toggleForm}>
                <h2 id="ques" class="col text-center">
                  Sorry! You don't have enough berries to purchase this item
                  yet!
                </h2>
              </ModalBody>
            </>
          )}
        </Modal>

        <div id="store">
          <div id="storeBody">
            <div
              id="featured"
              onClick={() => this.setState({ selected: featured })}
            >
              <img
                id="featuredImg"
                src={featured.image}
                onClick={this.toggleForm}
                alt=""
              />
              <div id="featuredInfo">
                <h1 id="featuredName">
                  {featured.name}
                  <br />
                  <img
                    className="berryIcon"
                    src="/images/redBerryIcon.png"
                    alt=""
                  />
                  <h1 className="berryNumFeat">{featured.berries}</h1>
                </h1>
              </div>
            </div>
            <div id="rewards">
              {rewards.map((reward, i) => (
                <div
                  id="rewardCard"
                  onClick={() => this.setState({ selected: reward })}
                  key={i}
                >
                  <img src={reward.image} onClick={this.toggleForm} alt="" />
                  <div id="rewardsInfo">
                    <div className="rewardsTxt">
                      <h1 id="itemName">
                        {reward.name}
                        <br />
                        <img
                          className="berryIcon"
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
