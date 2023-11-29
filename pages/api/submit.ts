import {NextApiRequest, NextApiResponse} from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const obj = JSON.parse(req.body);
  console.log("test" + req.body);
  if (obj.prompt !== undefined) {
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${obj.prompt}` }],
      //instruction: prompt,
      //max_tokens: 1000,   

    });
    console.log(completion.choices[0].message.content);
    res.status(200).json({ text: `${completion.choices[0].message.content}` });
  } else {
    //console.log(nextapo)
    res.status(400).json({ text: "No prompt provided." });
  }
};


/*export default async (req, res) => {

  console.log(req.body.prompt);
  if (req.body.prompt !== undefined) {
    
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
