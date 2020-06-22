/*     

import React from 'react';

class Services extends React.Component {
    get = () => fetch('/')
    post = () => fetch('/')

    passedProps = () => ({
        get: this.get,
        post: this.post
    })

    render() {
        return this.props.children(this.passedProps())
    }
}


...

    render() {
        return (
            <Services>
                {({ get, post}) => {
                    return (
                        <>
                            <Component1 fetchData={get} />
                            <Component2 postData={post} />
                        </>
                    )
                }}
            </Services>
        )
    }

...

*/
