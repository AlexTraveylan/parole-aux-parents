"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { addingComment } from "@/lib/schema-zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from "./ui/textarea"
import { toast } from "./ui/use-toast"

export function AddCommentForm({ question_id, setIsAddingComment }: { question_id: string; setIsAddingComment: (value: boolean) => void }) {
  const router = useRouter()

  const form = useForm<z.infer<typeof addingComment>>({
    resolver: zodResolver(addingComment),
    defaultValues: {
      content: "",
    },
  })

  async function handleAddingComment(values: z.infer<typeof addingComment>) {
    toast({
      description: "Ajout d'un commentaire ...",
    })

    const response = await fetch(`/api/comments/${question_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    if (response.ok) {
      toast({
        description: "Succes",
      })
      router.refresh()
    } else {
      toast({
        variant: "destructive",
        title: "Oh, oh ! Une erreur s'est produite !",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAddingComment)} className="space-y-8">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Réponse</FormLabel>
              <FormControl>
                <Textarea {...field} rows={15} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Entrer</Button>
      </form>
    </Form>
  )
}
