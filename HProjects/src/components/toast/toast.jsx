import { useToast } from "../ui/use-toast"
import { Button } from "../ui/button"

export const ToastDemo = () => {
    const { toast } = useToast()
  
    return (
      <Button
        onClick={() => {
          toast({
            description: "Updated project",
          })
        }}
      >
        Show Toast
      </Button>
    )
  }
