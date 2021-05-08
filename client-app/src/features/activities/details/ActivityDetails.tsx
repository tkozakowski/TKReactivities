import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity;
  cancelSelectedActivity: () => void;
  setEditActivity: (isFormActive: boolean) => void; 
}

export default function ActivityDetails({ activity, cancelSelectedActivity, setEditActivity }: Props) {

  const handleCancel = () =>{
    cancelSelectedActivity();
    setEditActivity(false);
  }
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
            <Button basic color='blue' content='Edit'onClick={() => setEditActivity(true)}/>
            <Button basic color='grey' content='Cancel'onClick={() => handleCancel()}/>
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
