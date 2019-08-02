import React, { Component } from 'react'
import Comments from './Comments'
import NewComment from './NewComment'
import Login from './Login'
import User from './User'

import { database, auth } from './firebase'

class App extends Component {
  state = {
    comments: {},
    isLoading: false,
    isAuth: false,
    isAuthError: false,
    authError: '',
    user: {}
  }

  sendComment = comment => {
    const id = database
      .ref()
      .child('comments')
      .push().key
    const comments = {}
    comments['comments/' + id] = {
      comment,
      email: this.state.user.email,
      userId: this.state.user.uid
    }
    database.ref().update(comments)
  }

  login = async (email, passwd) => {
    const { auth } = this.props

    this.setState({
      authError: '',
      isAuthError: false
    })

    try {
      await auth.signInWithEmailAndPassword(email, passwd)
    } catch (error) {
      console.log(error.code)
      this.setState({
        authError: error.code,
        isAuthError: true
      })
    }
  }

  componentDidMount () {
    this.setState({ isLoading: true })
    this.comments = database.ref('comments')
    this.comments.on('value', snapshot => {
      this.setState({ comments: snapshot.val(), isLoading: false })
    })
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ isAuth: true, user })
      } else {
        this.setState({ isAuth: false, user: '' })
      }
    })
  }

  logout = () => {
    const { auth } = this.props
    auth.signOut()
  }
  render () {
    return (
      <div>
        {this.state.isAuth && (
          <User email={this.state.user.email} logout={this.logout} />
        )}
        {!this.state.isAuth && (
          <Login
            login={this.login}
            isAuthError={this.state.isAuthError}
            authError={this.state.authError}
          />
        )}
        {this.state.isAuth && <NewComment sendComment={this.sendComment} />}
        <Comments comments={this.state.comments} />
        {this.state.isLoading && <p>Carregando...</p>}
      </div>
    )
  }
}

export default App
