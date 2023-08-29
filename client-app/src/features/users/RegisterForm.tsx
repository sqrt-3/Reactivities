import { ErrorMessage, Form, Formik } from 'formik';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button, Header } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';
import ValidationErrors from '../errors/ValidationErrors';

const RegisterForm = () => {
	const { userStore } = useStore();
	return (
		<Formik
			initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
			validationSchema={Yup.object({
				displayName: Yup.string().required(),
				username: Yup.string().required(),
				password: Yup.string().required(),
				email: Yup.string().required(),
			})}
			onSubmit={(values, { setErrors }) => userStore.register(values).catch((error) => setErrors({ error }))}
		>
			{({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
				<Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
					<Header as='h2' content='Sign up to Reactivities' color='teal' textAlign='center' />
					<MyTextInput placeholder='Display Name' name='displayName'></MyTextInput>
					<MyTextInput placeholder='UserName' name='username'></MyTextInput>
					<MyTextInput placeholder='Email' name='email'></MyTextInput>
					<MyTextInput placeholder='Password' name='password' type='password'></MyTextInput>
					<ErrorMessage name='error' render={() => <ValidationErrors errors={errors.error as unknown as string[]} />} />
					<Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='Register' type='submit' fluid />
				</Form>
			)}
		</Formik>
	);
};

export default observer(RegisterForm);
