import { SignIn } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        appearance={{
          theme: shadcn
        }}
      />
    </div>
  );
}
