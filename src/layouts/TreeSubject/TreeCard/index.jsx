import React from 'react';
import classes from './style.module.scss';
const TreeCard = (props) => {
    const {name,number,id} = props.subject
    return (
        <div className={classes.TreeCard}>
            <h5 className={classes.hiddenName}>{name}</h5>
            <div className={classes.content}>
                <span>{id}</span>
                <span>-</span>
                <span>TC: {number}</span>
            </div>
        </div>
    )
}

export default TreeCard;