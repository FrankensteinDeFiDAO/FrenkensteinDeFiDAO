import { Button } from 'react-bootstrap';

function ExecuteComponent() {
  const accept = async () => {
    alert("hello, wrlde!");
  }

  return (<div>

    <h4>Execute current strategy?</h4>
   
    <br />

    <div>
      ... listing  ELECTED proposal, currentBlock gt deadline block, yesvote gt half_of_totalSupply ... (clickable)
      <div>show function, parameter</div>
      <div>parameter</div>
      <div>deadline</div>
      <div>number of current votes/pool.totalSupply</div>
    </div>

    <br />

    <div>for a robot: block.number gt robot.lastCallBlock() + robot.cycle()</div>
    <br />

    <div>
      <Button className="btn-custom-primary" onClick={accept}>Accept</Button>
    </div>

    <br />
    <br />
    <h5>Airdrop!</h5>
    <div>Execute to accept the Airdrop 0.01 ETH</div>
  </div>)
}

export default ExecuteComponent;