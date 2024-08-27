import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
    <div className="bg-gradient-to-r relative from-cyan-500 to-blue-500 w-full h-full flex items-center justify-center">
          <SignUp />
          <div className="absolute bottom-0 right-0 ">
            <img src="/authpages.png"></img>
          </div>
    </div>
    </>
  );
}