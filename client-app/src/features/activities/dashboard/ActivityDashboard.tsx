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
  setEditActivity: (isFormActive: boolean) => void; 
  handleActivityDetail: (id: string) => void;
  createOrEditActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
}

export default function ActivityDashboard({ activities, selectedActivity, selectActivity, 
  cancelSelectedActivity, setEditActivity, editActivity, handleActivityDetail, createOrEditActivity, 
  deleteActivity}: Props) {

  
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} selectActivity = {selectActivity} 
        handleActivityDetail = {handleActivityDetail} deleteActivity = {deleteActivity}/>
      </Grid.Column>

      <Grid.Column width="6">
        {selectedActivity && !editActivity &&
        <ActivityDetails activity={selectedActivity} cancelSelectedActivity = {cancelSelectedActivity}
        setEditActivity = {setEditActivity} />}

        {editActivity && 
        <ActivityForm activity = {selectedActivity} setEditActivity = {setEditActivity} 
        createOrEditActivity = {createOrEditActivity}/>}
      </Grid.Column>
    </Grid>
  );
}
