import { Button } from 'react-bootstrap';

function CreateRobot() {
  const compile = async () => {

  }

  const deploy = async () => {

  }

  const propose = async () => {

  }

  return (<div>
    <h4>Propose a robot strategy</h4>
    <br />

    <textarea placeholder='Paste robot source'>
      
    </textarea>

    
    <br />
    <div>
      <Button className="btn-custom-primary" onClick={compile}>Compile</Button>
    </div>
    <div>
      <Button className="btn-custom-primary" onClick={deploy}>Deploy</Button>
    </div>
    <div>
      <Button className="btn-custom-primary" onClick={propose}>Propose</Button>
    </div>
  </div>)
}


export default CreateRobot;