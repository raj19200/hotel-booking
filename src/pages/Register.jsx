/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

import RegisterForm from "../features/authentication/RegisterForm";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Register() {
  return (
    <>
      <LoginLayout>
        <Logo />
        <Heading as="h4">Create an account</Heading>
        <RegisterForm />
        {/* <LoginForm /> */}
      </LoginLayout>
    </>
  );
}

export default Register;
