import { Label } from "@radix-ui/react-label"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { toast } from "sonner"

const BookVisitForm = () => {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = Object.fromEntries(new FormData(event.currentTarget)) 
    
    const res = await fetch("https://backend-agiled.vercel.app/api/create-contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const result = await res.json()

    console.log(result);
    
    if (res.ok) {
      toast.success("We will contact you soon")
    } else {
      toast.error("Submission failed: " + (result?.error || "unknown error"))
    }

    

  }

  return (
    <div className='w-full flex flex-col items-center justify-start border rounded-md'>
      <form className="space-y-6 w-full p-3" onSubmit={handleSubmit}>
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

          <div className="space-y-2 flex-col items-start hidden">
            <Input id="tags" name="tags" value={"[Book A Visit]"}  />
          </div>
        </div>

        <div className="space-y-2 flex-col items-start flex">
          <Label htmlFor="notes">Additional notes</Label>
          <Textarea id="notes" name="notes" className="min-h-[120px]" />
        </div>

        <Button type="submit" className="bg-[#C10000] w-full cursor-pointer">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default BookVisitForm
