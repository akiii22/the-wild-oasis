import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";
import { usePasswordVisibility } from "./usePasswordVisibility";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import PasswordVisibilty from "../../ui/PasswordVisibilty";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  const {
    isVisible: isPasswordVisible,
    toggleVisibility: togglePasswordVisibility,
  } = usePasswordVisibility();
  const {
    isVisible: isConfirmVisible,
    toggleVisibility: toggleConfirmVisibility,
  } = usePasswordVisibility();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="New Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <div style={{ position: "relative" }}>
          <Input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            disabled={isUpdating}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />
          <PasswordVisibilty
            onClick={togglePasswordVisibility}
            isVisible={isPasswordVisible}
          />
        </div>
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <div style={{ position: "relative" }}>
          <Input
            type={isConfirmVisible ? "text" : "password"}
            autoComplete="new-password"
            id="passwordConfirm"
            disabled={isUpdating}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                getValues().password === value || "Passwords need to match",
            })}
          />
          <PasswordVisibilty
            onClick={toggleConfirmVisibility}
            isVisible={isConfirmVisible}
          />
        </div>
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
