import Container from "@/components/Container";
import Divider from "@/components/Divider";
import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useState, type FormEventHandler } from "react";
import { Link } from "react-router";
// import { validdateForm } from "@/utils/Error/LoginFormError";
import LoginError from "@/utils/Error/LoginError";

interface LoginType {
  email: string;
  password: string;
}

export type ErrorType = {
  emailError: string | "";
  passwordError: string | "";
};

const Login = () => {
  const [inputs, setInputs] = useState<LoginType>({ email: "", password: "" });
  const [error, setError] = useState<ErrorType>({
    emailError: "",
    passwordError: "",
  });

  // Handle Input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));

    for (let errorKey in error) {
      console.log(error[errorKey as keyof ErrorType]);

      if (error[errorKey as keyof ErrorType]) {
        console.log("hello");
        setError((prevError) => ({
          ...prevError,
          [errorKey]: "",
        }));
      }
    }
  };

  const handleFormSubmission: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // const erros = validdateForm(inputs);
    // setError(erros);
    const emailError = new LoginError({
      required: true,
      inputVal: inputs.email,
      type: "email",
    });
    const passwordError = new LoginError({
      required: true,
      inputVal: inputs.password,
      type: "password",
    });
    // console.log(emailError.validate())
    // console.log(emailError.isRequired())

    if (!emailError.validate().valid) {
      setError((prev) => ({
        ...prev,
        emailError: emailError.validate().message ?? "",
      }));
    }

    if (!passwordError.validate().valid) {
      setError((prev) => ({
        ...prev,
        passwordError: passwordError.validate().message ?? "",
      }));
    }

    // api call

    //  setError({emailError:"", passwordError:""})
    //  setInputs({email:"", password:""})
  };

  return (
    <Container isCenter={true}>
      <div className="w-md shadow-xl shadow-slate-300 rounded-md my-5 ">
        {/* Logo  */}
        <div className="flex mx-auto justify-center space-x-4  pt-6">
          <img src="/Logo.png" alt="" className="size-10 rounded-full"/>
          <p className="text-2xl font-bold font-sans">Login to SplitExpence</p>
        </div>
        {/* Login form  */}
        <form
          className="space-y-2 p-4 "
          onSubmit={handleFormSubmission}
          noValidate     
        >
          <InputField
            label="Email"
            type="email"
            placeholder="Enter Your email"
            id="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            error={error?.emailError || ""}
            formNoValidate={true}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Enter Your password"
            id="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            error={error?.passwordError || ""}
          />

          <div className="flex items-center  gap-2 mt-3">
            <Input
              type="checkbox"
              id="termAndCondition"
              name="termAndCondition"
              className=" w-fit size-4 rounded-xl"
            />

            <Label className="">
              I agree to the <Link to="" className="text-blue-500 underline" target="_blank">Terms of Service</Link> and{" "}
              <Link to={""} className="text-blue-500 underline" target="_blank"> Privacy Policy</Link>.
            </Label>
          </div>

          <Button className="w-full mt-5" type="submit">
            Login
          </Button>
        </form>
        <Divider msg="Or continue with" />

        {/* Google Login */}

        <div className="px-4 py-4 ">
          <GoogleOAuthProvider clientId={String(import.meta.env.VITE_GOOGLE_CLIENT_ID)}>
            <GoogleLogin
              onSuccess={() => {}}
              theme="filled_black"
              logo_alignment="center"
              shape="pill"
              size="medium"
            ></GoogleLogin>
          </GoogleOAuthProvider>
        </div>
      </div>
    </Container>
  );
};

export default Login;
