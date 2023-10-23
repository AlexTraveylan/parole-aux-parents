"use client"
import { Dispatch, SetStateAction } from "react"

import { InputEye } from "@/components/input-password-eye"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { createUser } from "@/lib/schema-zod"
import { zodResolver } from "@hookform/resolvers/zod"
import CryptoJS from "crypto-js"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"

export function SignInForm({ setIsLogin }: { setIsLogin: Dispatch<SetStateAction<boolean>> }) {
  const router = useRouter()
  const form = useForm<z.infer<typeof createUser>>({
    resolver: zodResolver(createUser),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function handleSubmit(values: z.infer<typeof createUser>) {
    toast({
      description: "Vérification du mot de passe ...",
    })

    const envSalt = process.env.NEXT_PUBLIC_SUPERMASTERSALT
    if (!envSalt) return console.error("Probleme d'env")

    const response = await fetch("api/users/create", {
      method: "POST",
      body: JSON.stringify({
        username: values.username,
        hashedPassword: CryptoJS.SHA256(values.password).toString(CryptoJS.enc.Hex),
      }),
    })

    if (response.ok) {
      toast({
        description: "Connexion réussie !",
      })
      router.refresh()
    } else {
      toast({
        variant: "destructive",
        description: "Une erreur s'est produite.",
      })
    }
  }

  return (
    <Card className="min-w-[350px] w-screen max-w-[700px] my-5">
      <CardHeader>
        <CardTitle>Créer un compte</CardTitle>
        <CardDescription>{"Si vous n'avez pas de compte, c'est ici pour le créer."}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Nom d'utilisateur"}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>{"Exemple : 'Jean DUPONT'"}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <InputEye {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>{"Le mot de passe qui correspond au nom d'utilisateur"}</FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit">Créer un compte</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-end">
        <div onClick={() => setIsLogin(true)} className="cursor-pointer">
          Déjà un compte ? Cliquer ici pour vous connecter
        </div>
      </CardFooter>
    </Card>
  )
}
