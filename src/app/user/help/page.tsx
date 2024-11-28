"use client";

import React, { useState } from "react";

import styles from "./page.module.css";
import Chat from "@/components/chatbot/chat";
import FileViewer from "@/components/chatbot/file-viewer";

const FunctionCalling = () => {
  const [weatherData, setWeatherData] = useState({});

  const functionCallHandler = async (call: {
    function: { name: string; arguments: string };
  }): Promise<string> => {
    if (call?.function?.name !== "get_weather") return "Function not supported";

    const args = JSON.parse(call.function.arguments);
    // Do some processing here with `args`

    // Return a string as expected
    return `Weather data for ${args.city}`; // Example string returned
  };

  <div className={styles.chat}>
    <Chat functionCallHandler={functionCallHandler} />
  </div>;

  // return (
  //   <main className={styles.main}>
  //     <div className={styles.container}>
  //       <div className={styles.fileViewer}>
  //         <FileViewer />
  //       </div>
  //       <div className={styles.chatContainer}>
  //         <div className={styles.weatherWidget}>
  //           <div className={styles.weatherContainer}>
  //             <WeatherWidget {...weatherData} />
  //           </div>
  //         </div>
  //         <div className={styles.chat}>
  //           <Chat functionCallHandler={functionCallHandler} />
  //         </div>
  //       </div>
  //     </div>
  //   </main>
  // );

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.column}>
          {/* <WeatherWidget {...weatherData} /> */}
          <FileViewer />
        </div>
        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            <Chat functionCallHandler={functionCallHandler} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FunctionCalling;
