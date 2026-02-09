// import { useState } from "react";
// import "./App.css";

// function App() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async () => {
//     if (!query.trim()) return;

//     setLoading(true);
//     setResults([]);
//     setAnswer("");

//     try {
//       const res = await fetch("http://localhost:3000/ask-jiji", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ query }),
//       });

//       const data = await res.json();

//       setAnswer(data.answer || "");
//       setResults(data.resources || []);
//     } catch (err) {
//       alert("Server error");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="container">
//       <h1>Ask Jiji 🤖</h1>

//       <div className="search-box">
//         <input
//           type="text"
//           value={query}
//           placeholder="Search resources..."
//           onChange={(e) => setQuery(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//         />
//         <button onClick={handleSearch} disabled={loading}>
//           Search
//         </button>
//       </div>

//       {loading && <p>Loading...</p>}

//       {answer && <h3>{answer}</h3>}

//       {results.map((r) => (
//         <div key={r.id} className="result-card">
//           <h4>{r.title}</h4>
//           <p>{r.description}</p>
//           <a href={r.url} target="_blank" rel="noreferrer">
//             Open Resource
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;





import { useState } from "react";
import "./App.css";
import AddResource from "./AddResource";


function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResults([]);
    setAnswer("");
    setHasSearched(true);

    try {
      const res = await fetch("http://localhost:3000/ask-jiji", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setAnswer(data.answer || "I couldn't find an answer for that.");
      setResults(data.resources || []);
    } catch (err) {
      console.error(err);
      setAnswer("My brain is offline! Check the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* 1. HERO SECTION */}
      <div className="header">
        <div className="avatar-box">
          {/* CORRECT LADY AVATAR URL */}
          <img 
            src="https://img.freepik.com/free-photo/3d-illustration-business-woman-with-glasses_23-2149436187.jpg" 
            alt="Jiji AI Lady" 
            className="avatar-img" 
          />
          <div className="status-dot"></div>
        </div>
        <h1>Jiji</h1>
        <p className="subtitle">Your AI Friend</p>
      </div>

      {/* 2. SEARCH INTERFACE */}
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          value={query}
          placeholder="Ask me anything... (e.g., Explain RAG)"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="send-btn" onClick={handleSearch} disabled={loading}>
          {loading ? "..." : "➤"}
        </button>
      </div>

      {/* 3. CONVERSATION AREA */}
      {hasSearched && !loading && (
        <div className="result-section">
          
          {/* Speech Bubble */}
          <div className="jiji-bubble">
            <span className="label">Jiji Says</span>
            <p className="answer-text">{answer}</p>
          </div>

          {/* Resources */}
          {results.length > 0 && (
            <div className="resources-list">
              <span className="label" style={{color: '#94a3b8', marginBottom: '10px'}}>Recommended Resources</span>
              
              {results.map((r, index) => (
                <a 
                  key={index} 
                  href={r.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="resource-card"
                >
                  <div className={`icon-box ${r.type === 'video' ? 'icon-video' : 'icon-ppt'}`}>
                    {r.type === 'video' ? '▶' : 'P'}
                  </div>
                  
                  <div className="card-info">
                    <span className="card-title">{r.title}</span>
                    <span className="card-type">{r.type === 'video' ? 'Video Lesson' : 'Presentation'}</span>
                  </div>
                  
                  <div style={{color: '#cbd5e1'}}>➔</div>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
<AddResource />
