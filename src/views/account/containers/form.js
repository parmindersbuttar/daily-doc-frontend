import React from 'react';
import { useFormik } from 'formik';
import Button from '../../../components/button';
import FormGroup from '../../../components/form/formGroup';
import Input from '../../../components/form/input';
import ErrorText from "../../../components/form/error";

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.name) {
    errors.name = 'Name is required';
  } else if (values.name.length < 4) {
    errors.name = 'Name must be 4 characters';
  }

  if (values.password && values.password.length < 4) {
    errors.password = 'password must be 4 characters or more';
  }

  return errors;
};

const UserForm = props => {

  const { onSubmit, error, user } = props;
  const formik = useFormik({
    initialValues: {
      email: user.email,
      password: '',
      name: user.name

    },
    validate,
    onSubmit: async (values) => {
      onSubmit(values);
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      {props.error &&
        <ErrorText>{error}</ErrorText>
      }
        <FormGroup>
          <Input
            name='email'
            id='email'
            autoComplete='email'
            placeholder={'Email Address'}
            onChange={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            error={!!formik.errors.email}
            value={formik.values.email}
        />
          {formik.errors.email &&
            <ErrorText>{formik.errors.email}</ErrorText>
        }
      </FormGroup>
      <FormGroup>
          <Input
            name='name'
            id='name'
            autoComplete='name'
            placeholder={'Name'}
            onChange={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
            error={!!formik.errors.name}
            value={formik.values.name}
        />
          {formik.errors.name &&
            <ErrorText>{formik.errors.name}</ErrorText>
          }
      </FormGroup>

      <FormGroup>
        <Input
          id='password'
          name='password'
          autoComplete='current-password'
          type={'password'}
          placeholder={'Password'}
          onChange={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          error={formik.errors.password}
          value={formik.values.password}
        />
        {formik.errors.password &&
          <ErrorText>{formik.errors.password}</ErrorText>
        }
      </FormGroup>

      <Button primary large type="submit">update</Button>
        
    </form>
  )
};

export default UserForm;
