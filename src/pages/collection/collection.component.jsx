import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {selectCollection} from '../../redux/shop/shop.selectors'; 

import './collection.styles.scss';

const CollectionPage = ({collection}) => (
    <div className='collection-page'>
        <h2>COLLECTION PAGE</h2>
        <h2>{collection.id}</h2>
    </div>
);

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);