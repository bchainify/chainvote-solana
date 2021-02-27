import React, { Component } from 'react';
import { MDBBtn } from 'mdbreact';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { sampleAction } from '../actions';

class Sample extends Component {

    render(){
        return (
            <MDBBtn color="primary" style={{zIndex:'1000'}} onClick={() => { this.props.sampleAction(); }}>Sample Action</MDBBtn>
      )
    }
}

const mapStateToProps = state => {
    return { ...state.sample }
};
  
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        sampleAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Sample);
