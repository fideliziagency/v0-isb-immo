"use server"

import { supabase } from "@/lib/supabase-client"
import { resend } from "@/lib/resend-client"

export async function sendContactForm(prevState: any, formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const unitType = formData.get("unitType") as string
    const message = formData.get("message") as string

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return {
        success: false,
        message: "Veuillez remplir tous les champs obligatoires.",
      }
    }

    // Store in Supabase
    const { error: supabaseError } = await supabase.from("contacts").insert({
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone || null,
      unit_type: unitType || null,
      message: message || null,
    })

    if (supabaseError) {
      console.error("Supabase error:", supabaseError)
      return {
        success: false,
        message: "Erreur lors de l'enregistrement. Veuillez réessayer.",
      }
    }

    // Send email via Resend
    try {
      await resend.emails.send({
        from: "contact@isbimmobiliere.com",
        to: "contact@isbimmobiliere.com",
        subject: `Nouvelle demande de contact - ${firstName} ${lastName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1f2937; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
              Nouvelle demande de contact - The Life Residence
            </h2>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Informations du contact</h3>
              <p><strong>Nom:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${phone ? `<p><strong>Téléphone:</strong> ${phone}</p>` : ""}
              ${unitType ? `<p><strong>Type de logement souhaité:</strong> ${unitType}</p>` : ""}
            </div>
            
            ${
              message
                ? `
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #374151; margin-top: 0;">Message</h3>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
            `
                : ""
            }
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
              <p>Ce message a été envoyé depuis le formulaire de contact du site The Life Residence.</p>
              <p>Date: ${new Date().toLocaleString("fr-FR")}</p>
            </div>
          </div>
        `,
      })
    } catch (emailError) {
      console.error("Email error:", emailError)
      // Don't fail the whole operation if email fails
    }

    return {
      success: true,
      message: "Votre message a été envoyé avec succès. Nous vous contacterons bientôt!",
    }
  } catch (error) {
    console.error("Form submission error:", error)
    return {
      success: false,
      message: "Une erreur est survenue. Veuillez réessayer plus tard.",
    }
  }
}
