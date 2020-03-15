import React, {Component} from "react"
import {Button, Card, Form, Nav, Accordion} from 'react-bootstrap'
import EditCourseForm from "./EditCourseForm";
import AddCourseForm from "./AddCourseForm";

class EditCourses extends Component{
    constructor() {
        super();
        this.state = {courses: [], selectedCourse: {}, updatedCourse: {}, activateUpdateButton: false}
        this.changeCourse = this.changeCourse.bind(this)
        this.changeFormText = this.changeFormText.bind(this)
        this.changeUpdateButtonStatus = this.changeUpdateButtonStatus.bind(this)
        this.handleCourseUpdate = this.handleCourseUpdate.bind(this)
    }

    componentDidMount() {
        fetch("http://localhost:9000/courseInfo")
            .then(res => res.json())
            .then(res => {this.setState({courses: res, selectedCourse: res[0], updatedCourse: res[0]})})
    }

    changeUpdateButtonStatus(){
        let updatedCourse = this.state.updatedCourse
        let originalCourse = this.state.selectedCourse

        if (updatedCourse.name === originalCourse.name &&
            updatedCourse.termin == originalCourse.termin &&
            updatedCourse.hp == originalCourse.hp)
            this.setState({activateUpdateButton: false})
        else
            this.setState({activateUpdateButton: true})
    }

    async changeCourse(e){
        await this.setState({selectedCourse: this.state.courses[e.target.selectedIndex],
                            updatedCourse: this.state.courses[e.target.selectedIndex]})

        this.changeUpdateButtonStatus()
    }

    async changeFormText(e) {
        let targetId = e.target.id
        let targetValue = e.target.value
        if (targetId === "courseNameInput")
            await this.setState({updatedCourse: {_id: this.state.selectedCourse._id,
                                                      name: targetValue,
                                                      termin: this.state.updatedCourse.termin,
                                                      hp: this.state.updatedCourse.hp}})
        else if (targetId === "terminFormInput")
            await this.setState({updatedCourse: {_id: this.state.selectedCourse._id,
                                                      name: this.state.updatedCourse.name,
                                                      termin: targetValue,
                                                      hp: this.state.updatedCourse.hp}})
        else
            await this.setState({updatedCourse: {_id: this.state.selectedCourse._id,
                                                      name: this.state.updatedCourse.name,
                                                      termin: this.state.updatedCourse.termin,
                                                      hp: targetValue}})

        this.changeUpdateButtonStatus()
    }

    handleCourseUpdate(e){
        fetch('http://localhost:9000/update-course', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({updatedCourse: this.state.updatedCourse, originalCourse: this.state.selectedCourse})
        })
    }

    render(){
        let termins = [1,2,3,4,5,6,"Not in termin"]
        let hps = [7.5,15,22.5,30]
        let terminOptions = termins.map(termin => <option>{termin}</option>)
        let hpOptions = hps.map(hp => <option>{hp}</option>)
        return (<Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant={"link"} eventKey={"0"}>
                            Edit Courses
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={"0"}>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Select course to edit</Form.Label>
                                    <Form.Control as="select" onChange={this.changeCourse}>
                                        {this.state.courses.map(course => <option key={course._id}>{course.name}</option>)}
                                    </Form.Control>
                                </Form.Group>
                                <EditCourseForm updatedCourse={this.state.updatedCourse} changeHandler={this.changeFormText}
                                                updateHandler={this.handleCourseUpdate} activateUpdateButton={this.state.activateUpdateButton}
                                                termins={terminOptions} hps={hpOptions}/>
                            </Form>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant={"link"} eventKey={"1"}>
                                Add course
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <p>Add course</p>
                                <AddCourseForm termins={terminOptions} hps={hpOptions} addCourseHandler={1}/>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>)
    }
}

export default EditCourses