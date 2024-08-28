import "./App.css";
import React from "react";
import gptlogo from "../src/images/ChatGPT-Logo.svg.png";
import gptblue from "../src/images/download.png";
import { BiBulb } from "react-icons/bi";
import {
  BiPlusCircle,
  BiMessage,
  BiHome,
  BiSave,
  BiRocket,
  BiArrowToRight,
} from "react-icons/bi";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import "../src/output.css";

function App() {
  let [input, setInput] = React.useState("");
  let [finalResponse, setFinalResponse] = React.useState([
    {
      text: "Hey, I am a RagChat, here for your queries!",
      isBot: true,
    },
  ]);

 //for dark mode
 let [darkMode, setDarkMode] = React.useState(false);
 let [backgroundColor, setBackgroundColor]= React.useState({backgroundColor:"aliceblue", color:" rgb(3,0,31)"});
 function handleDarkMode() {
  setDarkMode(previous => {
    // Toggle dark mode
    const newDarkMode = !previous;

    // Set the background color based on the new dark mode value
    setBackgroundColor(newDarkMode 
      ? { backgroundColor: "rgb(3,0,31)", color: "aliceblue" }
      : { backgroundColor: "aliceblue", color: "rgb(3,0,31)" }
    );

    // Return the new dark mode value
    return newDarkMode;
  });
}


  function submission(e) {
    e.preventDefault();
    if (input.trim() === "") return; // Prevent submitting empty inputs

    setFinalResponse([
      ...finalResponse,
      { text: input, isBot: false },
      { text: "I am bot", isBot: true },
    ]);

    setInput("");
  }

  function newPage() {
    setFinalResponse([
      {
        text: "Hey, I am a RagChat, here for your queries!",
        isBot: true,
      },
    ]);
  }

  return (
    <div style={backgroundColor} className="flex min-h-screen">
      <div style={darkMode?{borderRight:"1px solid white"}:{borderRight:"1px solid black"} }
      className="flex-3 w-[900px]">
        <div style={darkMode?{borderBottom:"1px solid white"}:{borderBottom:"1px solid black"} } 
        className="p-[2.5rem] h-[75%]">
          <div className="flex items-center mb-[2.5rem]">
            <img src={darkMode? gptblue:gptlogo} alt="" className="w-[40px] mr-[1rem]" />
            <span className="text-[2rem]">RagChat</span>
            <button onClick={handleDarkMode}><BiBulb className="text-[2.5rem] ml-3"/></button>
          </div>
          <button
          style={darkMode?{ border:"1px solid white"}:{border:"1px solid black"}}
            className="flex items-center justify-center  border-none
           p-[1.5rem] text-[1.5rem] w-[25rem] mb-4 rounded-md my-0 mx-auto"
            onClick={newPage}
          >
            <BiPlusCircle className="text-[2.5rem] mr-4" />
            New Chat
          </button>
          <div className="flex flex-col mt-[4rem] items-center text-blue-950 ">
            <div className="response-container overflow-y-auto h-[200px]">
              {finalResponse.length > 1 &&
                finalResponse
                  .filter((value) => !value.isBot) // Filter out the bot responses
                  .map((value, index) => (
                    <button
                     style={backgroundColor}
                      key={index}
                      className="flex justify-start items-center text-[1.5rem] border border-blue-950 p-[1rem] w-[20vw] m-[1rem]"
                    >
                      <BiMessage className="mr-4" />
                      <p>{value.text}</p>
                    </button>
                  ))}
            </div>
          </div>
        </div>

        <div style={backgroundColor} className="flex flex-col p-8">
          <div className="flex justify-start items-center mt-4 text-[1.5rem]">
            <BiHome className="mr-4" /> Home
          </div>
          <div className="flex justify-start items-center mt-4 text-[1.5rem]">
            <BiSave className="mr-4" /> Saved
          </div>
          <div className="flex justify-start items-center mt-4 text-[1.5rem]">
            <BiRocket className="mr-4" /> Upgrade to Pro
          </div>
        </div>
      </div>
      {/* for the response */}
      <div className="flex flex-col justify-between my-[2rem] mx-[6rem]">
        {/* Scrollable response container */}
        <div style={backgroundColor} className="response-container overflow-y-auto h-[400px] mb-6 pr-10 p-2">
          {finalResponse.map((value, index) => (
            <div
              key={index}
              style={darkMode&&value.isBot?{backgroundColor:"aliceblue",color:"rgb(3,0,31)"}:{backgroundColor:"rgb(3,0,31)",color:"aliceblue"}}
              className={
                value.isBot
                  ? "flex mb-[2rem] rounded-lg p-3"
                  : "flex mb-[2rem]"
              }
            >
              {value.isBot ? (
                <img
                  src={gptblue}
                  className="w-[30px] h-[20px] mr-5 mt-1.5"
                  alt=""
                />
              ) : (
                <BsFillPersonBadgeFill className="w-[43px] h-[25px] mr-5 mt-1.5" />
              )}
              <p className="text-[1.5rem] ">{value.text}</p>
            </div>
          ))}
        </div>
        {/* Input section */}
        <div>
          <div className="flex justify-center items-center ">
            <input
            style={darkMode?{backgroundColor:"aliceblue", color:"rgb(3,0,31)"}:{backgroundColor:"rgb(3,0,31)", color:"aliceblue"}}
              className="mr-2.5 w-[60vw] h-[4rem] p-[5px] text-lg rounded-md"
              type="text"
              placeholder="Ask something"
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={input}
            ></input>
            <button className="bg-transparent border-none" onClick={submission}>
              <BiArrowToRight style={backgroundColor} className="text-[3rem]" />
            </button>
          </div>
          <div className="flex justify-center text-lg">
            <p>Ask anything you want! I provide you with accurate results.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
