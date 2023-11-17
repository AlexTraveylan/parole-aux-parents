"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { accesConseil } from "@/lib/schema-zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "./ui/use-toast"

export function AccesConseilForm({ setIsCreate }: { setIsCreate: (value: boolean) => void }) {
  const router = useRouter()

  const form = useForm<z.infer<typeof accesConseil>>({
    resolver: zodResolver(accesConseil),
    defaultValues: {
      password: "",
    },
  })

  async function checkPassword(values: z.infer<typeof accesConseil>) {
    toast({
      description: "Vérification du mot de passe en cours ...",
    })

    const response = await fetch("/api/check-acces-key", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: values.password }),
    })

    if (response.ok) {
      toast({
        description: "Accès à l'espace question.",
      })
      const { conseil_id } = await response.json()
      router.push(`/conseils/${conseil_id}`)
    } else {
      toast({
        variant: "destructive",
        title: "Oh, oh ! Une erreur s'est produite !",
      })
    }
  }

  return (
    <Card className="min-w-[350px] w-screen max-w-[700px]">
      <CardHeader>
        <CardTitle>Un espace est déjà crée ?</CardTitle>
        <CardDescription>
          Accède à cette espace, lis les questions des autres parents, fait des commentaires, ajoute tes propres questions. Connexion non
          necessaire. Les interactions necessitent une connexion.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(checkPassword)} className="space-y-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>{"Partagé par le parent qui a crée l'espace"}</FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit">Entrer</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-end">
        <div onClick={() => setIsCreate(true)} className="cursor-pointer">
          Aucun espace ? Clique ici pour en créer un.
        </div>
      </CardFooter>
    </Card>
  )
}
