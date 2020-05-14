import React from 'react';

const ConsultantItem = (props) => {
    const { item } = props;
    console.log("ConsultantItem -> item", item)
    return (
        <div>
            {item.classId}
        </div>
    );
};

export default ConsultantItem;