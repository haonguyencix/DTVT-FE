import React from 'react'
import Header from "../StudentHome/Header";

const TreeSubjectLayout = (props) => {
    return (
        <React.Fragment>
            <Header {...props} />
            <main>
                {props.children}
            </main>
        </React.Fragment>
    )
}
export default TreeSubjectLayout;