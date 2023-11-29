import {NextApiRequest, NextApiResponse} from 'next';
import OpenAI from 'openai';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  /*
  //if (req.body !== undefined) {

    const openai = new OpenAI({
      apiKey: process.env["OPENAI_API_KEY"],
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${req.body}` }],
      //messages: [{ role: "user", content: "1 day meal for pescatarian" }],
      //instruction: prompt,
      //max_tokens: 1000,   
    });
    console.log(completion.choices[0].message.content);
    res.status(200).json({ text: `${completion.choices[0].message.content}` });
  //} else {
    //console.log(nextapo)
    //res.status(400).json({ text: "No prompt provided." });
  //}
  */
  
  res.status(200).json({ text: `${req.body[0].prompt}` });
};


/*import OpenAI from "openai";
//import type { NextApiRequest, NextApiResponse } from 'next';

//export default async (req: NextApiRequest, res: NextApiResponse) => {
export default async (req: any, res: any) => {

  console.log(req.body.prompt);
  if (req.body.prompt !== undefined) {
    const openai = new OpenAI(); 
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${req.body.prompt}` }],
      //instruction: prompt,
      //max_tokens: 1000,   

      //model: "text-davinci-003",
      //prompt: `${req.body.prompt}`,
    });
    console.log(completion.choices[0].message.content);
    res.status(200).json({ text: `${completion.choices[0].message.content}` });
  } else {
    //console.log(nextapo)
    res.status(400).json({ text: "No prompt provided." });
  }
};
*/
