import React, { Component } from "react"
import { Row, Col, Icon } from "antd"
import FileUploader from "react-firebase-file-uploader"
import { WithContext as ReactTags } from "react-tag-input"

import firebase from "firebase/app"
import "firebase/storage"

import styles from "./styles.module.css"

export class settings extends Component {
  state = {
    first_name: "",
    last_name: "",
    about: "",
    bio: "",
    email: "",
    facebook: "",
    github: "",
    linkedin: "",
    profile_pic: "",
    skills: "",
    skills_array: [],
    username: "",
    isUploading: false,
    progress: 0,
    pic: "",
  }

  componentDidMount() {
    let data = this.props.data

    let skills_array = []

    data.skills.split(",").map(skill => {
      let skill_obj = {
        id: skill,
        text: skill,
      }

      skills_array.push(skill_obj)

      return 0
    })

    this.setState({
      first_name: data.first_name,
      last_name: data.last_name,
      about: data.about,
      bio: data.bio,
      username: data.username,
      email: data.email,
      facebook: data.facebook,
      github: data.github,
      linkedin: data.linkedin,
      skills: data.skills,
      profile_pic: data.profile_pic,
      skills_array,
    })
  }

  handleInputChange = e => {
    const target = e.target
    this.setState({
      [target.name]: target.value,
    })
  }

  // Image Upload Functions

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 })

  handleProgress = progress => this.setState({ progress })

  handleUploadError = error => {
    this.setState({ isUploading: false })
    console.error(error)
  }

  handleUploadSuccess = filename => {
    this.setState({ pic: filename, progress: 100, isUploading: false })
    firebase
      .storage()
      .ref("Profile_pic")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ profile_pic: url }))
  }

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>Settings</h1>

        <h2 className={styles.sub_heading}>Personal</h2>
        <Row>
          <Col xs={24} lg={12}>
            <div className={styles.input_label}>First Name</div>
            <input
              type="text"
              className={styles.input}
              placeholder="First Name"
              value={this.state.first_name}
              onChange={this.handleInputChange}
              name="first_name"
            />

            <div className={styles.input_label}>Last Name</div>
            <input
              type="text"
              className={styles.input}
              placeholder="Last Name"
              value={this.state.last_name}
              onChange={this.handleInputChange}
              name="last_name"
            />

            <div className={styles.input_label}>Username</div>
            <input
              type="text"
              className={styles.input}
              placeholder="Username"
              value={this.state.username}
              name="username"
              disabled
            />

            <div className={styles.input_label}>Email ID</div>
            <input
              type="text"
              className={styles.input}
              placeholder="Email ID"
              value={this.state.email}
              name="last_name"
              disabled
            />
          </Col>
          <Col xs={24} lg={12}>
            <div className={styles.pic_container}>
              <img
                className={styles.profile_pic}
                src={this.state.profile_pic}
                alt="Profile Picture"
              />
              <label className={styles.add_image_btn}>
                <Icon type="camera" theme="filled"></Icon>
                <FileUploader
                  hidden
                  accept="image/*"
                  name="profile_pic"
                  randomizeFilename
                  storageRef={firebase.storage().ref("Profile_pic")}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadSuccess}
                  onProgress={this.handleProgress}
                />
              </label>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default settings