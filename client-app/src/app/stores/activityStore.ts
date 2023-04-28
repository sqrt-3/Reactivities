import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Activity } from '../modules/activity';

export default class ActivityStore {
	activityRegistry = new Map<string, Activity>();
	selectedActivity: Activity | undefined = undefined;
	editMode = false;
	loading = false;
	loadingInitial = false;

	constructor() {
		makeAutoObservable(this);
	}

	get activitiesByDate() {
		return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
	}

	get activityCount() {
		return this.activityRegistry.size;
	}

	loadActivities = async () => {
		this.setLoadingInitial(true);
		try {
			const activities = await agent.Activities.list();
			runInAction(() => {
				activities.forEach((activity) => {
					this.setActivity(activity);
				});
			});
		} catch (error) {
			console.log(error);
		} finally {
			this.setLoadingInitial(false);
		}
	};

	loadActivity = async (id: string) => {
		let activity = this.getActivity(id);
		if (activity) {
			this.selectedActivity = activity;
			return activity;
		} else {
			this.setLoadingInitial(true);
			try {
				activity = await agent.Activities.details(id);
				this.setActivity(activity);
				runInAction(() => {
					this.selectedActivity = activity;
				});
				return activity;
			} catch (error) {
				console.log(error);
			} finally {
				this.setLoadingInitial(false);
			}
		}
	};

	createActivity = async (activity: Activity) => {
		this.loading = true;
		try {
			await agent.Activities.create(activity);
			runInAction(() => {
				this.activityRegistry.set(activity.id, activity);
				this.selectedActivity = activity;
				this.editMode = false;
				this.loading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	updateActivity = async (activity: Activity) => {
		this.loading = true;
		try {
			await agent.Activities.update(activity);
			runInAction(() => {
				this.activityRegistry.set(activity.id, activity);
				this.selectedActivity = activity;
				this.editMode = false;
				this.loading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	deleteActivity = async (id: string) => {
		this.loading = true;
		try {
			await agent.Activities.delete(id);
			runInAction(() => {
				this.activityRegistry.delete(id);
				this.loading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	private setActivity = (activity: Activity) => {
		activity.date = activity.date.split('T')[0];
		this.activityRegistry.set(activity.id, activity);
	};

	private getActivity = (id: string) => {
		return this.activityRegistry.get(id);
	};

	private setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state;
	};
}
