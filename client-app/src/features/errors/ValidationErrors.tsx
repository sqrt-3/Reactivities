import { Message } from 'semantic-ui-react';

interface Prop {
	errors: string[] | null;
}

const ValidationErrors = ({ errors }: Prop) => {
	return (
		<Message error>
			{errors && (
				<Message.List>
					{errors.map((error, i) => (
						<Message.Item key={i}>{error}</Message.Item>
					))}
				</Message.List>
			)}
		</Message>
	);
};

export default ValidationErrors;
