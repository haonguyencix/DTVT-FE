import React from 'react';

// import components
import Header from "../StudentHome/Header";

const ToDoList = props => {
    return (
        <React.Fragment>
            <Header />
            <main>
                {props.children}
            </main>
        </React.Fragment>
    )
}
export default ToDoList;