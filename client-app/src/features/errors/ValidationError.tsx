import { Message } from 'semantic-ui-react';

interface Prop {
	errors: string[];
}

const ValidationError = ({ errors }: Prop) => {
	return (
		<Message error>
			<Message.Header>There was some errors with your submission</Message.Header>
			<Message.List items={errors} />
		</Message>
	);
};

export default ValidationError;
