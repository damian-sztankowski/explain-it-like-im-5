import { useState } from "react"
import axios from "axios"

function App() {
  const [topic, setTopic] = useState("")
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [tooltips, setTooltips] = useState({})

  const sampleTopics = [
    "Rainbows",
    "Quantum Physics",
    "How airplanes fly",
    "Inflation",
    "Volcanoes",
    "Photosynthesis",
    "Blockchain",
    "AI",
    "Cloud Computing",
    "Human Heart",
    "Gravity",
    "The Water Cycle",
    "The Solar System",
    "DNA",
    "Evolution",
    "The Human Brain",
    "Plate Tectonics",
    "Climate Change",
    "The Internet",
    "Virtual Reality (VR)",
    "Robotics",
    "Renewable Energy",
    "3D Printing",
    "Cybersecurity",
    "Ancient Egypt",
    "The Roman Empire",
    "The Renaissance",
    "World War II",
    "Democracy",
    "Globalization",
    "The Industrial Revolution",
    "Mythology",
    "Calculus",
    "Probability",
    "Algorithms",
    "Geometry",
    "Electricity",
    "How a Car Works",
    "The Stock Market",
    "Time Zones",
    "The Immune System",
    "Supply and Demand",
    "The Concept of Money",
    "How a Refrigerator Works",
    "Consciousness",
    "Ethics",
    "Creativity",
    "The Meaning of Life",
    "Satellites",
    "Cryptography",
  ];

  const handleExplain = async () => {
    if (!topic) return
    setLoading(true)

    const facts = [
      "🧠 Did you know? The human brain can store over 2.5 petabytes of data.",
      "💡 AI was first coined in 1956!",
      "🚀 The Sun is 400 times larger than the Moon.",
      "🌈 Rainbows are full circles — you just see half!",
      "📚 The word 'quiz' was invented as a prank.",
    ]
    const randomFact = facts[Math.floor(Math.random() * facts.length)]
    setResult([{ label: "Loading", text: randomFact }])
    setTooltips({})

    try {
      const res = await axios.post("http://localhost:8000/explain", { topic })
      const raw = res.data.result
      const labels = ["Kid", "Teen", "Adult"]

      const matches = raw.match(/\*\*\d\.\s(?:Kid|Teen|Adult) Level.*?\*\*[\s\S]*?(?=\*\*\d\.|$)/g)

      const output = labels.map((label, i) => {
        const block = matches?.[i] || ""
        const clean = block
          ?.replace(/\*\*\d\.\s(?:Kid|Teen|Adult) Level.*?\*\*/, "")
          ?.replace(/\*\*/g, "")
          .trim()
        return {
          label,
          text: clean || "No explanation found.",
        }
      })

      setResult(output)

      try {
        const parsedTooltips = JSON.parse(res.data.tooltips)
        setTooltips(parsedTooltips)
      } catch (e) {
        console.warn("Could not parse tooltips JSON:", e)
      }
    } catch (err) {
      console.error(err)
      setResult([{ label: "Error", text: "Something went wrong. Please try again." }])
    }

    setLoading(false)
  }

  const theme = {
    Kid: "bg-yellow-50 border-yellow-400",
    Teen: "bg-purple-50 border-purple-400",
    Adult: "bg-blue-50 border-blue-400",
    Error: "bg-red-50 border-red-400",
    Loading: "bg-gray-100 border-gray-300",
  }

  const emoji = {
    Kid: "🧒",
    Teen: "🧑",
    Adult: "🧠",
    Error: "⚠️",
    Loading: "⏳",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-rose-100 p-8 flex flex-col items-center font-sans">
      <h1 className="text-5xl font-extrabold mb-6 text-gray-800 text-center animate-fade-down">
        Explain It Like I'm 5 <span className="text-3xl">🧠</span>
      </h1>

      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 mb-6 border border-gray-200 animate-fade-in">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            className="p-4 w-full border border-gray-300 rounded-md shadow-inner text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter a topic (e.g., Kubernetes, Heart, Wi-Fi)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button
            onClick={handleExplain}
            disabled={!topic || loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md shadow transition-transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0c-5.523 0-10 4.477-10 10h4z"
                  ></path>
                </svg>
                Thinking...
              </span>
            ) : (
              "Explain It!"
            )}
          </button>
        </div>

        <button
          onClick={() => {
            const random = sampleTopics[Math.floor(Math.random() * sampleTopics.length)]
            setTopic(random)
            handleExplain()
          }}
          className="mt-3 text-base px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-lg font-medium shadow-sm hover:shadow-md hover:scale-105 transition-all"
        >
          🎲 Surprise Me!
        </button>
      </div>

      {result.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl animate-fade-in">
          {result.map(({ label, text }) => (
            <div
              key={label}
              className={`rounded-xl border-l-4 shadow-lg p-6 transition-transform hover:scale-105 hover:animate-wiggle ${
                theme[label] || "bg-gray-100 border-gray-300"
              } ${label === "Loading" ? "col-span-1 md:col-span-3 text-center text-xl" : ""}`}
            >
              <div className="text-xl font-bold mb-3 text-gray-800 flex items-center justify-center">
                {emoji[label] || "❓"} <span className="ml-2">{label} Level</span>
              </div>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed text-lg">
                {text.split(" ").map((word, i) => {
                  const clean = word.toLowerCase().replace(/[^a-z]/gi, "")
                  const hasTip = tooltips?.[clean]
                  return hasTip ? (
                    <span
                      key={i}
                      title={hasTip}
                      className="underline decoration-dotted cursor-help text-blue-700 hover:text-blue-900"
                    >
                      {word + " "}
                    </span>
                  ) : (
                    word + " "
                  )
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
