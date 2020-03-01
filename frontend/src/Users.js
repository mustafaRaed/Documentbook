import React from "react"

class Users extends React.Component{
    constructor() {
        super()
        this.state = {users: []}
    }

    componentDidMount() {
        fetch("http://localhost:9000/")
            .then(res => res.json())
            .then(res => res.map(e => <p key={e._id}>{e.name}</p>))
            .then(res => this.setState({users: res}))
    }

    render() {
        return <div>{this.state.users}</div>
    }
}

export default Users