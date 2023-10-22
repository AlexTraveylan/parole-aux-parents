import { Button } from "@/components/ui/button"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export default function AuthBtn() {
  return (
    <>
      <SignedIn>
        <UserButton afterSignOutUrl="/" userProfileUrl="/profile" />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant={"outline"}>Se connecter</Button>
        </SignInButton>
      </SignedOut>
    </>
  )
}
