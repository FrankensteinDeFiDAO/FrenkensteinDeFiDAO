import { Button } from 'react-bootstrap';

function VoteComponent() {
  const vote = async () => {

  }

  const cancel = async () => {

  }

  return (<div>

    <h4>Vote on proposal</h4>

    <br />
    
    <div>
      ... listing ... (clickable)
      <div>show function, parameter</div>
      <div>parameter</div>
      <div>deadline</div>
      <div>number of current votes/pool.totalSupply</div>
    </div>

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