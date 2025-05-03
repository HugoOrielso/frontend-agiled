import { Label } from "@radix-ui/react-label"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const ContactForm = () => {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = Object.fromEntries(new FormData(event.currentTarget)) 
    console.log(data);
    
    const res = await fetch("http://localhost:3001/api/create-contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const result = await res.json()
    if (res.ok) {
      alert("Contact submitted successfully")
    } else {
      alert("Submission failed: " + (result?.error || "unknown error"))
    }
  }

  return (
    <div className='w-full'>
      <p className="mb-6">
        If none of the above suits you, please fill out our form below and we'll get back to you as soon as possible:
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 flex flex-col items-start">
            <Label htmlFor="first_name">First name</Label>
            <Input id="first_name" name="first_name"  placeholder="Enter text" />
          </div>

          <div className="space-y-2 flex-col items-start flex">
            <Label htmlFor="last_name">Last name</Label>
            <Input id="last_name" name="last_name" placeholder="Enter text" />
          </div>

          <div className="space-y-2 flex-col items-start flex">
            <Label htmlFor="email">Contact email</Label>
            <Input id="email" name="email" type="email"  placeholder="Enter email" />
          </div>

          <div className="space-y-2 flex-col items-start flex">
            <Label htmlFor="phone">Phone number</Label>
            <Input id="phone" name="phone" placeholder="phone number" />
          </div>

          <div className="space-y-2 flex-col items-start flex">
            <Label htmlFor="project_scope">Project scope details</Label>
            <Input id="project_scope" name="project_scope" placeholder="Enter text" />
          </div>

          <div className="space-y-2 flex-col items-start flex">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" placeholder="Enter text" />
          </div>
        </div>

        <div className="space-y-2 flex-col items-start flex">
          <Label htmlFor="notes">Additional notes</Label>
          <Textarea id="notes" name="notes" className="min-h-[120px]" />
        </div>

        <Button type="submit" className="bg-gray-800 hover:bg-gray-700">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default ContactForm
