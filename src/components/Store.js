import React, { Component } from 'react';

class Store extends Component {
  constructor() {
    super();
    this.state = {
      store: [],
      featured: {},
      rewards: [],
    };
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
      <div id="store">
        <div id="storeBody">
          <div id="featured">
            <img id="featuredImg" src={featured.image} alt="" />
            <div id="featuredInfo">
              <div className="rewardsTxt">
                <h1 id="featuredName">{featured.name}</h1>
                <img src="/images/redBerryIcon.png" alt="" />
                {featured.berries}
              </div>
            </div>
          </div>
          <div id="rewards">
            {rewards.map(reward => (
              <div id="rewardCard">
                <img src={reward.image} alt="" />
                <div id="rewardsInfo">
                  <div className="rewardsTxt">
                    <h1>{reward.name}</h1>
                    <img src="/images/redBerryIcon.png" alt="" />
                    {reward.berries}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default Store;
