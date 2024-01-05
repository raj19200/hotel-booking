import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";
import { useForm } from "react-hook-form";

function RegisterForm() {
  const { signUp } = useSignUp();
  const { register, formState, reset, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { errors } = formState;
  function submitData({ fullName, email, password }) {
    signUp({ fullName, email, password }, { onSettled: reset });
    navigate("/login");
  }
  return (
    <Form onSubmit={handleSubmit(submitData)}>
      <FormRow
        label="Full Name"
        orientation="vertical"
        error={errors?.fulllName?.message}
      >
        <Input
          type="text"
          id="fullName"
          // This makes this form better for password managers
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow
        label="Email address"
        orientation="vertical"
        error={errors?.email?.message}
      >
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide valid email address",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Password"
        orientation="vertical"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password should be 8 characters long",
            },
          })}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default RegisterForm;
