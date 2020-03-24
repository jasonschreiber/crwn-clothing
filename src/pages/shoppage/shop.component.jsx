import React from 'react';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'; 

//cqn now route because seperated overview component
const ShopPage = ({collections}) => (
    <div className='shop-page'>
        <CollectionsOverview/>
    </div>
);


export default ShopPage;