import React from 'react';
import {Route} from 'react-router-dom';
//import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';

import {fetchCollectionsStart} from '../../redux/shop/shop.actions';
//import {selectIsCollectionFetching, selectIsCollectionsLoaded} from '../../redux/shop/shop.selectors';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

//const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
//const CollectionPageWithSpinner = WithSpinner(CollectionPage);

//cqn now route because seperated overview component
class ShopPage extends React.Component {
    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const {fetchCollectionsStart} = this.props;
        fetchCollectionsStart();
        
        
        //OLD
        //const {updateCollections} = this.props;
        //const collectionRef = firestore.collection('collections');

        

        //observer pattern
        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     updateCollections(collectionsMap);
        //     this.setState({loading: false});

        // });
    }

    render(){
        const {match} = this.props;
        //const {loading} = this.state;
        return(
            <div className='shop-page'>
                <Route 
                exact 
                path={`${match.path}`} 
                component={CollectionsOverviewContainer}
                />
                <Route 
                    path={`${match.path}/:collectionId`} 
                    component={CollectionPageContainer}
                />
            </div>
        );
    }
}

// const mapStateToProps = createStructuredSelector({
//     isCollectionsLoaded: selectIsCollectionsLoaded
// });

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
    //updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);