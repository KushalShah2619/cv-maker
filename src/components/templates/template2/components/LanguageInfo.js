import React, { Component } from "react";
import { connect } from "react-redux";
import { Accordion, Card, Form, Button } from "react-bootstrap";
import firestore from "./../../../../firebase/firestore";

class LanguageInfo extends Component {
  handleAddLanguageBlock = () => {
    let tid = Date.now();
    let newBlock = { id: tid, languageName: "", languageLevel: "1" };
    this.props.addLanguageBlock(newBlock);
    firestore
      .collection("users")
      .doc(this.props.auth.uid)
      .collection("cvs")
      .doc(this.props.id)
      .update({
        updatedAt: new Date()
      })
      .then(() => console.log("update date and time"))
      .catch(err => {
        console.log(err);
      });
  };

  handleChangeLanguageName = (event, id) => {
    this.props.updateLanguageName(event.target.value, id);
    firestore
      .collection("users")
      .doc(this.props.auth.uid)
      .collection("cvs")
      .doc(this.props.id)
      .update({
        updatedAt: new Date()
      })
      .then(() => console.log("update date and time"))
      .catch(err => {
        console.log(err);
      });
    let dummyBlock = { id: "dummy" };
    this.props.addLanguageBlock(dummyBlock);
    this.props.removeLanguageBlock("dummy");
  };

  handleChangeLanguageLevel = (event, id) => {
    this.props.updateLanguageLevel(event.target.value, id);
    firestore
      .collection("users")
      .doc(this.props.auth.uid)
      .collection("cvs")
      .doc(this.props.id)
      .update({
        updatedAt: new Date()
      })
      .then(() => console.log("update date and time"))
      .catch(err => {
        console.log(err);
      });
    let dummyBlock = { id: "dummy" };
    this.props.addLanguageBlock(dummyBlock);
    this.props.removeLanguageBlock("dummy");
  };

  handleRemoveLanguageBlock = id => {
    this.props.removeLanguageBlock(id);
    firestore
      .collection("users")
      .doc(this.props.auth.uid)
      .collection("cvs")
      .doc(this.props.id)
      .update({
        updatedAt: new Date()
      })
      .then(() => console.log("update date and time"))
      .catch(err => {
        console.log(err);
      });
  };
  componentDidUpdate() {
    firestore
      .collection("users")
      .doc(this.props.auth.uid)
      .collection("cvs")
      .doc(this.props.id)
      .collection("language")
      .doc(this.props.id)
      .set({
        ...this.props.languageBlocks
      })
      .then(() => console.log("update language"))
      .catch(err => {
        console.log(err);
      });
  }
  componentWillUnmount() {
    let TlanguageBlocks = this.props.languageBlocks;
    let n = TlanguageBlocks.length;
    for (let i = 0; i < n; i++) {
      this.props.removeLanguageBlock(TlanguageBlocks[i].id);
    }
  }
  componentDidMount() {
    firestore
      .collection("users")
      .doc(this.props.auth.uid)
      .collection("cvs")
      .doc(this.props.id)
      .collection("language")
      .doc(this.props.id)
      .get()
      .then(resp => {
        let language = resp.data();
        if (!language) return null;
        let sz = Object.keys(language).length;
        for (let i = 0; i < sz; i++) {
          let newBlock = {
            id: language[i].id,
            languageName: language[i].languageName,
            languageLevel: language[i].languageLevel
          };
          this.props.addLanguageBlock(newBlock);
        }
      });
  }

  render() {
    return (
      <div>
        <Accordion defaultActiveKey=" ">
          {this.props.languageBlocks.map((value, index) => {
            return (
              <Card key={value.id}>
                <Accordion.Toggle as={Card.Header} eventKey={index}>
                  Language #{index + 1}
                  <Button
                    className="float-right"
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      this.handleRemoveLanguageBlock(value.id);
                    }}
                    style={{
                      display: "inline-block",
                      float: "left",
                      margin: "5px"
                    }}
                  >
                    {" "}
                    -Remove
                  </Button>
                </Accordion.Toggle>

                <Accordion.Collapse eventKey={index}>
                  <Card.Body>
                    <Form>
                      <Form.Group controlId="formGroupDegreeName">
                        <Form.Label>Language Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Leadership"
                          onChange={event => {
                            this.handleChangeLanguageName(event, value.id);
                          }}
                          defaultValue={
                            this.props.languageBlocks[index].languageName
                          }
                        />
                      </Form.Group>

                      <Form.Group controlId="formGroupLanguageLevel">
                        <Form.Label>Language Level - (Range: 1-5)</Form.Label>

                        <Form.Control
                          type="range"
                          min="1"
                          max="5"
                          title={value.languageLevel}
                          defaultValue={
                            this.props.languageBlocks[index].languageLevel
                          }
                          step="1"
                          onChange={event => {
                            this.handleChangeLanguageLevel(event, value.id);
                          }}
                          custom
                        />
                      </Form.Group>
                    </Form>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })}
        </Accordion>

        <Button
          variant="primary"
          style={{ margin: "5px" }}
          onClick={this.handleAddLanguageBlock}
        >
          {" "}
          +Add
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state);
  return {
    languageBlocks: state.languageRed_2.languageBlocks_2,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLanguageBlock: newBlock => {
      dispatch({ type: "ADD_LANGUAGE_BLOCK_2", newBlock: newBlock });
    },
    updateLanguageName: (languageName, id) => {
      dispatch({
        type: "UPDATE_LANGUAGE_NAME_2",
        languageName: languageName,
        id: id
      });
    },
    updateLanguageLevel: (languageLevel, id) => {
      dispatch({
        type: "UPDATE_LANGUAGE_LEVEL_2",
        languageLevel: languageLevel,
        id: id
      });
    },
    removeLanguageBlock: id => {
      dispatch({ type: "REMOVE_LANGUAGE_BLOCK_2", id: id });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageInfo);
