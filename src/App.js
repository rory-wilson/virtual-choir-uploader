import React, { useState } from 'react';

import { Container, Row, Col, Card } from 'react-bootstrap';
import Intro from './components/Intro';
import PersonalDetails from './components/PersonalDetails';
import Complete from './components/Complete';
import Preview from './components/Preview';
import Recorder from './components/Recorder';
import Error from './components/Error';
import './App.css';

function App() {
  const [state, setState] = useState('record');
  const [track, setTrack] = useState();
  const [name, setName] = useState("");

  return (
    <div className="App">
      <Container className="clearfix">
        <Row className="justify-content-md-center mt-5">
          <Col xs lg="8">
            <Card>
              <Card.Body>
                {state === 'start' && <Intro onClick={() => setState('details')} />}
                {state === 'details' && <PersonalDetails onClick={(name) => {
                  setName(name);
                  setState('record')
                }
                } />}
                {state === 'record' && <Recorder videoId="J1R5S-X9DEw" onRecorded={(recordedBlob) => {
                  setTrack(recordedBlob);
                  setState('preview');
                }} />}
                {state === 'preview' && <Preview name={name} track={track}
                  onCancel={() => setState('record')}
                  onSubmit={() => setState('done')}
                  onError={() => setState('error')} />}
                {state === 'done' && <Complete />}
                {state === 'error' && <Error onClick={() => setState('record')} />}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
