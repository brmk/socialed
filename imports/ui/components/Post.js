import React from "react";
import moment from 'moment';
import { Card, CardImg, CardHeader, CardText, CardBody,
  CardTitle,CardFooter, CardSubtitle, Button } from 'reactstrap';

const Post = ({ userName, body, createdAt, id }) => (
  <Card className="mb-4" id={id}>
    {/* <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
    <CardHeader tag="h6">{userName}</CardHeader>
    <CardBody>
      <CardText>{body}</CardText>
    </CardBody>
    <CardFooter className="text-muted">{moment(createdAt).fromNow()}</CardFooter>
  </Card>
);
export default Post;
