import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.post("/prompt",(req,res)=>{
    let prom = `hii i am wrapper made on top of u soi allow my user only to create a react fronetend application ok
    so give me response in react structure ok and if user ask anything else which is not 
    related to react thing then return sorry this not related to react so give me react 
    application prompt only and send me response in that way this is the structure and one more thing json object evrything inside {} thats it no name like i have given project file bcz that json i will directly use in my app 
    const projectFiles = {
        'index.html': { file: { contents: '<!DOCTYPE html>...' } },
        'package.json': { file: { contents: '{ "name": "sumit", "scripts": { "dev": "vite" } }' } },
        'vite.config.js': { file: { contents: 'export default { ... }' } },
        'src': {
            directory: {
            'main.jsx': { file: { contents: 'import React from "react"; ...' } },
            'App.jsx': { file: { contents: 'function App() { return <h1>Hello</h1>; }' } },
            'App.css': { file: {contents: @import "tailwindcss"; }}
            }
        }
        }; something like this ok
        Example one more :-
        import { useEffect, useRef, useState } from "react"; import { WebContainer } from "@webcontainer/api"; function App() { const [webcontainer, setWebcontainer] = useState(null); const iframeRef = useRef(null); const projectFiles = { "package.json": { file: { contents: JSON.stringify({ name: "sumit", private: true, version: "0.0.0", type: "module", scripts: { dev: "vite", build: "vite build", lint: "eslint .", preview: "vite preview", }, dependencies: { react: "^19.1.1", "react-dom": "^19.1.1", }, devDependencies: { "@vitejs/plugin-react": "^5.0.0", vite: "^7.1.2", }, }), }, }, "index.html": { file: { contents: <!doctype html> <html lang="en"> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Vite + React</title> </head> <body> <div id="root"></div> <script type="module" src="/src/main.jsx"></script> </body> </html>, }, }, "vite.config.js": { file: { contents: import { defineConfig } from 'vite' import react from '@vitejs/plugin-react' // https://vite.dev/config/ export default defineConfig({ plugins: [react()], server: { headers: { "Cross-Origin-Embedder-Policy": "require-corp", "Cross-Origin-Opener-Policy": "same-origin" } } }), }, }, src: { directory: { "main.jsx": { file: { contents: import { StrictMode } from 'react' import { createRoot } from 'react-dom/client' import App from './App.jsx' createRoot(document.getElementById('root')).render( <StrictMode> <App /> </StrictMode>, ), }, }, "App.jsx": { file: { contents: export default function InnerApp() { return <h1>Hello from inside WebContainer React App!</h1>; }, }, }, }, }, }; useEffect(() => { (async () => { const instance = await WebContainer.boot(); setWebcontainer(instance); await instance.mount(projectFiles); const install = await instance.spawn("npm", ["install"]); if (await install.exit !== 0) { throw new Error("npm install failed"); } await instance.spawn("npm", ["run", "dev"]); instance.on("server-ready", (port, url) => { iframeRef.current.src = url; }); })(); }, []); return ( <div> <h2>Outside React App (Host)</h2> <iframe ref={iframeRef} style={{ width: "100%", height: "500px" }} /> </div> ); } this is just example code
        my structure is very sensitive so dont mess that up ok and add those two header in every vite.config.js that sis very imp
        `;
    try{
        res.status(200).send({
            message: prom
        });

        return;
    }catch(err){
        console.log("Error in prompt catch block ---> ",err);
        res.status(500).send({
            message: "Error in prompt catch block --->",
            error: err
        })
        return;
    }
})

app.post("/llm",async (req,res)=>{
    try{
        let quarry = req.body.quarry;
        let data = await fetch(`${process.env.Gemini_Api}`,{
            method: "POST",
            headers: {
                "X-goog-api-key": `${process.env.Gemini_Api_Key}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                {
                    parts: [
                    {
                        text: `User Prompt :- ${quarry}`
                    }
                    ]
                }
                ]
            })
        })
        const data2 = await data.json();
        res.status(200).send({
            "message": data2
        })
    }catch(err){
        console.log("Error in prompt catch block ---> ",err);
        res.status(500).send({
            message: "Error in prompt catch block --->",
            error: err
        })
        return;
    }
})

app.post("/steps",async (req,res)=>{
    try{
         let quarry = req.body.quarry;
         let data = await fetch(`${process.env.Gemini_Api}`,{
            method: "POST",
            headers: {
                "X-goog-api-key": `${process.env.Gemini_Api_Key}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                {
                    parts: [
                    {
                        text: `User Prompt :- ${quarry} just give me steps here nothing else in good format ok i wanna display it on my screen`
                    }
                    ]
                }
                ]
            })
        })
        const data2 = await data.json();
        res.status(200).send({
            "message": data2
        })
        return;
    }catch(err){
        console.log("Error in prompt catch block ---> ",err);
        res.status(500).send({
            message: "Error in prompt catch block --->",
            error: err
        })
        return;
    }
})

app.listen(3000,()=>{
    console.log("Your app is running on 3000 port");
})