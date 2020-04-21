import React, { useEffect, useCallback, useReducer } from 'react';
import classes from './style.module.scss';
import Spinner from 'shared/components/Spinner';
import TreeSubjectService from 'core/store/treesubject/treesubjectService';
import TreeList from 'modules/StudentHome/components/TreeList';


const subjectReducer = (currentTree, action) => {
    switch (action.type) {
        case 'FETCH_SUBJECTS':
            return action.tree;
        default:
            throw new Error('Should not get there!');
    }
};

const httpReducer = (curHttpState, action) => {
    switch (action.type) {
        case 'SEND':
            return { loading: true, error: null };
        case 'RESPONSE':
            return { loading: false, error: false };
        case 'ERROR':
            return { loading: false, error: action.errorMessage };
        case 'CLEAR':
            return { ...curHttpState, error: null };
        default:
            throw new Error('Should not get there!');
    }
};

 const TreeSubject = () => {

    const [tree, dispatchTree] = useReducer(subjectReducer, {
        1:{subjects:[], allNum:0},
        2:{subjects:[], allNum:0},
        3:{subjects:[], allNum:0},
        4:{subjects:[], allNum:0},
        5:{subjects:[], allNum:0},
        6:{subjects:[], allNum:0},
        7:{subjects:[], allNum:0},
        8:{subjects:[], allNum:0}
    });

    const [httpState, dispatchHttp] = useReducer(httpReducer, {
        loading: false,
        error: null
    });

    const onFetchSubjects = useCallback(() => {
        dispatchHttp({ type: 'SEND' });
        TreeSubjectService.fetchSubjectsDDT().then(res => {
            dispatchTree({ type: 'FETCH_SUBJECTS', tree: res.data });
            dispatchHttp({ type: 'RESPONSE' });
        }).catch(err => {
            console.log("onFetchSubjects -> err", err)
            dispatchHttp({ type: 'ERROR', errorMessage: err });
        })
    }, []);

    useEffect(() => {
        onFetchSubjects();
    }, [onFetchSubjects]);

    return httpState.loading ? <Spinner /> : (
        <div className={classes.TreeScreen}>
            <h5>HK1 - ({tree[1].allNum} TC)</h5>
            <TreeList subjects = {tree[1].subjects} />
            <h5>HK2 - ({tree[2].allNum} TC)</h5>
            <TreeList subjects = {tree[2].subjects}/>
            <h5>HK3 - ({tree[3].allNum} TC)</h5>
            <TreeList subjects = {tree[3].subjects} />
            <h5>HK4 - ({tree[4].allNum} TC)</h5>
            <TreeList subjects = {tree[4].subjects} />
            <h5>HK5 - ({tree[5].allNum} TC)</h5>
            <TreeList subjects = {tree[5].subjects} />
            <h5>HK6 - ({tree[6].allNum} TC)</h5>
            <TreeList subjects = {tree[6].subjects}/>
            <h5>HK7 - ({tree[7].allNum} TC)</h5>
            <TreeList subjects = {tree[7].subjects} />
            <h5>HK8 - ({tree[8].allNum} TC)</h5>
            <TreeList subjects = {tree[8].subjects}/>
        </div>
    )
}
export default TreeSubject;