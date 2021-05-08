import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;

  handleActivityDetail: (id: string) => void;
  deleteActivity: (id: string) => void;
}

export default function ActivityList({ activities, selectActivity, handleActivityDetail, deleteActivity}: Props) {
  return (
    <Segment>
        <Item.Group divided>
            {activities.map(activity => (
                <Item key={activity.id}>
                    <Item.Content>
                        <Item.Header as='a'>{activity.title}</Item.Header>
                        <Item.Meta>{activity.date}</Item.Meta>
                        <Item.Description>
                           <div> {activity.description}</div>
                           <div>{activity.city}, {activity.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button floated='right' content='View' color='blue' onClick={() => handleActivityDetail(activity.id)}/>
                            <Label basic content={activity.category}/>
                            <Button floated='right' content='delete' color='red' onClick={() => deleteActivity(activity.id)}/>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            ))}
        </Item.Group>
    </Segment>
  );
}
