import React from 'react';
import { Formik, FormikProps, FormikActions, FormikErrors } from 'formik';
import { FormGroup, Input, Label, Form, Button } from 'reactstrap';
import InvalidFormFeedback from './../../form/components/InvalidFormFeedback';
import createClassName from 'classnames';

export type OnSubmittedAndValidCallback = (values: LoginFormValues) => void;

type Props = {
    onFormSubmittedAndValid: OnSubmittedAndValidCallback;
};

type LoginFormValues = {
    email: string;
    password: string;
};

export default class LoginForm extends React.Component<Props> {
    private onSubmit = (
        values: LoginFormValues,
        actions: FormikActions<LoginFormValues>
    ) => {
        actions.resetForm();

        this.props.onFormSubmittedAndValid(values);
    };

    private static validateValues(
        values: LoginFormValues
    ): FormikErrors<LoginFormValues> {
        const errors: FormikErrors<LoginFormValues> = {};

        if (!values.email) {
            errors.email = 'Please enter your email address';
        }

        if (!values.password) {
            errors.password = 'Please enter your password';
        }

        return errors;
    }

    public render() {
        return (
            <Formik
                initialValues={{
                    email: 'gijs.nieuwenhuis@freshheads.com',
                    password: 'Test12345',
                }}
                validate={LoginForm.validateValues}
                onSubmit={this.onSubmit}
            >
                {({
                    handleChange,
                    handleBlur,
                    values,
                    submitForm,
                    handleSubmit,
                    touched,
                    errors,
                }: FormikProps<LoginFormValues>) => {
                    const onKeyDown = (event: React.KeyboardEvent) => {
                        if (
                            event.key === 'Enter' &&
                            (event.ctrlKey || event.metaKey)
                        ) {
                            submitForm();
                        }
                    };

                    const hasErrors = {
                        email: touched.email && !!errors.email,
                        password: touched.password && !!errors.password,
                    };

                    const isValid = {
                        email: touched.email && !errors.email,
                        password: touched.password && !errors.password,
                    };

                    const classNames = {
                        email: createClassName('form-control', {
                            'is-valid': isValid.email,
                            'is-invalid': hasErrors.email,
                        }),
                        password: createClassName(
                            'form-control',
                            'form-control__alternative-padding',
                            {
                                'is-valid': isValid.password,
                                'is-invalid': hasErrors.password,
                            }
                        ),
                    };

                    return (
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="email">Email address</Label>
                                <Input
                                    type="text"
                                    className={classNames.email}
                                    name="email"
                                    id="email"
                                    onChange={handleChange}
                                    onKeyDown={onKeyDown}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    autoFocus
                                />
                                {hasErrors.email && (
                                    <InvalidFormFeedback>
                                        {errors.email}
                                    </InvalidFormFeedback>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    className={classNames.password}
                                    name="password"
                                    id="password"
                                    onChange={handleChange}
                                    onKeyDown={onKeyDown}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                {hasErrors.password && (
                                    <InvalidFormFeedback>
                                        {errors.password}
                                    </InvalidFormFeedback>
                                )}
                            </FormGroup>
                            <Button type="submit">Login</Button>
                        </Form>
                    );
                }}
            </Formik>
        );
    }
}
