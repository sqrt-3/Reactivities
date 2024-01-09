import { makeAutoObservable, runInAction } from 'mobx';
import { Activity } from '../models/activity';
import agent from '../api/agent';

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

	private setActivity = (activity: Activity) => {
		activity.date = activity.date.split('T')[0];
		this.activityRegistry.set(activity.id, activity);
	};

	private getActivity = (id: string) => {
		return this.activityRegistry.get(id);
	};

	setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state;
	};

	loadActivities = async () => {
		this.setLoadingInitial(true);
		try {
			const activities = await agent.Activities.list();
			activities.forEach((activity) => {
				this.setActivity(activity);
			});
			this.setLoadingInitial(false);
		} catch (error) {
			console.log(error);
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
				runInAction(() => (this.selectedActivity = activity));
				this.setLoadingInitial(false);
				return activity;
			} catch (error) {
				console.log(error);
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

	// ##############

	private sleepTemp = (delay: number) => {
		return new Promise((resolve) => {
			setTimeout(resolve, delay);
		});
	};

	private activities: Activity[] = [
		{
			id: '16fa6a94-be77-431a-a5a0-22f0f4701fd1',
			title: 'Past Activity 1',
			date: '2024-01-01',
			description: 'Activity 2 months ago',
			category: 'music',
			city: 'London',
			venue: 'Pub',
		},
		{
			id: '16fa6a94-be77-431a-a5a0-22f0f4701fd2',
			title: 'Past Activity 2',
			date: '2024-01-20',
			description: 'Activity 2 months ago',
			category: 'drinks',
			city: 'London',
			venue: 'Pub',
		},
		{
			id: '16fa6a94-be77-431a-a5a0-22f0f4701fd3',
			title: 'Past Activity 3',
			date: '2024-03-25',
			description: 'Activity 2 months ago',
			category: 'culture',
			city: 'London',
			venue: 'Pub',
		},
	];

	loadActivitiesTemp = async () => {
		this.setLoadingInitial(true);
		await this.sleepTemp(2000);
		runInAction(() => {
			this.activities.forEach((activity) => {
				this.activityRegistry.set(activity.id, activity);
			});
		});
		this.setLoadingInitial(false);
	};

	loadActivityTemp = (id: string) => {
		const activity = this.getActivity(id);
		if (activity) this.selectedActivity = activity;
		else {
			this.selectedActivity = this.activities.find((x) => x.id === id);
		}
		this.setLoadingInitial(false);
	};
}
