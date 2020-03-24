import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import firestore from "../../../firebase/firestore";

class PersonalInfo extends Component {
  componentDidUpdate() {
    firestore
      .collection("users")
      .doc(this.props.auth.uid)
      .collection("cvs")
      .doc(this.props.id)
      .collection("profile")
      .doc(this.props.id)
      .set({
        name: this.props.name,
        collegeName: this.props.collegeName,
        email: this.props.email,
        dob: this.props.dob,
        address: this.props.address
      })
      .then(() => console.log("update profile"))
      .catch(err => {
        console.log(err);
      });
  }
  componentWillUnmount() {
    this.props.updateName("");
    this.props.updateCollgeName("");
    this.props.updateEmail("");
    this.props.updateDOB("");
    this.props.updateAddress("");
  }
  componentDidMount() {
    firestore
      .collection("users")
      .doc(this.props.auth.uid)
      .collection("cvs")
      .doc(this.props.id)
      .collection("profile")
      .doc(this.props.id)
      .get()
      .then(resp => {
        let profile = resp.data();
        if (!profile) return null;
        this.props.updateName(profile.name);
        this.props.updateCollgeName(profile.collegeName);
        this.props.updateEmail(profile.email);
        this.props.updateDOB(profile.dob);
        this.props.updateAddress(profile.address);
      });
  }
  handleChangeName = event => {
    this.props.updateName(event.target.value);
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

  handleChangeCollegeName = event => {
    this.props.updateCollgeName(event.target.value);
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

  handleChangeEmail = event => {
    this.props.updateEmail(event.target.value);
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

  handleChangeDOB = event => {
    this.props.updateDOB(event.target.value);
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

  handleChangeAddress = event => {
    this.props.updateAddress(event.target.value);
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

  render() {
    return (
      <div>
        <Form>
          <Form.Group controlId="formGroupFullName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Full Name"
              onChange={this.handleChangeName}
              defaultValue={this.props.name}
            />
          </Form.Group>

          <Form.Group controlId="formGroupCollegeName">
            <Form.Label>College Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="College name"
              onChange={this.handleChangeCollegeName}
              defaultValue={this.props.collegeName}
            />
          </Form.Group>

          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={this.handleChangeEmail}
              defaultValue={this.props.email}
            />
          </Form.Group>

          <Form.Group controlId="formGroupDOB">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="text"
              placeholder="April 15, 2020"
              onChange={this.handleChangeDOB}
              defaultValue={this.props.dob}
            />
          </Form.Group>

          <Form.Group controlId="formGroupAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Address"
              onChange={this.handleChangeAddress}
              defaultValue={this.props.address}
            />
          </Form.Group>
        </Form>

        {/*
                <div className="form basic-info-form">
                    <div className="form-input">
                        <label className="label">Name</label>
                        <p className="control">
                        <input className="input" type="text" onChange={this.handleChangeName} />
                        </p>
                    </div>

                    <div className="form-input">
                        <label className="label">College Name</label>
                        <p className="control">
                        <input className="input" type="text" onChange={this.handleChangeCollegeName} />
                        </p>
                    </div>
                    
                    <div className="form-input">
                        <label className="label">Email</label>
                        <p className="control">
                        <input className="input" type="text" onChange={this.handleChangeEmail} />
                        </p>
                    </div>

                    <div className="form-input">
                        <label className="label">Date of Birth</label>
                        <p className="control">
                        <input className="input" type="text" onChange={this.handleChangeDOB} />
                        </p>
                    </div>

                    <div className="form-input">
                        <label className="label">Address</label>
                        <p className="control">
                        <textarea className="textarea input" type="text" onChange={this.handleChangeAddress}></textarea>
                        </p>
                    </div>
                </div>
                */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.personRed.name,
    collegeName: state.personRed.collegeName,
    email: state.personRed.email,
    dob: state.personRed.dob,
    address: state.personRed.address,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateName: name => {
      dispatch({ type: "UPDATE_NAME", name: name });
    },
    updateCollgeName: collegeName => {
      dispatch({ type: "UPDATE_COLLEGENAME", collegeName: collegeName });
    },
    updateEmail: email => {
      dispatch({ type: "UPDATE_EMAIL", email: email });
    },
    updateDOB: dob => {
      dispatch({ type: "UPDATE_DOB", dob: dob });
    },
    updateAddress: address => {
      dispatch({ type: "UPDATE_ADDRESS", address: address });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
