import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

const ActivityList = () => {
	const { activityStore } = useStore();
	const { deleteActivity, selectActivity, activitiesByDate, loading } = activityStore;
	const [target, setTarget] = useState('');

	const handleDeleteActivity = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
		setTarget(e.currentTarget.name);
		deleteActivity(id);
	};

	return (
		<Segment>
			<Item.Group divided>
				{activitiesByDate.map((activity) => (
					<Item key={activity.id}>
						<Item.Content>
							<Item.Header as='a'>{activity.title}</Item.Header>
							<Item.Meta>{activity.date}</Item.Meta>
							<Item.Description>
								<div>{activity.description}</div>
								<div>
									{activity.city}, {activity.venue}
								</div>
							</Item.Description>
							<Item.Extra>
								<Button
									onClick={() => selectActivity(activity.id)}
									floated='right'
									content='View'
									color='blue'
								/>
								<Button
									onClick={(e) => handleDeleteActivity(e, activity.id)}
									floated='right'
									content='Delete'
									color='red'
									loading={loading && target === activity.id}
									name={activity.id}
								/>
								<Label
									basic
									content={activity.category}
								/>
							</Item.Extra>
						</Item.Content>
					</Item>
				))}
			</Item.Group>
		</Segment>
	);
};

export default observer(ActivityList);