import { SignIn } from "@clerk/nextjs";
const Page= () => {
  return (
    <>
      <SignIn path="/sign-in" routing="path" />
    </>
  );
};

export default Page;