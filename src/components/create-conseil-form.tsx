"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createConseil } from "@/lib/schema-zod"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { toast } from "./ui/use-toast"

export function CreateConseilFrom({ setIsCreate }: { setIsCreate: (value: boolean) => void }) {
  const router = useRouter()

  const form = useForm<z.infer<typeof createConseil>>({
    resolver: zodResolver(createConseil),
    defaultValues: {
      password: "",
      limit_time: new Date(),
    },
  })

  async function handleCreateConseil(values: z.infer<typeof createConseil>) {
    toast({
      description: "Création en cours...",
    })

    const response = await fetch("api/create-conseil", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: values.password, limit_time: values.limit_time }),
    })

    if (response.ok) {
      toast({
        description: "Creation de l'espace question réussi.",
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
        <CardTitle>Création d'un espace questions.</CardTitle>
        <CardDescription>
          Un espace colaboratif pour préparer un conseil d'école, poser des questions, voir celles des autres, faire des commentaires. Et ainsi
          préparer au mieux ce moment, pour que la parole de chacun soit entendue. Vous devez être connecté pour créer un espace.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateConseil)} className="space-y-8">
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
                  <FormDescription>Il sera à partager aux parents pour acceder à l'espace</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="limit_time"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date de fin</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP", { locale: fr }) : <span>Choisi une date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>La date limite pour que les questions soient prises en compte</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Entrer</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-end">
        <div onClick={() => setIsCreate(false)} className="cursor-pointer">
          Un espace existe déjà ? Clique ici y acceder
        </div>
      </CardFooter>
    </Card>
  )
}
