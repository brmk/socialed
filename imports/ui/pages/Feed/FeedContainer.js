import React, { Component } from "react";
import Feed from "./Feed";
import PostsCollection from "/imports/api/posts/collection";
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';
import { Spinner } from 'reactstrap';

class FeedContainer extends Component {

  render() {
    const { loading, isLoggedIn } = this.props;
    if (loading) {
      return (<Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />);
    }
    if (!isLoggedIn) {
      return (
        <Redirect to="/login" />
      )
    }
    return (
      <Feed
        {...this.props}
      />
    );
  }
}

export default withTracker(props => {
  const handler = Meteor.subscribe('posts');
  const posts = PostsCollection.find().fetch().map((post)=>{
    const hand = Meteor.subscribe('userById',post.userId);
    const curentUser = Meteor.users.findOne({_id:post.userId});
    return {
      ...post,
      userName:curentUser && curentUser.profile.fullName
    }
  });
  return {
    posts,
    user: Meteor.user(),
    loading: Meteor.loggingIn(),
    isLoggedIn: !Meteor.loggingIn() && Meteor.userId()
  };
})(FeedContainer);
