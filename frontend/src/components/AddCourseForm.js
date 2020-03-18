import React from "react"
import {Button, Col, Container, Form, Jumbotron, Row} from "react-bootstrap";

function AddCourseForm(props) {
    return <Form>
        <Jumbotron>
            <Container>
                <Row>
                    <Col>
                        <Form.Group controlId="courseNameInput">
                            <Form.Label>Course name</Form.Label>
                            <Form.Control type="text" onChange={props.changeHandler} required/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="terminFormInput">
                            <Form.Label>Termin</Form.Label>
                            <Form.Control as="select" onChange={props.changeHandler}>
                                {props.termins}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="hpFormInput">
                            <Form.Label>hp</Form.Label>
                            <Form.Control as="select" onChange={props.changeHandler}>
                                {props.hps}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="placementInTerminFormInput">
                            <Form.Label>Place in termin</Form.Label>
                            <Form.Control as="select" onChange={props.changeHandler}>
                                {props.nrInTermin}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Button variant={"primary"} type={"submit"} size={"lg"} onClick={props.addCourseHandler} disabled={!props.activateAddButton}>
                            Add course!
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    </Form>
}


export default AddCourseForm