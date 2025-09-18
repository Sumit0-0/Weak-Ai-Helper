import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { WebContainer } from "@webcontainer/api";

interface prop {
    data: string | undefined | null;
}

const EditorM = (props: prop) => {
    const [btn, setBtn] = useState(true);
    const [instance,setInstance] = useState<WebContainer | null>();
    const iframeRef = useRef<HTMLIFrameElement>(null);
    // let rawData = "";

    // if (props.data) {
    //  rawData = props.data
    // .replace(/^```json\s*/, "")
    // .replace(/^```jsx\s*/, "")
    // .replace(/^```javascript\s*/, "")
    // .replace(/```$/, "")
    // }
    // const rawData = {
    //     "src": {
    //         "directory": {
    //         "Button.jsx": {
    //             "file": {
    //             "contents": "import React from 'react';\n\nfunction Button({ children, onClick }) {\n  return (\n    <button onClick={onClick} style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>\n      {children}\n    </button>\n  );\n}\n\nexport default Button;"
    //             }
    //         },
    //         "App.jsx": {
    //             "file": {
    //             "contents": "import React from 'react';\nimport Button from './Button';\n\nfunction App() {\n  const handleClick = () => {\n    alert('Button Clicked!');\n  };\n\n  return (\n    <div style={{ textAlign: 'center', padding: '20px' }}>\n      <h1>My React App</h1>\n      <Button onClick={handleClick}>Click Me</Button>\n    </div>\n  );\n}\n\nexport default App;"
    //             }
    //         },
    //         "main.jsx": {
    //             "file": {
    //             "contents": "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);"
    //             }
    //         },
    //         "App.css": {
    //             "file": {
    //             "contents": "@import 'tailwindcss/base';\n@import 'tailwindcss/components';\n@import 'tailwindcss/utilities';"
    //             }
    //         }
    //         }
    //     },
    //     "index.html": {
    //         "file": {
    //         "contents": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>React Button App</title>\n</head>\n<body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n</body>\n</html>"
    //         }
    //     },
    //     "package.json": {
    //         "file": {
    //         "contents": "{\n  \"name\": \"react-button-app\",\n  \"version\": \"0.1.0\",\n  \"private\": true,\n  \"dependencies\": {\n    \"react\": \"^18.0.0\",\n    \"react-dom\": \"^18.0.0\",\n    \"tailwindcss\": \"^3.0.0\"\n  },\n  \"devDependencies\": {\n    \"@vitejs/plugin-react\": \"^4.0.0\",\n    \"vite\": \"^4.0.0\"\n  },\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\",\n    \"serve\": \"vite preview\"\n  }\n}"
    //         }
    //     },
    //     "vite.config.js": {
    //         "file": {
    //         "contents": "import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({\n  plugins: [react()],\n  server: {\n    headers: {\n      \"Cross-Origin-Embedder-Policy\": \"require-corp\",\n      \"Cross-Origin-Opener-Policy\": \"same-origin\"\n    }\n  }\n});"
    //         }
    //     },
    //     "tailwind.config.js":{
    //         "file":{
    //             "contents": "/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  content: [\n    './src/**/*.{js,jsx,ts,tsx}',\n  ],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n}"
    //         }
    //     },
    //     "postcss.config.js":{
    //         "file":{
    //             "contents": "module.exports = {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n}"
    //         }
    //     }
    //     }

        const projectFiles = {
    "package.json": {
      file: {
        contents: JSON.stringify({
          name: "sumit",
          private: true,
          version: "0.0.0",
          type: "module",
          scripts: {
            dev: "vite",
            build: "vite build",
            lint: "eslint .",
            preview: "vite preview",
          },
          dependencies: {
            react: "^19.1.1",
            "react-dom": "^19.1.1",
          },
          devDependencies: {
            "@vitejs/plugin-react": "^5.0.0",
            vite: "^7.1.2",
          },
        }),
      },
    },
    "index.html": {
      file: {
        contents: `<!doctype html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Vite + React</title>
          </head>
          <body>
            <div id="root"></div>
            <script type="module" src="/src/main.jsx"></script>
          </body>
        </html>`,
      },
    },
    "vite.config.js": {
      file: {
        contents: `import { defineConfig } from 'vite'
        import react from '@vitejs/plugin-react'

        export default defineConfig({
          plugins: [react()],
          server: {
            headers: {
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cross-Origin-Opener-Policy": "same-origin"
            }
          }
        })`,
      },
    },
    src: {
      directory: {
        "main.jsx": {
          file: {
            contents: `import { StrictMode } from 'react'
            import { createRoot } from 'react-dom/client'
            import App from './App.jsx'

            createRoot(document.getElementById('root')).render(
              <StrictMode>
                <App />
              </StrictMode>,
            )`,
          },
        },
        "App.jsx": {
          file: {
            contents: `export default function InnerApp() {
              return <h1>Hello from inside WebContainer React App!</h1>;
            }`,
          },
        },
      },
    },
  };

    useEffect(()=> {

        (async () => {
        const webcontainerInstance = await WebContainer.boot();
        setInstance(webcontainerInstance);
        })();

    },[]);

    async function load (){
        console.log("Hii from load function")
        const me = props.data?.replace(/^[\s\S]*?```json\s*/, "").replace(/^```jsx\s*/, "").replace(/```[\s\S]*$/, "");
        console.log(me);
        const obj = {
            index: me
        }

        console.log("sending this --> ")
        console.log(obj?.index)
        if(!instance){
            return;
        }

            await instance.mount(JSON.parse(obj?.index ?? "{}"));
            // await instance.mount(projectFiles);

        startDevServer();
    }

    async function startDevServer() {
    const installProcess = await instance?.spawn('npm', ['install']);

    const installExitCode = await installProcess?.exit;

    if (installExitCode !== 0) {
        throw new Error('Unable to run npm install');
    }

    // `npm run dev`
    await instance?.spawn('npm', ['run', 'dev']);

    instance?.on('server-ready', (port, url) => {
        if (iframeRef.current) {
            iframeRef.current.src = url;
        }
    });
    }

    function does () {
        setBtn(false);
        load();
    }

    return (
        <div className="bg-zinc-800 w-full h-full ml-5 mt-5 mr-5 rounded-2xl overflow-hidden flex flex-col">
            <div className="border-b border-gray-700 p-3">
                <button 
                    className={`text-lg font-medium px-4 py-2 rounded-md mr-3 ${
                        btn ? "bg-blue-600 text-white" : "bg-zinc-700 text-gray-300"
                    }`}
                    onClick={() => setBtn(true)}
                >
                    Code
                </button>
                <button 
                    className={`text-lg font-medium px-4 py-2 rounded-md ${
                        !btn ? "bg-blue-600 text-white" : "bg-zinc-700 text-gray-300"
                    }`}
                    onClick={does}
                >
                    Preview
                </button>
            </div>
            
            <div className="flex-1 relative">
                {btn ? (
                    <Editor
                        height="100%"
                        value={props.data || "// Your code here..."}
                        theme="vs-dark"
                        language="javascript"
                        options={{
                            fontSize: 16
                        }}
                    />
                ) : (
                    <div className="h-full w-full relative">
                        <iframe ref={iframeRef} style={{ width: "100%", height: "500px" }} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default EditorM;