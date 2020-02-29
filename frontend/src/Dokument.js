import React, {Component} from 'react';
import { Tabs, Tab } from 'react-bootstrap'

class Dokument extends Component {
    render() {
        return (
            <div className="documentForm">
                <Tabs justify defaultActiveKey="laddaupp" id="uncontrolled-tab-example" className="tabsDocument">
                    <Tab eventKey="laddaupp" title="Ladda upp" className="tabText">
                        <div className="input-group mb-3">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="inputGroupFile02" />
                                <label className="custom-file-label" htmlFor="inputGroupFile02"
                                       aria-describedby="inputGroupFileAddon02">Choose file</label>
                            </div>
                            <div className="input-group-append">
                                <span className="input-group-text" id="inputGroupFileAddon02">Upload</span>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="tabort" title="Ta bort" className="tabText">
                        <p>Hello hello hello</p>

                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default Dokument;