import React, {Component} from 'react';
import Table from 'react-bootstrap/Table'
import './App.css';

class Lhome extends Component {
    constructor(props) {
        super(props);

        this.courses = [
            {
                termin: <td width="75px">Termin 1</td>,
                course1: <td>OM066G Omvårdnad GR(A) Omvårdnadens kunskapsområde 7,5 hp</td>,
                course2: <td>MV006G Medicinsk vetenskap GR(A) Anatomi och fysiologi 7,5 hp</td>,
                course3: <td colSpan="2">OM067G Omvårdnad GR(A) Hälsa, miljö och omvårdnadshandlingar 15 hp</td>,
            },
            {
                termin: <td>Termin 2</td>,
                course1: <td>MV027G Medicinsk vetenskap GR(A) Mikrobiologi och farmakologi 7,5 hp</td>,
                course2: <td>OM065G Omvårdnad GR(A) Hälsa och ohälsa I 7,5 hp</td>,
                course3: <td>OM069G Omvårdnad GR(A) Allmän hälso- och sjukgård I (VFU) 7,5 hp</td>,
                course4: <td>OM070G Omvårdnad GR(A) Hälsa och ohälsa II 7,5 hp</td>
            },
            {
                termin: <td>Termin 3</td>,
                course1: <td>MV028G Medicinsk vetenskap GR(B) Vård vid ohälsa och sjukdom I 7,5 hp</td>,
                course2: <td>OM068G Omvårdnad GR(B) Information och undervisning i omvårdnad I 7,5 hp</td>,
                course3: <td>MV029G Medicinsk vetenskap GR(B) Vård vid ohälsa och sjukdom II 7,5 hp</td>,
                course4: <td>OM071G Omvårdnad GR(B) Ledarskap och organisation av omvårdnadsarbete 7,5 hp</td>
            },
            {
                termin: <td>Termin 4</td>,
                course1: <td colSpan="2">OM072G Omvårdnad GR(B) Allmän hälso- och sjukvård II (VFU) 15hp</td>,
                course3: <td>MV030G Medicinsk vetanskap GR(B) Vård vid ohälsa och sjukdom III 7,5 hp</td>,
                course4: <td>OM073G Omvårdnad GR(B) Hälsa och ohälsa III 7,5 hp</td>
            },
            {
                termin: <td>Termin 5</td>,
                course1: <td colSpan="2">OM078G Omvårdnad GR(B) Allmän hälso- och sjukvård III (VFU) 15hp</td>,
                course3: <td colSpan="2">OM079G/OM081G Omvårdnad GR(C) Vetenskaplig metod 15 hp</td>,
            },
            {
                termin: <td>Termin 6</td>,
                course1: <td colSpan="2">OM080G/OM08 Omvårdnad GR(C) Examensarbete (76-90 hp) 15hp</td>,
                course3: <td colSpan="2">OM075G Omvårdnad GR(C) Allmän hälso- och sjukvård IV(VFU) 15 hp</td>,
            },
        ]
    }

    renderCourses = (course, index) => {
        return (
        <tr key={index}>
            {course.termin}
            {course.course1}
            {course.course2}
            {course.course3}
            {course.course4}
        </tr>
        )
    }

    render() {
        return (
            <Table striped bordered hover size="sm" className="mt-5">
                <thead>
                <tr>
                    <th colSpan="5" className="text-center">
                        <h2>Programmet Sjuksköterskeutbildningen 180 hp</h2>
                    </th>
                </tr>
                </thead>
                <tbody>
                {this.courses.map(this.renderCourses)}
                </tbody>
            </Table>
        );
    }
}

export default Lhome;