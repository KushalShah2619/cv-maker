import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Card, Button } from "react-bootstrap";
import firestore from "../../../firebase/firestore";

class PositionInfo extends Component {
  handleAddPositionBlock = () => {
    let tid = Date.now();
    let newBlock = { id: tid, information: "" };
    this.props.addPositionBlock(newBlock);
  };
  componentDidUpdate() {
    firestore
      .collection("position")
      .doc(this.props.id)
      .set({
        ...this.props.positionBlocks
      })
      .then(console.log("update position"))
      .catch(err => {
        console.log(err);
      });
  }
  componentWillUnmount() {
    let TpositionBlocks = this.props.positionBlocks;
    let n = TpositionBlocks.length;
    for (let i = 0; i < n; i++) {
      this.props.removePositionBlock(TpositionBlocks[i].id);
    }
  }
  componentDidMount() {
    firestore
      .collection("position")
      .doc(this.props.id)
      .get()
      .then(resp => {
        let position = resp.data();
        if (!position) return null;
        let sz = Object.keys(position).length;
        for (let i = 0; i < sz; i++) {
          let newBlock = {
            id: position[i].id,
            information: position[i].information
          };
          this.props.addPositionBlock(newBlock);
        }
      });
  }

  handleChangePosition = (event, id) => {
    this.props.updatePosition(event.target.value, id);
    let dummyBlock = { id: "dummy", information: "" };
    this.props.addPositionBlock(dummyBlock);
    this.props.removePositionBlock("dummy");
  };

  handleRemovePositionBlock = id => {
    this.props.removePositionBlock(id);
  };

  render() {
    return (
      <div>
        {this.props.positionBlocks.map((value, index) => {
          return (
            <Card body border="primary" style={{ margin: "10px" }} key={index}>
              <Form>
                <Form.Group controlId="formGroupPos">
                  {" "}
                  {/*Area of Interest*/}
                  <Form.Control
                    type="text"
                    placeholder="Member of X committee from January 2020 to May 2020..."
                    onChange={event => {
                      this.handleChangePosition(event, value.id);
                    }}
                    defaultValue={this.props.positionBlocks[index].information}
                  />
                </Form.Group>
              </Form>
              <Button
                variant="danger"
                onClick={() => {
                  this.handleRemovePositionBlock(value.id);
                }}
                style={{
                  display: "inline-block",
                  float: "left",
                  margin: "5px"
                }}
              >
                {" "}
                -Remove{" "}
              </Button>
            </Card>
          );
        })}
        <Button variant="primary" onClick={this.handleAddPositionBlock}>
          {" "}
          +Add{" "}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    positionBlocks: state.positionRed.positionBlocks,
    position: state.firestore.ordered.position
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPositionBlock: newBlock => {
      dispatch({ type: "ADD_POSITION_BLOCK", newBlock: newBlock });
    },
    updatePosition: (information, id) => {
      dispatch({
        type: "UPDATE_POSITION_INFORMATION",
        information: information,
        id: id
      });
    },
    removePositionBlock: id => {
      dispatch({ type: "REMOVE_POSITION_BLOCK", id: id });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PositionInfo);
