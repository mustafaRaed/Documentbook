import React, {Component} from "react"
import {Table, Button, Container, Row, Col, Jumbotron} from 'react-bootstrap'
import PostDocument from "./PostDocument.js"
import Document from "./Document.js"

class CoursePage extends Component{

    constructor(props) {
        super();
        console.log(props.match.params.name)
        this.state = {courseName: props.match.params.name,
                      documents: []}
    }

    componentDidMount() {
        fetch("http://localhost:9000/documents")
            .then(res => res.json())
            .then(res => res.map(document => <div>
                                                <Document key={document._id} data={document}/>
                                                <br/>
                                             </div>))
            .then(res => this.setState({documents: res}))
    }

    render() {
        return (<Container>
            <Row>
                <Col><h1>{this.state.courseName}</h1></Col>
            </Row>
            <Row>
                <Col lg={4}><PostDocument courseName={this.state.courseName}/></Col>
                <Col>
                    <Jumbotron>
                        {this.state.documents}
                    </Jumbotron>
                </Col>
            </Row>
        </Container>)
    }
}

export default CoursePage