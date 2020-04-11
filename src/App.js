import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'

import './App.css';

import HomePage from './pages/homepage/homepage.compents';
import ShopPage from './pages/shoppage/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';

import {selectCurrentUser} from './redux/user/user.selectors';
import {checkUserSession} from './redux/user/user.actions';


class App extends React.Component{
  //Not needed anymore with redux dispatcher
  // constructor(){
  //   super();
  //   this.state={
  //     currentUser: null
  //   }
  // }

  //stop memory leak
  unsubscribeFromAuth = null;

  componentDidMount(){
    const {checkUserSession} = this.props;
    checkUserSession();
  }

  componentWillUnmount(){
    //close subscription
    this.unsubscribeFromAuth();
  }
  // redux now allows us to remove header currentUSer.. currentUser={this.state.currentUser
  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={CheckoutPage}/>
          {console.log(this.props.currentUser)}
          <Route 
            exact 
            path='/signin' 
            render={() => 
              this.props.currentUser ? (
                <Redirect to='/'/>
                ) : (
                  <SignInAndSignUpPage/>
                  )
                }
            />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  //collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
