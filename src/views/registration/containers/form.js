import React from 'react';
import { useFormik } from 'formik';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import Button from '../../../components/button';
import FormGroup from '../../../components/form/formGroup';
import Input from '../../../components/form/input';
import Select from '../../../components/form/Select';
import ErrorText from "../../../components/form/error";
import CardSection from '../components/CardSection';

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

  if (!values.planId) {
    errors.planId = 'Select a plan';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 4) {
    errors.password = 'password must be 4 characters or more';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Password and confirm password must be same';
  }

  return errors;
};

const LoginForm = props => {
  const stripe = useStripe();
  const elements = useElements();
  const { onSubmit, selectedPlan, error, plans } = props;

  function stripeTokenHandler(values, {source}) {
    const card = {
      brand: source.card.brand,
      exp_month: source.card.exp_month,
      exp_year: source.card.exp_year,
      last4: source.card.last4,
      name: values.name,
      type: 'card',
      id: source.id
    }
   onSubmit(values, card)
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      planId: selectedPlan || '',

    },
    validate,
    onSubmit: async (values) => {

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createSource(card);

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
    } else {
      // Send the token to your server.
      // This function does not exist yet; we will define it in the next step.
      stripeTokenHandler(values, result);
    }
     
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
      {plans &&
        <FormGroup>
          <Select
            name='planId'
            id='planId'
            autoComplete='planId'
            placeholder={'Select a plab'}
            onChange={formik.handleChange('planId')}
            onBlur={formik.handleBlur('planId')}
            error={!!formik.errors.planId}
            value={formik.values.planId}
        >
          <option value=''>Select a plan</option>
          {plans.map(plan => {
            return (
              <option key={plan.id} value={plan.id}>{`${plan.name} ${plan.description}`}</option>
            );    
          })}
          </Select>
          {formik.errors.planId &&
            <ErrorText>{formik.errors.planId}</ErrorText>
          }
        </FormGroup>
      }
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
      <FormGroup>
        <Input
          id='confirmPassword'
          name='confirmPassword'
          autoComplete='confirm-password'
          type='password'
          placeholder='Confirm Password'
          onChange={formik.handleChange('confirmPassword')}
          onBlur={formik.handleBlur('confirmPassword')}
          error={formik.errors.confirmPassword}
          value={formik.values.confirmPassword}
        />
        {formik.errors.confirmPassword &&
          <ErrorText>{formik.errors.confirmPassword}</ErrorText>
        }
      </FormGroup>

      <CardSection />

      <Button disabled={!stripe} primary large type="submit">Register</Button>
        
    </form>
  )
};

export default LoginForm;
