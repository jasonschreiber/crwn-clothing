//use generator style funciton

import {takeLatest, call, put, all} from 'redux-saga/effects';

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

import {fetchCollectionsSuccess, fetchCollectionsFailure} from './shop.actions';
import ShopActionTypes from './shop.types';

//put is like dispatch
export function* fetchCollectionsAsync(){
    try{
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const colelctionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(colelctionsMap));
    } catch (error){
        yield put(fetchCollectionsFailure(error.message));
    }

}

export function* fetchCollectionsStart(){
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync
        );
}

export function* shopSagas(){
    yield all([call(fetchCollectionsStart)])
}


