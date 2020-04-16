import React, {useState} from 'react';
import {connect} from 'react-redux';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import {signUpStart} from '../../redux/user/user.actions';

import './sign-up.styles.scss';

const SignUp = ({signUpStart}) => {

    const [userCredentials, setCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmpassword: ''
    });

    const {displayName, email, password, confirmpassword} = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();

        if(password !== confirmpassword){
            alert("passwords don't match");
            return;
        }
        
        signUpStart({displayName, email, password});
    }

    const handleChange = async event => {
        const {name, value} = event.target;
        setCredentials({...userCredentials, [name]: value});
    }

    return(
        <div className='sign-up'>
            <h2 className='title'>I do not have a account</h2>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                    label='Display Name'
                    required  
                />
                <FormInput
                type='email'
                name='email'
                value={email}
                onChange={handleChange}
                label='Email'
                required  
                />
                <FormInput
                type='password'
                name='password'
                value={password}
                onChange={handleChange}
                label='Password'
                required  
                />
                <FormInput
                type='password'
                name='confirmpassword'
                value={confirmpassword}
                onChange={handleChange}
                label='Confirm Password'
                required  
                /> 
                <CustomButton type='submit'>SIGN UP</CustomButton>                 
                
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp);

