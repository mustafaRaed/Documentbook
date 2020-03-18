import React, {Component} from 'react';
import {Table, Button} from 'react-bootstrap'
import './App.css';
import {Link} from 'react-router-dom';

class Lhome extends Component {

    constructor(props) {
        super(props);
        this.state = {courses: []}
        this.notInTermin= []
    }

    compareFunction(a,b){
        if (a.positionInTermin > b.positionInTermin)
            return 1
        else if (a.positionInTermin < b.positionInTermin)
            return -1
        else
            return 1
    }

    async componentDidMount() {
        await fetch("http://localhost:9000/courses")
            .then(res => res.json())
            .then(res => {  if(res[0]._id === -1){
                             this.notInTermin = [res[0]]
                             res.shift()
                            }
                            this.setState({courses: res})})
    }

    render() {
        let inTerminHtml = this.state.courses.map(termin => <tr key={termin._id}>
                                                                <td width="75px">Termin {termin._id}</td>
                                                                 {termin.objects.sort(this.compareFunction)
                                                                .map(course => <td key={course._id} colSpan={(course.hp/7.5).toString()}>
                                                                                <Button variant={"link"}>
                                                                                    <Link to={"/course/" + course.name}>
                                                                                        {course.name}
                                                                                    </Link>
                                                                                </Button>
                                                                 </td>)}
                                                            </tr>)

        let notInTerminHtml = this.notInTermin.map(course => <tr key={course._id}>
                                                                     {course.objects.sort(this.compareFunction)
                                                                    .map(course => <td key={course._id} colSpan={(course.hp/7.5).toString()}>
                                                                                    <Button variant={"link"}>
                                                                                        <Link to={"/course/" + course.name}>
                                                                                        {course.name}
                                                                                        </Link>
                                                                                    </Button>
                                                                                    </td>)}
                                                                    </tr>)

        return (
            <div>
                <Table striped bordered hover size="sm" className="mt-5" hover={false}>
                    <thead>
                    <tr>
                        <th colSpan="5" className="text-center">
                            <h2>Programmet Sjuksköterskeutbildningen 180 hp</h2>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {inTerminHtml}
                    </tbody>
                </Table>
                <br/>
                <br/>
                <Table striped bordered hover size="sm" className="mt-5" hover={false}>
                    <thead>
                    <tr>
                        <th colSpan="5" className="text-center">
                            <h2>Other courses</h2>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {notInTerminHtml}
                    {console.log(this.state)}
                    </tbody>
                </Table>
            </div>
        );
        }
    }
    export default Lhome;