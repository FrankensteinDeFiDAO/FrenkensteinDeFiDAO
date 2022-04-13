import React from "react";
import BigNumber from "bignumber.js";

function ProposalComponent(props) {

    return (<div>
        <div className="proposal-show-container">
            <div className="proposal-show">
                <div className="proposal-line">
                    Operation:&nbsp;
                    <span className="proposal-value">
                        {
                            props.selected.op.toString() === '0'
                                ? 'Set Swap Free (' + props.selected.op.toString() + ')'
                                : props.selected.op.toString() === '1'
                                    ? 'Shift Range (' + props.selected.op.toString() + ')'
                                    : props.selected.op.toString() === '2'
                                        ? 'Zoom Range (' + props.selected.op.toString() + ')'
                                        : props.selected.op.toString() === '3'
                                            ? 'Robot Strategy (' + props.selected.op.toString() + ')'
                                            : props.selected.op.toString() === '4'
                                                ? 'Remove Robot (' + props.selected.op.toString() + ')'
                                                : 'Unknown Operation'
                        }
                    </span>
                </div>


                {/*  swap fee: n / 100  -- %   > 30 == 0.3% */}
                {/* others 18 decimals */}

                <div className="proposal-line">
                    <span>
                        {
                            props.selected.op.toString() === '0'
                                ? 'Swap Fee'
                                : props.selected.op.toString() === '1'
                                    ? 'Shift Factor'
                                    : props.selected.op.toString() === '2'
                                        ? 'Zoom Factor'
                                        : props.selected.op.toString() === '3'
                                            ? 'Cycle'
                                            : props.selected.op.toString() === '4'
                                                ? 'Proposal ID'
                                                : 'Unknown'
                        }

                    </span>
                    <span>:&nbsp;</span>
                    <span className="proposal-value">{props.selected.p0.toString()}</span>
                </div>
                <div className="proposal-line">
                    {props.selected.p1.toString() !== '0' ? <>Robot address: <span className="proposal-address">{props.selected.p1.toHexString()}</span></> : <>&nbsp;</>}
                </div>
                <div className="proposal-line">
                    Yes votes:
                    <span className="proposal-value">
                        {
                            props.selected.yesVotes.isGreaterThan(0)
                                ? <span>&nbsp; {props.selected.yesVotes.toString()} / {props.totalSupply.toString()} ({new BigNumber(props.selected.yesVotes.div(props.totalSupply)).multipliedBy(100).toString()}%)</span>
                                : <span>&nbsp; {props.selected.yesVotes.toString()} / {props.totalSupply.toString()} </span>
                        }
                    </span>
                </div>
                <div className="proposal-line">
                    Deadline block : <span className="proposal-value">{props.selected.deadlineBlock.toString()}</span>
                </div>
                <div className="proposal-line">
                    I voted:
                    <span className="proposal-value">
                        {
                            props.selected.iVoted.toString() !== '0'
                                ? <span>&nbsp; {props.selected.iVoted.toString()} / {props.totalSupply.toString()} ({new BigNumber(props.selected.iVoted.div(props.totalSupply)).multipliedBy(100).toString()}%)</span>
                                : <>&nbsp; {props.selected.iVoted.toString()} / {props.totalSupply.toString()}</>
                        }
                    </span>
                </div>
            </div>
        </div>

    </div>);
}

export default ProposalComponent;