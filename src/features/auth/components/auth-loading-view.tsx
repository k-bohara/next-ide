import { Spinner } from "@/components/ui/spinner"

export const AuthLoadingView = () => {
  return (
    <div className="grid min-h-svh place-items-center bg-background">
      <Spinner className="h-6 w-6 text-ring" />
    </div>
  )
}
