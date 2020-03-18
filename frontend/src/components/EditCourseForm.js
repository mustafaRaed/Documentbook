import React from "react"
import {Button, Col, Container, Form, Jumbotron, Row} from "react-bootstrap";

function EditCourseForm(props) {
    return <Jumbotron>
                <Container>
                    <Row>
                        <Col>
                            <Form.Group controlId="courseNameInput">
                                <Form.Label>Course name</Form.Label>
                                <Form.Control type="text" defaultValue={props.updatedCourse.name} onChange={props.changeHandler}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="terminFormInput">
                                <Form.Label>Termin</Form.Label>
                                <Form.Control as="select" value={props.updatedCourse.termin === -1 ? "Not in termin" : props.updatedCourse.termin}
                                              onChange={props.changeHandler}>
                                    {props.termins}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="hpFormInput">
                                <Form.Label>hp</Form.Label>
                                <Form.Control as="select" value={props.updatedCourse.hp} onChange={props.changeHandler}>
                                    {props.hps}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="placeInTerminFormInput">
                                <Form.Label>Place in termin</Form.Label>
                                <Form.Control as="select" value={props.updatedCourse.positionInTermin} onChange={props.changeHandler}>
                                    {console.log(props.updatedCourse.positionInTermin)}
                                    {props.nrInTermin}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Button variant={"primary"} type={"submit"} size={"lg"} onClick={props.updateHandler}
                                    disabled={!props.activateUpdateButton}>
                                Update
                            </Button>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                        <Col>
                            <Button variant={"danger"} type={"submit"} size={"lg"} onClick={props.handleDeleteCourse}>
                                Delete course!
                            </Button>
                        </Col>
                    </Row>
                </Container>
           </Jumbotron>
}

export default EditCourseForm