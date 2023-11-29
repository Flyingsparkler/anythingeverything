import OpenAI from "openai";
//import type { NextApiRequest, NextApiResponse } from 'next';

//export default async (req: NextApiRequest, res: NextApiResponse) => {
export default async (req, res) => {

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
    res.status(400).json({ text: "No prompt provided." });
  }
};
