import React, {useEffect, lazy, suspence, Suspense} from 'react';
import {Route} from 'react-router-dom';
//import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';

import {fetchCollectionsStart} from '../../redux/shop/shop.actions';
//import {selectIsCollectionFetching, selectIsCollectionsLoaded} from '../../redux/shop/shop.selectors';

import Spinner from '../../components/spinner/spinner.component';

//import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
//import CollectionPageContainer from '../collection/collection.container';
const CollectionsOverviewContainer = lazy(() => import('../../components/collections-overview/collections-overview.container'));
const CollectionPageContainer = lazy(() => import('../collection/collection.container'));



//const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
//const CollectionPageWithSpinner = WithSpinner(CollectionPage);

//cqn now route because seperated overview component
const ShopPage = ({fetchCollectionsStart, match}) => {

    useEffect(()=>{
        fetchCollectionsStart();
    }, [fetchCollectionsStart]);

    return(
        <div className='shop-page'>
            <Suspense fallback={<Spinner/>}>
                <Route 
                exact 
                path={`${match.path}`} 
                component={CollectionsOverviewContainer}
                />
                <Route 
                    path={`${match.path}/:collectionId`} 
                    component={CollectionPageContainer}
                />
            </Suspense>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);