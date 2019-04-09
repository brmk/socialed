import React from "react";
import { Card, CardImg, CardHeader, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const Post = ({ userName, body, createdAt, id }) => (
  <Card className="mb-4" id={id}>
    {/* <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
    <CardBody>
      <CardSubtitle>{userName}</CardSubtitle>
      <CardText>{body}</CardText>
      <CardText>{String(createdAt)}</CardText>
    </CardBody>
  </Card>
);
export default Post;
