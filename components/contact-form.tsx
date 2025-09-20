"use client"

import { useFormState } from "react-dom"
import { sendContactForm } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, User, MessageSquare } from "lucide-react"

const initialState = {
  success: false,
  message: "",
}

export default function ContactForm() {
  const [state, formAction] = useFormState(sendContactForm, initialState)

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-900">Contactez-nous</CardTitle>
        <p className="text-center text-gray-600">
          Remplissez le formulaire ci-dessous et nous vous contacterons rapidement
        </p>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4" />
                Prénom *
              </label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                required
                placeholder="Votre prénom"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4" />
                Nom *
              </label>
              <Input id="lastName" name="lastName" type="text" required placeholder="Votre nom" className="w-full" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="votre.email@exemple.com"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Téléphone
            </label>
            <Input id="phone" name="phone" type="tel" placeholder="+216 XX XXX XXX" className="w-full" />
          </div>

          <div className="space-y-2">
            <label htmlFor="unitType" className="text-sm font-medium text-gray-700">
              Type de logement souhaité
            </label>
            <Select name="unitType">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionnez un type de logement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="s1">S+1 (48 à 77 m²)</SelectItem>
                <SelectItem value="s2">S+2 (87 à 136 m²)</SelectItem>
                <SelectItem value="s3">S+3 (Suite parentale)</SelectItem>
                <SelectItem value="duplex">Duplex (Piscine privée)</SelectItem>
                <SelectItem value="villa">Villa (Piscine privée)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Message
            </label>
            <Textarea id="message" name="message" placeholder="Votre message..." rows={4} className="w-full" />
          </div>

          {state.message && (
            <div
              className={`p-4 rounded-md ${
                state.success
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {state.message}
            </div>
          )}

          <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white">
            Envoyer le message
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
