/* eslint-disable indent */
import React from 'react';
import './MainContainerStyle.scss';
import { connect } from 'react-redux';
import { BASE_URL } from '../../../Shared/Constants';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { toast } from 'mdbreact';

class ProfileChecks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortable: true,
            checks: []
        };
        this.activateReorder = this.activateReorder.bind(this);
        this.onSortEnd = this.onSortEnd.bind(this);
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.props.updateOrder(arrayMove(this.props.checks, oldIndex, newIndex));
    };

    activateReorder(e){
        if (this.state.sortable){
            this.setState({sortable: false});
            this.props.reorderChecks(false);
            toast.success('You may now re-order checks',{
                autoClose:3000
            });
        } else {
            this.setState({sortable: true});
            this.props.reorderChecks(true);
        }
    }
    
    render() {
        let imgStyle = {
            width: '15px',
            objectFit: 'contain',
            padding: '0 20px 0 0'
        };
        const SortableItem = sortableElement(({ value }) => <li id="jobProfileChecks"><img style={imgStyle} src={require('../../../Assets/' + value.toString().toLowerCase() + '.svg')}></img>{value}</li>);

        const SortableContainer = sortableContainer(({ children }) => {
            return <ul>{children}</ul>;
        });

        let addRemoveCheckStyle = {
            width: '592px',
            height: '22px',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 'bold',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.57',
            letterSpacing: '0.9px',
            color: '#0091d1'
        };
        return (
            <div>
                <p className="Verification-checks">Verification checks required for {localStorage.getItem('jp')}</p>
                {/* <ul>
                    {listItems}
                </ul> */}
                <SortableContainer onSortEnd={this.onSortEnd}>
                    { this.props.checks.map((value, index) => <SortableItem key={`item-${value.id}`} index={index} value={value.category} disabled={this.state.sortable}/>)}
                </SortableContainer>
                <a id="addRemoveChecks" style={addRemoveCheckStyle} onClick={this.props.addRemove} >+ Add or - Remove verification checks </a>
                <a id="reorderChecks" onClick={this.activateReorder} > Re-order sequences of checks </a>
            </div >
        );
    }
}

export default connect()(ProfileChecks);