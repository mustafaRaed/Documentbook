import React, {Component} from "react"
import {Form, Card, Button, Container, Row, Col, Jumbotron} from 'react-bootstrap'

class PostDocument extends Component{

    constructor(props) {
        super();
        this.state = {file: null, description: '', title: '', courseName: props.courseName}
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
    }

    handleSubmit(e){
        const formData = new FormData();
        formData.append("title", this.state.title)
        formData.append("description", this.state.description)
        formData.append("courseName", this.state.courseName)
        formData.append("document", this.state.file)

        fetch('http://localhost:9000/post-document', {
            method: 'post',
            body: formData
        })
    }

    onFileChange(e){
        this.setState({file: e.target.files[0]})
    }

    onDescriptionChange(e){
        this.setState({description: e.target.value})
    }

    onTitleChange(e){
        this.setState({title: e.target.value})
    }

    render() {
        return (<Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>Post document</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Document title</Form.Label>
                                    <Form.Control type={"text"} placeholder={"Document title"} onChange={this.onTitleChange}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Describe document</Form.Label>
                                    <Form.Control as="textarea" rows="3" placeholder={"Description..."} onChange={this.onDescriptionChange}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type={"file"}  onChange={this.onFileChange}/>
                                </Form.Group>
                                <Button variant={"primary"} type={"submit"} size={"lg"} block onClick={this.handleSubmit}>
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>)
    }
}

export default PostDocument