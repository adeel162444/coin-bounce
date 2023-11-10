import * as yup from "yup";
const signUpSchema = yup.object({
  name: yup.string().min(2).required("Please enter name"),
  userName: yup.string().min(2).required("please enter user name"),
  email: yup.string().email().required("please enter email"),
  password: yup
    .string()
    .min(6)
    .matches(/[$&+,:;=?@#|'<>.^*()%!-]/, "Must include any special character")
    .required("please enter password"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match"),
});
const loginSchema = yup.object({
  email: yup.string().email().required("Please enter email"),
  password: yup.string().required("Please enter password"),
});
export { signUpSchema, loginSchema };
