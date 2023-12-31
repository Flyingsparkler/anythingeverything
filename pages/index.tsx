import 'bootstrap/dist/css/bootstrap.css';
import Head from "next/head";
import React, { FormEvent, useState } from "react";
import ReactMarkdown from 'react-markdown'; 
import ReactGA from 'react-ga4';

ReactGA.initialize("G-R7CHWDXJPZ");
ReactGA.send({ hitType: "pageview", page: "/mealplanner", title: "Meal Planner" });

export default function Page() {
  
  const [formData, setFormData] = useState({
    cuisine: '',
    diet: '',
    noOfDays: '',
  });
        
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [err, setErr] = useState<string | null>(null)
  const [response, setResponse] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.noOfDays != "" && formData.cuisine != "" && formData.diet != "") {
        const prompt = "Hello ChatGPT, please suggest a " + formData.noOfDays + " days meals plan with recipes for a " + formData.diet + " with cuisines, " + formData.cuisine + " in markdown format.";
        setResponse("");
        console.log("Getting response from OpenAI"); 
        console.log("prompt" + prompt)
        setIsLoading(true)
        setErr("");

        fetch('/api/submit', {
          method: 'POST',
          /*headers: {
            'Content-Type': 'application/json',
          },*/
          body: JSON.stringify({prompt: prompt}),
        })
          .then((response) => response.json())
          .then((data) => {
            setIsLoading(false)
            console.log(data.text);
            const messagecontent = data.text; 
            setResponse(messagecontent.replace(" in markdown format", ""));
          })
          .catch((error) => {
            console.error(error);
          });
      }
      else 
      {
        setErr("Please provide input for all fields.")
      }
  };
  return (
    
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Gastronomy on Autopilot</h1>
          <p>Personalised meal plan with recipes based on your food preference and completed with a grocery list to easily pick up the needed ingredients from the store.</p>
          <div className="form-group">
          {err && <div style={{ color: 'red' }}>{err}</div>}
          </div>
          <form onSubmit={handleSubmit} className="form-horizontal">
          <div className="form-group">
              <label htmlFor="Diet" className="col-sm-2 control-label">Diet</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="diet" name="diet" placeholder="Anything or Vegan or Vegetarian or Pescatarian or Paleo or Ketogenic" value={formData.diet} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="Cuisine" className="col-sm-2 control-label">Cuisine(s)</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="cuisine" name="cuisine" placeholder="Japanese, Teochew, Chinese, Korean etc" value={formData.cuisine} onChange={handleInputChange}/>
              </div>
            </div>
            <div className="form-group"> 
              <label htmlFor="NoOfDays" className="col-sm-2 control-label">No. of Day(s)</label>
              <div className="col-sm-10">
                <input type="number" className="form-control" id="noOfDays" name="noOfDays" placeholder="" min="0" max="7" value={formData.noOfDays} onChange={handleInputChange} />
              </div>
            </div>
            <br/>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button className="btn btn-primary" id="submit" type="submit" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Submit'}
                </button>
              </div>
            </div>
          </form>  
        </div> 
      </div>
      <div className="row">
        <div className="col">
        <br/><br/><ReactMarkdown className="fs-6">{response}</ReactMarkdown>
        </div> 
      </div>
    </div>
  )
}
