import React, {useEffect, lazy, Suspense} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'

//import HomePage from './pages/homepage/homepage.compents';
//import ShopPage from './pages/shoppage/shop.component';
//import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
//import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import {GlobalStyle} from './global.styles';

import {selectCurrentUser} from './redux/user/user.selectors';
import {checkUserSession} from './redux/user/user.actions';

const HomePage = lazy(() => import('./pages/homepage/homepage.compents'));
const ShopPage = lazy(() => import('./pages/shoppage/shop.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import('./components/header/header.component'));

const App = ({checkUserSession, currentUser}) =>{

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
  // redux now allows us to remove header currentUSer.. currentUser={this.state.currentUser
  return (
    <div>
      <GlobalStyle/>
      <Header/>
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner/>}>
            <Route exact path='/' component={HomePage}/>      
            <Route path='/shop' component={ShopPage}/>
            <Route exact path='/checkout' component={CheckoutPage}/>
            {console.log(currentUser)}
            <Route 
              exact 
              path='/signin' 
              render={() => 
                currentUser ? (
                  <Redirect to='/'/>
                  ) : (
                    <SignInAndSignUpPage/>
                    )
                  }
              />
            </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  //collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
