import React from 'react';
import styled from 'styled-components';
import useLogin from '../../state/auth/hooks/useLogin';
import BannerBackground from '../../assets/images/bannerBackground.svg';
import Spinner from '../../components/spinner';
import FormContainer from './containers/FormContainer';
import Form from './containers/form';

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
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



const Account = () => {
  const { auth, updateUser, isLoading } = useLogin();
  console.log(auth)
  return (
    <Container>
      <Spinner show={isLoading} />
      <BannerBackgroundContainer src={BannerBackground} alt="banner background" />
      <Title>Manage your account</Title>
      <FormContainer>
          <Form
            onSubmit={updateUser}
            error={auth.error}
            user={auth.user}
          />
      </FormContainer>
   </Container>
  )
};

export default Account;
