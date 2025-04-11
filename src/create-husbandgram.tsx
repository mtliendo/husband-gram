import { useState, useEffect} from "react"
import { BookOpen, Send, ArrowLeft, Loader2 } from "lucide-react"
import {getUrl } from 'aws-amplify/storage'
import {events, EventsChannel} from 'aws-amplify/api'

const CreateHusbandGramPage = () => {

    const [genre, setGenre] = useState("")
    const [question, setQuestion] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [response, setResponse] = useState("")
    const [isSpicy, setIsSpicy] = useState(false)
    const [audioUrl, setAudioUrl] = useState<string |null>(null);

  
    const bookGenres = [
      "Romance",
      "Mystery",
      "Thriller",
      "Science Fiction",
      "Fantasy",
      "Historical Fiction",
      "Biography",
      "Self-Help",
      "Literary Fiction",
      "Young Adult",
      "Poetry",
      "Horror",
      "Memoir",
      "Classics",
      "Contemporary Fiction",
    ]

    useEffect(() => {
        let channel: EventsChannel
        const setupSubscription = async () => {
          channel = await events.connect('husbandAudioChannel')
    
          channel.subscribe({
            next: async (data) => {
              console.log('Data: ', data)
              console.log('the event', data.event)
              const bucketName = data.event.audioFileName.split('/')[0]
              const key = data.event.audioFileName.split('/').slice(1).join('/')
              console.log('Bucket Name: ', bucketName)
              console.log('Key: ', key)
              const linkToStorageFile = await getUrl({
                path: key,
              })
              console.log('Link to storage file: ', linkToStorageFile)
              console.log('the url', linkToStorageFile.url.toString())
              setAudioUrl(linkToStorageFile.url.toString())
            },
            error: (err) => {
              console.error(err)
            },
          })
        }
    
        setupSubscription()
    
        return () => channel?.close()
      }, [])
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
  
      if (!genre || !question) return
  
      setIsSubmitting(true)
  
      try {
        // This is where you would connect to your LLM API
        // For now, we'll simulate a response after a delay
       
/// real request
      const response = await fetch('https://6rnyhn4y2wil43poryjgkxssne0dnalo.lambda-url.us-east-1.on.aws/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          genre,
          question,
         isSpicy
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResponse(data.msg);
    } catch (error) {
      console.error('Error:', error);
    } finally {
        setIsSubmitting(false)
    }  
    }

    async function convertTextToAudio(text: string) {
        await fetch("https://46jhnst4nutb7g5xlfmt7jvwq40xkjwm.lambda-url.us-east-1.on.aws/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text })
        });
    }

    async function sendMMToWife(mp3Url: string) {
        await fetch("https://tp55g2x5p3irvoyynvvvqu3u5i0yenxk.lambda-url.us-east-1.on.aws/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mp3Url })
        });
    }

  
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold text-purple-900">BookBond</span>
            </div>
            <div className="flex items-center gap-4">
             
            </div>
          </nav>
        </header>
  
        <main className="container mx-auto px-4 py-12">
        
  
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-2 text-3xl font-bold text-purple-900">Create Your HusbandGram</h1>
            <p className="mb-8 text-lg text-purple-700">
              Generate thoughtful conversation starters about your wife's favorite books
            </p>
  
            <div className="rounded-xl bg-white p-6 shadow-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="genre" className="mb-2 block text-sm font-medium text-purple-900">
                    Select Book Genre
                  </label>
                  <select
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full rounded-lg border border-purple-200 bg-white px-4 py-2 text-purple-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    required
                  >
                    <option value="" disabled>
                      Select a genre
                    </option>
                    {bookGenres.map((bookGenre) => (
                      <option key={bookGenre} value={bookGenre}>
                        {bookGenre}
                      </option>
                    ))}
                  </select>
                </div>
  
                <div>
                  <label htmlFor="question" className="mb-2 block text-sm font-medium text-purple-900">
                    Your Question or Topic
                  </label>
                  <textarea
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="What do you have to say?"
                    className="h-32 w-full rounded-lg border border-purple-200 bg-white px-4 py-2 text-purple-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    required
                  />
                </div>

                <div className="mt-2 flex items-center">
                  <input
                    type="checkbox"
                    id="spicy"
                    checked={isSpicy}
                    onChange={(e) => setIsSpicy(e.target.checked)}
                    className="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="spicy" className="ml-2 text-sm font-medium text-purple-700 cursor-pointer">
                    Make it spicy? 🌶️
                  </label>
                </div>
  
                <button
                  type="submit"
                  disabled={isSubmitting || !genre || !question}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-purple-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 hover:shadow-lg disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Create HusbandGram
                    </>
                  )}
                </button>
              </form>
            </div>
  
            {response && (
              <div className="mt-8 rounded-xl bg-white p-6 shadow-md">
                <h2 className="mb-4 text-xl font-bold text-purple-900">Your HusbandGram</h2>
                <div className="rounded-lg bg-purple-50 p-4 text-purple-900">
                  <p>{response}</p>
                </div>
                <div className="mt-6 flex justify-end gap-4">
                  <button onClick={() => convertTextToAudio(response)} className="rounded-full border border-purple-300 bg-white px-4 py-2 text-sm font-medium text-purple-700 shadow-sm transition-all hover:bg-purple-50 hover:shadow-md">
                    Create Audio
                  </button>

                  {audioUrl && (<div>
                    <div>
          <p>Audio Ready:</p>
          <audio controls>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
                  
                  <button onClick={() => {sendMMToWife(audioUrl)}} className="rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-purple-700 hover:shadow-md">
                    Send MMS
                  </button>
                  </div>)}
                    
       
                  
                </div>
              </div>
            )}
  
          </div>
        </main>
  
        <footer className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 border-t border-purple-100 pt-8 md:flex-row">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              <span className="text-lg font-bold text-purple-900">BookBond</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-purple-700 hover:text-purple-900">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-purple-700 hover:text-purple-900">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-purple-700 hover:text-purple-900">
                Contact
              </a>
            </div>
            <div className="text-sm text-purple-500">
              &copy; {new Date().getFullYear()} BookBond. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    )
  }


export default CreateHusbandGramPage