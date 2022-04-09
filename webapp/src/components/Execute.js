import { Button } from 'react-bootstrap';

function ExecuteComponent() {
  const accept = async () => {
    alert("hello, wrlde!");
  }

  return (<div>

    <h4>Execute current strategy?</h4>
    <br />
    <div>
      <Button className="btn-custom-primary" onClick={accept}>Accept</Button>
    </div>
  </div>)
}

export default ExecuteComponent;