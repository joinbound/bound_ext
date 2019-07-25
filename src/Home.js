import React, { Component } from 'react';
import { Header, NavigationBar, MainScreen } from './components';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            storeView: false,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = event => {
        this.setState({
            storeView: Boolean(event.target.className === 'store'),
        });
    };

    render() {
        const { storeView } = this.state;
        const { signOut } = this.props;
        return (
            <div id="home">
                <Header></Header>
                <MainScreen displayStore={storeView}></MainScreen>
                <h1 id="signOut" onClick={signOut}>
                    Log Out
                </h1>
                <NavigationBar handleClick={this.handleClick}></NavigationBar>
            </div>
        );
    }
}

export default Home;
