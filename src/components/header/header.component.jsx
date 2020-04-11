import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';


import {auth} from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {signOutStart} from '../../redux/user/user.actions';

import {ReactComponent as Logo} from '../../assets/crown.svg';

import './header.styles.scss';

import {HeaderContainer, LogoContainer, OptionsContainer, OptionDiv, OptionLink} from './header.styles';

//functional components .no state
const Header = ({currentUser, hidden, signOutStart}) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo'/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/shop'>
                CONTACT
            </OptionLink>
            {
                currentUser ?
                <OptionDiv onClick={signOutStart}>
                    SIGN OUT
                </OptionDiv>
                :
                <OptionLink to='/signin'>
                    SIGN IN
                </OptionLink>
            }
            <CartIcon/>
        </OptionsContainer>
        {
            hidden ? null : <CartDropdown/>
        }
        
    </HeaderContainer>
)

//standard name for redux codebase
//desctructure off state
//Auto passes state from structured Selector
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);

// const Header = ({currentUser, hidden}) => (
//     <div className='header'>
//         <Link className='logo-container' to="/">
//             <Logo className='logo'/>
//         </Link>
//         <div className='options'>
//             <Link className='option' to='/shop'>
//                 SHOP
//             </Link>
//             <Link className='option' to='/shop'>
//                 CONTACT
//             </Link>
//             {
//                 currentUser ?
//                 <div className='option' onClick={() => auth.signOut()}>
//                     SIGN OUT
//                 </div>
//                 :
//                 <Link className='option' to='/signin'>
//                     SIGN IN
//                 </Link>
//             }
//             <CartIcon/>
//         </div>
//         {
//             hidden ? null : <CartDropdown/>
//         }
        
//     </div>
// )