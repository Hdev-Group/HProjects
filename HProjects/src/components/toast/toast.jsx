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
  