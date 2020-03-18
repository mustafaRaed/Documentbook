import React, {Component} from 'react';
import {Table, Button} from 'react-bootstrap'
import './App.css';
import {Link} from 'react-router-dom';

class Lhome extends Component {

    constructor(props) {
        super(props);
        this.state = {courses: []}
    }

    compareFunction(a,b){
        if (a._id > b._id)
            return 1
        else if (a._id < b._id)
            return -1
        else
            return 0
    }

    componentDidMount() {
        fetch("http://localhost:9000/courses")
            .then(res => res.json())
            .then(res => res.map(termin => <tr key={termin._id}>
                {console.log(res)}
                                            <td width="75px">Termin {termin._id}</td>
                                            {termin.objects.sort(this.compareFunction)
                                                .map(course => <td key={course._id} colSpan={(course.hp/7.5).toString()}>
                                                                <Button variant={"link"}>
                                                                    <Link to={"/course/" + course.name}>
                                                                        {course.name}
                                                                    </Link></Button>
                                                                </td>)}
                                           </tr>))
            .then(res => this.setState({courses: res}))
    }

    render() {
        return (
            <Table striped bordered hover size="sm" className="mt-5" hover={false}>
                <thead>
                <tr>
                    <th colSpan="5" className="text-center">
                        <h2>Programmet Sjuksköterskeutbildningen 180 hp</h2>
                    </th>
                </tr>
                </thead>
                <tbody>
                {this.state.courses}
                </tbody>
            </Table>
        );
        }
    }
    export default Lhome;