import { BookOpen, ChevronRight, LogIn } from "lucide-react"


const Home = () => {
return  <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
<header className="container mx-auto px-4 py-6">
  <nav className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <BookOpen className="h-6 w-6 text-purple-600" />
      <span className="text-xl font-bold text-purple-900">BookBond</span>
    </div>
    <div className="flex items-center gap-4">
      <a href="#" className="text-sm font-medium text-purple-900 hover:text-purple-700">
        About
      </a>
      <a href="#" className="text-sm font-medium text-purple-900 hover:text-purple-700">
        Features
      </a>
      <a href="#" className="text-sm font-medium text-purple-900 hover:text-purple-700">
        Testimonials
      </a>
      <button className="flex items-center gap-1 rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-purple-200">
        <LogIn className="h-4 w-4" />
        <span>Login</span>
      </button>
    </div>
  </nav>
</header>

<main>
  <section className="container mx-auto px-4 py-20 text-center">
    <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-purple-900 sm:text-6xl md:text-7xl">
      BookBond
    </h1>
    <p className="mx-auto mt-6 max-w-2xl text-xl text-purple-700 sm:text-2xl">
      Bond with your wife over her favorite books
    </p>
    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <button className="flex items-center gap-2 rounded-full bg-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-purple-700 hover:shadow-xl">
        Login to create a HusbandGram
        <ChevronRight className="h-5 w-5" />
      </button>
      <button className="flex items-center gap-2 rounded-full border border-purple-300 bg-white px-8 py-4 text-lg font-semibold text-purple-700 shadow-md transition-all hover:bg-purple-50 hover:shadow-lg">
        Learn more
      </button>
    </div>
  </section>

  <section className="container mx-auto px-4 py-16">
    <div className="grid gap-8 md:grid-cols-3">
      <div className="rounded-xl bg-white p-6 shadow-md">
        <div className="mb-4 inline-flex rounded-full bg-purple-100 p-3">
          <BookOpen className="h-6 w-6 text-purple-600" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-purple-900">Discover Books</h3>
        <p className="text-purple-700">
          Find out what books your wife loves and discover new titles to discuss together.
        </p>
      </div>
      <div className="rounded-xl bg-white p-6 shadow-md">
        <div className="mb-4 inline-flex rounded-full bg-purple-100 p-3">
          <svg
            className="h-6 w-6 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-bold text-purple-900">Create HusbandGram</h3>
        <p className="text-purple-700">Build your profile and showcase your interest in her literary world.</p>
      </div>
      <div className="rounded-xl bg-white p-6 shadow-md">
        <div className="mb-4 inline-flex rounded-full bg-purple-100 p-3">
          <svg
            className="h-6 w-6 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-bold text-purple-900">Strengthen Bonds</h3>
        <p className="text-purple-700">Connect on a deeper level by engaging with the stories she loves.</p>
      </div>
    </div>
  </section>

  <section className="container mx-auto px-4 py-16">
    <div className="rounded-2xl bg-purple-100 p-8 md:p-12">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-purple-900 md:text-4xl">Ready to strengthen your relationship?</h2>
        <p className="mt-4 text-lg text-purple-700">
          Join thousands of husbands who have discovered the joy of connecting through literature.
        </p>
        <button className="mt-8 flex items-center gap-2 rounded-full bg-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-purple-700 hover:shadow-xl mx-auto">
          Login to create a HusbandGram
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  </section>
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
}

export default Home