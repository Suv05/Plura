import { SignUp } from "@clerk/nextjs";


const Page = () => {
  return (
    <>
      <SignUp path="/sign-up" routing="path" />
    </>
  );
};

export default Page;