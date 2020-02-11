import React from 'react';

// import components
import Header from "../../organisms/Home/Header/Header";

const TasksLayout = (props) => {
    return (
        <React.Fragment>
            <Header {...props} />
            <main>
                {props.children}
            </main>
        </React.Fragment>
    )
}
export default TasksLayout;