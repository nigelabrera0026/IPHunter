/**
 * @author Nigel Abrera
 * @description Creating an IP Tracker that is fetched from an API and developing it in React
 * @created 10/16/2023
 * @updated 10/27/2023
 */

import React, { useEffect, useState } from "react";
import Button from "./Buttons";
import "./styles/styles.css";


/**
 * Creating the main body of the HTML
 * @returns Main body of HTML
 */
export default function Main() {

    // Default state for the variables that will store data.
    // Destructuring Syntax and Data Binding
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    // Use states for recieving own ip
    const [ownIP, setOwnIP] = useState("");
    const [text, setText] = useState("");
    
    // ClassName Styling for Button
    const [submit, setSubmit] = useState(false);
    const [reset, setReset] = useState(false);


    // CSS Styling for Button
    const [searchButtonStyleOn, setSearchButtonStyleOn] = useState({
        transition: "background-color 0.3s",
    
        backgroundColor: `rgb(${Math.floor(Math.random() * 256)}, 
        ${Math.floor(Math.random() * 256)}, 
        ${Math.floor(Math.random() * 256)})`,

        borderColor: "rgb(255,255,255)"
    });

    const [clearButtonStyleOff, setClearButtonStyleOff] = useState({
        transition: "background-color 0.3s",
    
        backgroundColor: `rgb(${Math.floor(Math.random() * 256)}, 
        ${Math.floor(Math.random() * 256)}, 
        ${Math.floor(Math.random() * 256)})`,

        borderColor: "rgb(255,255,255)"
    });

     /**
     * Fetchs the data if search is clicked
     * @param {event} event
     */
     function handleSearch(event) {
        event.preventDefault();
        
        const searchValue = document.getElementById("search").value;
        fetchData(searchValue);
    }

    /**
     * Fetching the API's data to get the IP
     * @param {JSON} query 
     */
    async function fetchData(query) {
 
        const APIURL = `http://ip-api.com/json/${query}`;
        
        try {
            const response = await fetch(APIURL);

            if(!response.ok) {
                throw new Error("Network response Error!");
            }

            const data = await response.json();
            setData(data);
            setError(null);

        } catch (error) {
            setData(null);
            setError(error.message);

        }
    }

    /**
     * Getting your own IP
     */
    async function getIP() {
        const APIURL = 'https://api.ipify.org/?format=json';
        
        try {
            const response = await fetch(APIURL);

            if(!response.ok) {
                throw new Error("Network response Error!");
            }

            const ownIP = await response.json();

            setOwnIP(ownIP.ip);
            setText(ownIP.ip);
            setError(null);

        } catch (error) {
            setOwnIP(ownIP);
            setError(error.message);
        }
    }

    /**
     * Handles the users own IP
     * @param {event} event 
     */
    const handleInput = (event) => {
        setText(event.target.value);
    }
    
    

    const handleSubmitClick = () => {
        setSubmit(!submit);

        const newSearchButtonStyleOn = {
            transition: "background-color 0.3s",
    
            backgroundColor: `rgb(${Math.floor(Math.random() * 256)}, 
            ${Math.floor(Math.random() * 256)}, 
            ${Math.floor(Math.random() * 256)})`,
    
            borderColor: "rgb(255,255,255)"
        };
        
        setSearchButtonStyleOn(newSearchButtonStyleOn);
    }

    const handleResetClick = () => {
        setReset(!reset);

        // Update the style of the "Clear" button
        const newClearButtonStyleOff = {
            transition: "background-color 0.3s",
            backgroundColor: `rgb(${Math.floor(Math.random() * 256)}, 
            ${Math.floor(Math.random() * 256)}, 
            ${Math.floor(Math.random() * 256)})`,
            borderColor: "rgb(255,255,255)"
        };

        setClearButtonStyleOff(newClearButtonStyleOff);
    }
    

    // Fetch the IP when the component mounts and show the information table.
    // No dependencies since it will only show your personal IP once when the page renders
    useEffect(() => {
        getIP();
        fetchData(text); 
    }, []); 

    // Data to be prompted. Will also be used to map data from the API
    const toPrompt = [
        "query",
        "country",
        "region",
        "city",
        "zip",
        "isp"
    ];

    return (
        <div className="container">
            <form onSubmit={handleSearch} className="form-box">
                <label className="form-label">Search IPv4</label>
                <input
                    type="text"
                    id="search"
                    className="form-input"
                    placeholder="Search IPv4..."
                    value={text}
                    onChange={handleInput}
                />
                <div className="button-container">
                    <Button
                        onClick={handleSubmitClick}
                        style={searchButtonStyleOn}
                        text="Submit"
                        isActive={submit}
                        setActive={setSubmit}
                        setButtonStyle={setSearchButtonStyleOn}
                    />
                    <Button
                        onClick={() => {
                            handleResetClick();
                            setText("");
                        }}
                        style={clearButtonStyleOff}
                        text="Clear"
                        isActive={reset}
                        setActive={setReset}
                        setButtonStyle={setClearButtonStyleOff}
                    />
                </div>
            </form>
            <div className="content-container">
                {error ? (
                    <h1 className="error-message">Error: {error}</h1>
                ) : (
                    <div className="information-container">
                        <h1 className="info-header">Information List</h1>
                        <div className="information-list">
                            {toPrompt.map((key) => (
                                <div className="information-item" key={key}>
                                    <div className="item-label">
                                        {key.toUpperCase()}:
                                    </div>
                                    <div className="item-value">
                                        {data && data[key] ? data[key] : "No Information about the IP"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
    
}
