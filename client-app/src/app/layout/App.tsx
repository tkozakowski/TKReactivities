import React, { useEffect, useState } from "react";
import axios from "axios";
import { Activity } from "../models/activity";
import Navbar from "./Navbar";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editActivity, setEditActivity] = useState(false); 

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((a) => a.id === id));
  }

  function handleCancelSelectedActivity() {
    setSelectedActivity(undefined);
  }

  const handleEmptyForm = () =>{
    setSelectedActivity(undefined);
    setEditActivity(true);
  }

  function handleActivityDetail(id?: string) {
    setEditActivity(false);
    id ? handleSelectActivity(id) : setSelectedActivity(undefined);
  }

  function createOrEditActivity(activity: Activity){
    // const notUpdatedActivities = [...activities.filter(x => x.id !== activity.id)]
    activity.id 
        ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) //update
        : setActivities([...activities, {...activity, id:uuid()}]) //add
        
    setEditActivity(false);
    setSelectedActivity(activity);
  }


  function handleDeleteActivity(id: string){
    setActivities([...activities.filter(x => x.id !== id)])
  }

  return (
    <>
      <Navbar handleEmptyForm ={handleEmptyForm}/>
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard 
        activities={activities} 
        selectedActivity={selectedActivity}
        selectActivity = {handleSelectActivity}
        cancelSelectedActivity = {handleCancelSelectedActivity}
        editActivity = {editActivity}
        setEditActivity = {setEditActivity}
        handleActivityDetail = {handleActivityDetail}
        createOrEditActivity = {createOrEditActivity}
        deleteActivity = {handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
