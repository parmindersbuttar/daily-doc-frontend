import React from 'react';
import styled from 'styled-components';
import Cards from 'react-credit-cards';
import useLogin from '../../state/auth/hooks/useLogin';
import BannerBackground from '../../assets/images/bannerBackground.svg';
import Spinner from '../../components/spinner';
import Button from '../../components/button';
import FormContainer from './containers/FormContainer';
import Form from './containers/form';
import 'react-credit-cards/es/styles-compiled.css';

const Main = styled.div`
  display: flex;
  padding: 30px;
  flex-direction: column
`;

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 15px;
  display: flex;
  position: relative;
  z-index: 99;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 50px;
  line-height: 61px;
  letter-spacing: 2.77778px;
  color: #212E4A;
  text-align: center;
`;


const BannerBackgroundContainer = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  max-width: 100%;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;



const Account = () => {
  const { auth, updateUser, toggleSubscription, isLoading } = useLogin();
  console.log(auth.user)
  return (
    <Main>
      <Spinner show={isLoading} />
      <BannerBackgroundContainer src={BannerBackground} alt="banner background" />
      <Title>Manage your account</Title>
      <Container>
        <FormContainer>
            <Form
              onSubmit={updateUser}
              error={auth.error}
              user={auth.user}
            />
        </FormContainer>
        <FormContainer>
          {auth.user.PaymentMethods.map((card, key) => {
            return <Cards
              key={key}
              cvc="***"
              expiry={`${card.exp_month}/${card.exp_year}`}
              name={auth.user.name}
              number={`${card.last4}`}
            />
          })}
          <StyledButton onClick={() => toggleSubscription(!auth.user.subscriptionActive)}>{auth.user.subscriptionActive ? 'Unsubscribe' : 'subscribe'}</StyledButton>
        </FormContainer>
    </Container>
    </Main>
    
  )
};

export default Account;
