import { Button } from 'react-bootstrap';

function VoteComponent() {
  const vote = async () => {

  }

  const cancel = async () => {

  }

  return (<div>

    <h4>Your liquidity</h4>
    <br />
    <div>
      ...
    </div>
    <br />
    <div>
      <span className="radio-container">
        <input type="radio" value="yes" name="voting-option" /> Yes
      </span>
      <span className="radio-container">
        <input type="radio" value="no" name="voting-option" /> No
      </span>
    </div>

    <br />

    <div>
      <Button className="btn-primary" onClick={vote}>Vote</Button>
      <Button className="btn-secondary" onClick={cancel}>Cancel</Button>
    </div>

  </div>)
}


export default VoteComponent;