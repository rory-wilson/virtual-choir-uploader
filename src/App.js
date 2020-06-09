import React, { useState } from 'react';
import queryString from 'query-string';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Container, Row, Col, Card } from 'react-bootstrap';
import { Intro, PersonalDetails, Test, Complete, Preview, Record, Error, NotFound } from './views';
import './App.css';

function App() {
  const [track, setTrack] = useState(null);
  const [name, setName] = useState("");
  //  const qs = queryString.parse(window.location.search);
  //  console.log(qs)

  return (
    <div className="App">
      <Container className="clearfix">
        <Row className="justify-content-md-center mt-5">
          <Col xs lg="8">
            <Card>
              <Card.Body>
                <Router>
                  <Switch>
                    <Route exact path="/">
                      <Intro />
                    </Route>
                    <Route path="/test">
                      <Test />
                    </Route>
                    <Route path="/details">
                      <PersonalDetails onClick={(name) => setName(name)} />
                    </Route>
                    <Route path="/record">
                      <Record videoId={process.env.REACT_APP_YOUTUBE_ID} onRecorded={(recordedBlob) => {
                        setTrack(recordedBlob);
                      }} /></Route>
                    <Route path="/preview">
                      <Preview name={name} track={track} /></Route>
                    <Route path="/done">
                      <Complete />
                    </Route>
                    <Route path="/error">
                      <Error />
                    </Route>
                    <Route><NotFound /></Route>
                  </Switch>
                </Router>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
