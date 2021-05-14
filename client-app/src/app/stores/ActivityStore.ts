import { makeAutoObservable } from "mobx"
import agent from "../api/agent";
import { Activity } from "../models/activity"

export default class ActivityStore{

    activities: Activity[] = [];
    selectedActivity: Activity | null = null;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try{
            const activities = await agent.Activities.list();
            activities.forEach((activity) => {
                activity.date = activity.date.split("T")[0];
                activities.push(activity);
              }
        }catch(error){
            console.log(error);
        }
    }

}