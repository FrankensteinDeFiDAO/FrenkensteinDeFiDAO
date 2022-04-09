import { Button } from 'react-bootstrap';

function CreateManual() {
  const propose = async () => {

  }

  return (<div>
    <h4>Create manual intervention proposal</h4>

    <br />
    <div>
      <div className="standart-margin">
        <span className="radio-container">
          <input type="radio" value="swapfree" name="voting-option" /> Set Swap Free
        </span>
      </div>
      <div className="standart-margin">
        <span className="radio-container">
          <input type="radio" value="shiftrange" name="voting-option" /> Shift Range
        </span>
      </div>
      <div className="standart-margin">
        <span className="radio-container">
          <input type="radio" value="zoomrange" name="voting-option" /> Zoom Range
        </span>
      </div>
    </div>

    <br />
    <input type="text" placeholder="parameter" />

    <br />
    <br />

    <div>
      <Button className="btn-custom-primary" onClick={propose}>Propose</Button>
    </div>
  </div>)
}


export default CreateManual;