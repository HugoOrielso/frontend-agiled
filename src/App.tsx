import { useState } from 'react'
import './App.css'
import { Label } from "@/components/ui/label"
import { Toaster } from 'sonner'
import BookVisitForm from './components/BookVisitForm'
import DefaultForm from './components/DefaultForm'

function App() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionChange = (option: string) => {
    setSelectedOption(option)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className=" flex items-center flex-col w-full justify-start mx-auto min-h-screen  p-3 ">
      <section className='flex flex-col w-full'>
        <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
        <p className="text-center mb-8">
          Please fill the form below to contact our team. We will get back to you as soon as possible.
        </p>
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">RadioBox Group</h2>
          <div className="space-y-3">
            {[
              { id: 'call-now', label: 'Book a call now! call us at (+1)780 288 9476' },
              { id: 'call-schedule', label: 'Book a call for mornings or evenings here 15 min call' },
              { id: 'visit', label: "Book a visit for mornings or evenings and we'll get back to you within 24 hours" },
              { id: 'contact-form', label: 'Fill out our detailed contact form' },
            ].map(({ id, label }) => (
              <div key={id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={id}
                  name="contact-option"
                  value={id}
                  checked={selectedOption === id}
                  onChange={() => handleOptionChange(id)}
                  className="h-4 w-4"
                />
                <Label htmlFor={id}>{label}</Label>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='flex flex-col w-full h-full flex-1 items-center justify-center'>
        <div className={`p-4 border rounded-md w-full max-w-[500px] bg-red-50 mb-8 ${selectedOption === "call-now" ? "block" : "hidden"}`}>
          <p className="font-medium w-full h-full flex items-center justify-center gap-2">
            Call us now at:{" "}
            <a href="tel:+17802889476" className='underline'>(+1)780 288 9476</a>
          </p>
        </div>

        <div className="mb-8 relative space-y-8 w-full">
          <div className={`${selectedOption === 'call-schedule' ? 'block' : 'hidden'}`}>
            <iframe
              src="https://tidycal.com/iinfo/15-minute-call"
              className="w-full min-h-[900px] flex items-center justify-center border rounded-md"
              frameBorder="0"
              allowFullScreen
              title="Book a 15 min call"
            ></iframe>
          </div>

          <div className={`${selectedOption === 'visit' ? 'block' : 'hidden'} overflow-hidden`} >
            <BookVisitForm />
          </div>
        </div>

        {(selectedOption === "contact-form") && (
            <DefaultForm/>
        )}

        {(!selectedOption) && (
          <div className='w-full h-full  items-center justify-center p-4 border rounded-md max-w-[500px] bg-red-50 mb-8 block '>
            <p>Please select an option</p>
          </div>
        )}

      </section>
      <Toaster richColors />
    </div>

  )
}

export default App
