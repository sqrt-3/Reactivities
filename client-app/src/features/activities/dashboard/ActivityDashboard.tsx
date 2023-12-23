import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface Props {
	activities: Activity[];
	activity: Activity | undefined;
	selectActivity: (id: string) => void;
	cancelSelectActivity: () => void;
	editMode: boolean;
	openForm: (id: string) => void;
	closeForm: () => void;
	createOrEdit: (activity: Activity) => void;
	deleteActivity: (id: string) => void;
}

const ActivityDashboard = ({ activities, activity, selectActivity, cancelSelectActivity, editMode, openForm, closeForm, createOrEdit, deleteActivity }: Props) => {
	return (
		<Grid>
			<Grid.Column width='10'>
				<ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity}/>
			</Grid.Column>
			{/* prettier-ignore */}
			<Grid.Column width='6'>
				{activity && !editMode &&
                <ActivityDetails 
                    activity={activity}
                    cancelSelectActivity={cancelSelectActivity} 
                    openForm={openForm}
                />}
                {editMode &&
				<ActivityForm closeForm={closeForm} activity={activity} createOrEdit={createOrEdit}/>}
			</Grid.Column>
		</Grid>
	);
};

export default ActivityDashboard;
