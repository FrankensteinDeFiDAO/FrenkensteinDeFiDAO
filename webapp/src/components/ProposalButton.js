import React from "react";

function ProposalButton(props) {
    return (
        <div key={props.index} className={"proposal-item " + (props.selected === props.proposal && "proposal-item-selected")} style={{ textAlign: "center" }} onClick={() => props.selectProposal(props.proposal)}>
            <div>Proposal {props.proposal.id.toString()}</div>
            <div>
                {props.proposal.p1.toString() !== '0'
                    ? <span className="item-robot">Robot</span>
                    : <span className="item-manual">Manual</span>}
            </div>
        </div>
    );
}

export default ProposalButton;
