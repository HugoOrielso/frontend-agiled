import { Label } from "@radix-ui/react-label"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { toast } from "sonner"
import { useState } from "react"

const BookVisitForm = () => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const data = Object.fromEntries(new FormData(event.currentTarget))
    const res = await fetch("https://backend-agiled.vercel.app/api/create-contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const result = await res.json()

    if (res.ok) {
      if (result?.errors) {
        const firstErrorField = Object.keys(result.errors)[0];
        const firstErrorMsg = result.errors[firstErrorField]?.[0];
        toast.error("Error: " + (firstErrorMsg || result.message || "unknown error"));
      } else {
        toast.success("Contact submitted successfully");
      }
    } else {
      let errorMessage = "Submission failed: ";

      if (result?.errors) {
        const firstErrorField = Object.keys(result.errors)[0];
        const firstErrorMsg = result.errors[firstErrorField]?.[0];
        errorMessage += firstErrorMsg || result.message || "unknown error";
      } else {
        errorMessage += result?.message || "unknown error";
      }

      toast.error(errorMessage);
    }

    setLoading(false);

  }

  return (
    <div className='w-full flex flex-col items-center justify-start border rounded-md'>
      <form className="space-y-6 w-full p-3" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 flex flex-col items-start">
            <Label htmlFor="first_name">First name</Label>
            <Input id="first_name" name="first_name" required placeholder="Enter text" />
          </div>

          <div className="space-y-2 flex-col items-start flex">
            <Label htmlFor="last_name">Last name</Label>
            <Input id="last_name" name="last_name" required placeholder="Enter text" />
          </div>

          <div className="space-y-2 flex-col items-start flex">
            <Label htmlFor="email">Contact email</Label>
            <Input id="email" name="email" type="email" required placeholder="Enter email" />
          </div>

          <div className="space-y-2 flex-col items-start flex">
            <Label htmlFor="phone">Phone number</Label>
            <Input id="phone" name="phone" placeholder="phone number" required />
          </div>

          <div className="space-y-2 flex-col items-start flex">
            <Label htmlFor="project_scope">Project scope details</Label>
            <Input id="project_scope" name="project_scope" placeholder="Enter text" required />
          </div>

          <div className="space-y-2 flex-col items-start flex">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" placeholder="Enter text" required />
          </div>

          <div className="space-y-2 flex-col items-start hidden">
            <Input id="tags" name="tags" value={"[Book A Visit]"} required />
          </div>
        </div>

        <div className="space-y-2 flex-col items-start flex">
          <Label htmlFor="note">Additional notes</Label>
          <Textarea id="note" name="note" className="min-h-[120px]" required />
        </div>

        <Button type="submit" className={`bg-[#C10000] w-full ${loading ? 'pointer-events-none' : 'cursor-pointer'}`}>
          {loading ? <span>Loading</span> : <span>Submit</span>}
        </Button>
      </form>
    </div>
  )
}

export default BookVisitForm
