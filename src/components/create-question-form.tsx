"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createQuestion } from "@/lib/schema-zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Minus, Plus } from "../../node_modules/lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Textarea } from "./ui/textarea"
import { toast } from "./ui/use-toast"

export function CreateQuestionForm({ conseil_id }: { conseil_id: string }) {
  const [isCreateQuestion, setIsCreateQuestion] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof createQuestion>>({
    resolver: zodResolver(createQuestion),
    defaultValues: {
      title: "",
      content: "",
    },
  })

  async function handleCreateQuestion(values: z.infer<typeof createQuestion>) {
    toast({
      description: "Création de la question ...",
    })

    const response = await fetch(`/api/questions/${conseil_id}`, {
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
      setIsCreateQuestion(false)
      router.refresh()
    } else {
      toast({
        variant: "destructive",
        title: "Oh, oh ! Une erreur s'est produite !",
      })
    }
  }

  if (!isCreateQuestion) {
    return (
      <Card className="min-w-[350px] w-screen max-w-[700px] text-center flex justify-center py-5">
        <div className="flex gap-5">
          <Plus onClick={() => setIsCreateQuestion(true)} />
          <div>Ajouter une question</div>
        </div>
      </Card>
    )
  }

  return (
    <>
      <Card className="min-w-[350px] w-screen max-w-[700px] text-center flex justify-center py-5">
        <div className="flex gap-5">
          <Minus onClick={() => setIsCreateQuestion(false)} />
          <div>Reduire</div>
        </div>
      </Card>
      <Card className="min-w-[350px] w-screen max-w-[700px] px-5">
        <CardHeader>
          <CardTitle className="text-center">{"Ajout d'une nouvelle question"}</CardTitle>
          <CardDescription className="text-center">Exprimez-vous</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateQuestion)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenu</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={15} />
                  </FormControl>
                </FormItem>
              )}
            />
            <CardFooter className="flex justify-center">
              <Button type="submit">Ajouter la question</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  )
}
