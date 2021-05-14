import React, { } from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined,
  selectActivity: (id: string) => void,
  cancelSelectedActivity: () => void;

  editActivity: boolean;
  setEditMode: (isFormActive: boolean) => void; 
  handleActivityDetail: (id: string) => void;
  createOrEditActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

export default function ActivityDashboard({ activities, selectedActivity, selectActivity, 
  cancelSelectedActivity, setEditMode, editActivity, handleActivityDetail, createOrEditActivity, 
  deleteActivity, submitting}: Props) {

  
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} selectActivity = {selectActivity} 
          handleActivityDetail = {handleActivityDetail} deleteActivity = {deleteActivity}
          submitting = {submitting}/>
      </Grid.Column>

      <Grid.Column width="6">
        {selectedActivity && !editActivity &&
        <ActivityDetails activity={selectedActivity} cancelSelectedActivity = {cancelSelectedActivity}
          setEditMode = {setEditMode} />}

        {editActivity && 
        <ActivityForm activity = {selectedActivity} setEditMode = {setEditMode} 
          createOrEditActivity = {createOrEditActivity}
          submitting = {submitting}/>}
      </Grid.Column>
    </Grid>
  );
}
