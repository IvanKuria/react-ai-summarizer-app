import React, {useState} from "react"

const API_KEY = process.env.REACT_APP_API_KEY

function App() {

  const [lengthOfSummary, setLengthOfSummary] = useState(50)
  const [summary, setSummary] = useState("")
  const [notes, setNotes] = useState("")

  // function to handle user length
  function handleInputLength(e){
    setLengthOfSummary(e.target.value)
  }

  // function to handle user inputted notes
  function handleNotes(e) {
    setNotes(e.target.value)
  }

  // function to get summary from OpenAi API
  async function callOpenAIAPI(){
    console.log("Calling the OpenAI API")

    // -H "Content-Type: application/json" \
    // -H "Authorization: Bearer $OPENAI_API_KEY" \

    const APIBody = {
      "model": "gpt-4o",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant who specializes in summarizing notes."
            },
            {
                "role": "user",
                "content": `Write a ${lengthOfSummary} word summary of the following: ${notes}`
            }
        ]
    }
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify(APIBody)
    }).then((data) => {
      return data.json()
    }).then((data) => {
      setSummary(data.choices[0].message.content.trim())
    })
  }


  return (
    <>
      <div className="header-container">
            <h1>📝 Condenso</h1>
      </div>
      <div className="summary-container">
        <div className="range-input-container">
          <div className="length-title">
            <label>Length</label>
          </div>
          <div className="range-label-container">
            <input
              type="range"
              onChange={handleInputLength}
              value={lengthOfSummary}
              min={50}
              max={200}
              ></input>
            <label>{lengthOfSummary}</label>
          </div>
        </div>
        <div className="textarea-container">
          <textarea
            onChange = {handleNotes}
            autoCorrect="on"
            placeholder="Enter your notes here"
            value={notes}
          ></textarea>
          <textarea
            readOnly
            value={summary !== "" ? summary : null}>
          </textarea>
        </div>
        <button 
          className="button-17"
          role="button"
          onClick={callOpenAIAPI}
          >Summarize</button>
      </div>
    </>
  )
}

export default App
