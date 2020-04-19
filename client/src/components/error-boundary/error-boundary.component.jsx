import React from 'react';

import {ErrorImageOverlay, ErrorImageContainer, ErrorImageText} from './error-boundary.styles';

class ErrorBoundary extends React.Component {
    
    constructor() {
        super();

        this.state = {
            hasErrored: false
        }
    }
    //catches children error when wrapped arund
    static getDerivedStateFromError(error) {
        //process the error
        return {hasErrored: true};
    }

    componentDidCatch(error, info) {
        console.log(error);
    }

    render(){
        if(this.state.hasErrored){
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/yW2W9SC.png'/>
                    <ErrorImageText>Sorry this page this broken</ErrorImageText>
                </ErrorImageOverlay>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;