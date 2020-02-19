import React from 'react';
import styled from 'styled-components'

import usePlans from '../../state/plans/hooks/usePlan';
import useLogin from '../../state/auth/hooks/useLogin';
import Container from './containers/container';
import FormContainer from './containers/FormContainer';
import Form from './containers/form';
import Spinner from '../../components/spinner';

const Logo = styled.h2`
  font-weight: bold;
  font-size: 37.506px;
  line-height: 46px;
  color: #000000;
  text-align: center;
`;

const Title = styled.h3`
  font-weight: bold;
  font-size: 30.5856px;
  line-height: 37px;
  color: #000000;
`;

const Registration = (props) => {
  const { planId } = props.location.state;
  const { auth, registerUser, isLoading } = useLogin();
  const { plans } = usePlans();
  return (
    <Container>
      <Spinner show={isLoading} />
      <FormContainer>
        <Logo>Daily Doc</Logo>
        <Title>Sign Up</Title>
        <Form
          onSubmit={registerUser}
          error={auth.error}
          plans={plans.data}
          selectedPlan={planId}
        />
      </FormContainer>
    </Container>
  )
};

export default Registration;
