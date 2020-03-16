import React, {Component} from "react"
import {Button, Card, Form} from "react-bootstrap";


function Document(props) {
    return (
        <Card border={"info"}>
        <Card.Header>{props.data.title}</Card.Header>
        <Card.Body>
            <Card.Title>Description</Card.Title>
            <Card.Text>{props.data.description}</Card.Text>
            <Button variant="info" href={'http://localhost:9000/download-document/' + props.data.courseName + "&" + props.data.fileName}
                    download >Download file: '{props.data.fileName}'</Button>
        </Card.Body>
    </Card>)
}
      
export default Document