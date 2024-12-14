import { useForm } from "react-hook-form";
import { useSignUp } from "./useSignUp";
import { usePasswordVisibility } from "./usePasswordVisibility";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import PasswordVisibilty from "../../ui/PasswordVisibilty";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isLoading } = useSignUp();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const {
    isVisible: isPasswordVisible,
    toggleVisibility: togglePasswordVisibility,
  } = usePasswordVisibility();
  const {
    isVisible: isConfirmVisible,
    toggleVisibility: toggleConfirmVisibility,
  } = usePasswordVisibility();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={""}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: { value: /\S+@\S+\.\S+/ },
            message: "Please provide a valid email address",
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <div style={{ position: "relative" }}>
          <Input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            disabled={isLoading}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password sould consist of minimum 8 characters",
              },
            })}
          />
          <PasswordVisibilty
            onClick={togglePasswordVisibility}
            isVisible={isPasswordVisible}
          />
        </div>
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <div style={{ position: "relative" }}>
          <Input
            type={isConfirmVisible ? "text" : "password"}
            id="passwordConfirm"
            disabled={isLoading}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Passwords need to be match",
            })}
          />
          <PasswordVisibilty
            onClick={toggleConfirmVisibility}
            isVisible={isConfirmVisible}
          />
        </div>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
