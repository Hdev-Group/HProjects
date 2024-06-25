import { SignUp } from "@clerk/nextjs";
import { dark } from '@clerk/themes';


export default function Page() {
  return (
    <div className="flex mt-[6%] items-center justify-center h-[100%] bg-black">
      <SignUp
      appearance={{
        baseTheme: dark
      }}
      
      />
    </div>
  );
}