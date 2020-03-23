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
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors';

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
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //this.setState({currentUser: user});
      
      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          // this.setState({
          //   currentUser: {
          //     id: snapShot.id, 
          //     ...snapShot.data()
          //   }
          // });
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })

        });       
      }
      setCurrentUser(userAuth);
      //this.setState({currentUser: userAuth})
    });
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
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
