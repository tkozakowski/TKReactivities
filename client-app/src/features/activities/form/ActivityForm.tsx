import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props{
    activity: Activity | undefined;
    setEditMode : (isFormActive: boolean) => void;
    createOrEditActivity: (activity: Activity) => void;
    submitting: boolean;
}

export default function ActivityForm({activity:selectedActivity, setEditMode, createOrEditActivity, submitting}: Props) {

  const initialState = selectedActivity ?? {
    id: '',
    description: '',
    title: '',
    category: '',
    date: '',
    city: '',
    venue: ''
  }

  const [activity, setActivity] = useState(initialState);

  function handleSubmit(){
    console.log(activity);
    createOrEditActivity(activity);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const {name, value} = e.target;
    setActivity({...activity, [name]: value})
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input placeholder="Title" value={activity.title} name='title' onChange={handleInputChange}/>
        <Form.TextArea placeholder="Description" value={activity.description} name='description' onChange={handleInputChange}/>
        <Form.Input placeholder="Category" value={activity.category} name='category' onChange={handleInputChange}/>
        <Form.Input placeholder="Date" type='date' value={activity.date} name='date' onChange={handleInputChange}/>
        <Form.Input placeholder="City" value={activity.city} name = 'city' onChange={handleInputChange}/>
        <Form.Input placeholder="Venue" value = {activity.venue} name = 'venue'onChange={handleInputChange}/>
        <Button floated='right' positive type='submit' content = 'Submit' loading = {submitting} />
        <Button floated='right' content = 'Cancel'onClick = {() => setEditMode(false)}/>
      </Form>
    </Segment>
  );
}
