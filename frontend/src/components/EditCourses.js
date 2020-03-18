import React, {Component} from "react"
import {Button, Card, Form, Nav, Accordion} from 'react-bootstrap'
import EditCourseForm from "./EditCourseForm";
import AddCourseForm from "./AddCourseForm";

class EditCourses extends Component{
    constructor() {
        super();
        this.state = {courses: [], selectedCourse: {}, updatedCourse: {}, newCourse: {},
                      activateUpdateButton: false, activateAddButton: false}
        this.termins = [1,2,3,4,5,6,"Not in termin"];
        this.hps = [7.5,15,22.5,30];
        this.positionInTermin = [1,2,3,4]

        this.changeCourse = this.changeCourse.bind(this)
        this.changeFormTextForEditCourse = this.changeFormTextForEditCourse.bind(this)
        this.changeUpdateButtonStatus = this.changeUpdateButtonStatus.bind(this)
        this.handleCourseUpdate = this.handleCourseUpdate.bind(this)
        this.handleDeleteCourse = this.handleDeleteCourse.bind(this)

        this.handleAddCourse= this.handleAddCourse.bind(this)
        this.changeFormTextForAddCourse = this.changeFormTextForAddCourse.bind(this)
        this.changeAddButtonStatus = this.changeAddButtonStatus.bind(this)
    }

    componentDidMount() {
        fetch("http://localhost:9000/courseInfo")
            .then(res => res.json())
            .then(res => {this.setState({courses: res,
                                              selectedCourse: res[0],
                                              updatedCourse: res[0],
                                              newCourse: {name: "", termin: this.termins[0], hp: this.hps[0],
                                                          positionInTermin: this.positionInTermin[0]}})})
    }

    changeUpdateButtonStatus(){
        let updatedCourse = this.state.updatedCourse
        let originalCourse = this.state.selectedCourse

        if (updatedCourse.name === originalCourse.name &&
            updatedCourse.termin == originalCourse.termin &&
            updatedCourse.hp == originalCourse.hp &&
            updatedCourse.positionInTermin == originalCourse.positionInTermin)
            this.setState({activateUpdateButton: false})
        else
            this.setState({activateUpdateButton: true})
    }

    async changeCourse(e){
        await this.setState({selectedCourse: this.state.courses[e.target.selectedIndex],
                            updatedCourse: this.state.courses[e.target.selectedIndex]})

        this.changeUpdateButtonStatus()
    }

    async changeFormTextForEditCourse(e) {
        let targetId = e.target.id
        let targetValue = e.target.value
        if (targetId === "courseNameInput")
            await this.setState({updatedCourse: {_id: this.state.selectedCourse._id,
                                                      name: targetValue,
                                                      termin: this.state.updatedCourse.termin,
                                                      hp: this.state.updatedCourse.hp,
                                                      positionInTermin: this.state.updatedCourse.positionInTermin}})
        else if (targetId === "terminFormInput")
            await this.setState({updatedCourse: {_id: this.state.selectedCourse._id,
                                                      name: this.state.updatedCourse.name,
                                                      termin: targetValue,
                                                      hp: this.state.updatedCourse.hp,
                    positionInTermin: this.state.updatedCourse.placementInTermin}})
        else if (targetId === "hpFormInput")
            await this.setState({updatedCourse: {_id: this.state.selectedCourse._id,
                                                      name: this.state.updatedCourse.name,
                                                      termin: this.state.updatedCourse.termin,
                                                      hp: targetValue,
                    positionInTermin: this.state.updatedCourse.placementInTermin}})
        else
            await this.setState({updatedCourse: {_id: this.state.selectedCourse._id,
                                      name: this.state.updatedCourse.name,
                                      termin: this.state.updatedCourse.termin,
                                      hp: this.state.updatedCourse.hp,
                    positionInTermin: targetValue}})

        this.changeUpdateButtonStatus()
    }

    async handleCourseUpdate(e){
        if (this.state.updatedCourse.termin === "Not in termin")
            await this.setState({updatedCourse: {_id: this.state.selectedCourse._id,
                                      name: this.state.updatedCourse.name,
                                      termin: -1,
                                      hp: this.state.updatedCourse.hp,
                    positionInTermin: this.state.updatedCourse.placementInTermin}})

        fetch('http://localhost:9000/update-course', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({updatedCourse: this.state.updatedCourse, originalCourse: this.state.selectedCourse})
        })
    }

    changeAddButtonStatus(){
        if (this.state.newCourse.name !== "")
            this.setState({activateAddButton: true})
        else
            this.setState({activateAddButton: false})

    }

    async changeFormTextForAddCourse(e) {
        let targetId = e.target.id
        let targetValue = e.target.value
        if (targetId === "courseNameInput")
            await this.setState({newCourse: {name: targetValue,
                                                  termin: this.state.newCourse.termin,
                                                  hp: this.state.newCourse.hp,
                    positionInTermin: this.state.newCourse.placementInTermin}})
        else if (targetId === "terminFormInput"){
            if (targetValue === "Not in termin")
             targetValue = -1

            await this.setState({newCourse: {name: this.state.newCourse.name,
                    termin: targetValue,
                    hp: this.state.newCourse.hp,
                    positionInTermin: this.state.newCourse.placementInTermin}})
        }
        else if (targetId === "hpFormInput")
            await this.setState({newCourse: {name: this.state.newCourse.name,
                                                  termin: this.state.newCourse.termin,
                                                  hp: targetValue,
                    positionInTermin: this.state.newCourse.placementInTermin}})
        else
            await this.setState({newCourse: {name: this.state.newCourse.name,
                                                  termin: this.state.newCourse.termin,
                                                  hp: this.state.newCourse.hp,
                    positionInTermin: targetValue}})

        this.changeAddButtonStatus()
    }

    handleAddCourse(e){
        fetch('http://localhost:9000/add-course', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newCourse: this.state.newCourse})
        })
    }

    handleDeleteCourse(){
        fetch('http://localhost:9000/delete-course', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({_id: this.state.selectedCourse._id,
                                       name: this.state.selectedCourse.name})
        })
    }

    render(){
        let terminOptions = this.termins.map(termin => <option>{termin}</option>)
        let hpOptions = this.hps.map(hp => <option>{hp}</option>)
        let placementInTerminOptions = this.positionInTermin.map(nr => <option>{nr}</option>)
        return (<Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant={"link"} eventKey={"0"}>
                            Edit/Delete Course
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
                                {console.log(this.state)}
                                <EditCourseForm updatedCourse={this.state.updatedCourse} changeHandler={this.changeFormTextForEditCourse}
                                                updateHandler={this.handleCourseUpdate} activateUpdateButton={this.state.activateUpdateButton}
                                                termins={terminOptions} hps={hpOptions} nrInTermin={placementInTerminOptions}
                                                handleDeleteCourse={this.handleDeleteCourse}/>
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
                                <AddCourseForm termins={terminOptions} hps={hpOptions} addCourseHandler={this.handleAddCourse}
                                                changeHandler={this.changeFormTextForAddCourse} activateAddButton={this.state.activateAddButton}
                                                nrInTermin={placementInTerminOptions}/>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>)
    }
}

export default EditCourses