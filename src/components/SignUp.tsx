import Link from "next/link";
import UserAuthForm from "./UserAuthForm";

function SignUp() {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <p className="font-bold text-2xl text-primary">
          Thread<span className="text-red-600">it</span>
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">Sign up</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a Threadit account and agree to our
          User Agreement and Privacy Policy.
        </p>

        {/* sign-in form */}
        <UserAuthForm />

        <p className="px-8 text-center text-sm text-primary">
          Already have a Threadit account?{" "}
          <Link
            href="/sign-in"
            className="hover:text-primary text-sm underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
