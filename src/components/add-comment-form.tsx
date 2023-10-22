"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { addingComment } from "@/lib/schema-zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card } from "./ui/card"
import { Textarea } from "./ui/textarea"
import { toast } from "./ui/use-toast"

export function AddCommentForm({ question_id }: { question_id: string }) {
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
    <Card className="min-w-[350px] w-screen max-w-[700px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAddingComment)} className="space-y-8 p-3">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Écrire un commentaire</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Ajouter un commentaire</Button>
        </form>
      </Form>
    </Card>
  )
}
