import { useEffect, useState } from 'react'
import './App.css'
import Header from './component/Header'
import EditorM from './component/EditorM'

function App() {
  const [data,setData] = useState();

  return <div className='bg-zinc-700 h-screen w-full flex flex-col'> 
      <Header />
    <div className='h-[88vh] flex'>
      <SideBar setData={setData}/>
      <EditorM data={data}/>
    </div>
     </div>
}

interface prop {
  setData: React.Dispatch<React.SetStateAction<undefined>>;
}

const SideBar = (props: prop) => {
  const [input,setInput] = useState<string>("");
  const [ren,setRen] = useState();
  const [dd,setDd] = useState();

    function change(e: React.ChangeEvent<HTMLInputElement>){
        setInput(e.target.value);
    }

    async function apiCall(){

      //steps
      const res3 = await fetch("http://localhost:3000/steps",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "quarry": `${input}`
        })
      })
      const response3 = await res3.json();
      const actData2 = response3.message.candidates[0].content.parts[0].text;

       console.log("my new data rfined2 and this is steps",actData2);

      setDd(actData2);

      const res = await fetch("http://localhost:3000/prompt",{
        method: "POST",
        headers: {
           "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input })
      })

      const response = await res.json();
      console.log("response1 data from 1st call -->",response);
      const apiData = input + " " +  response.message;
      console.log("That data is what i am sending -->",apiData);

      const res2 = await fetch("http://localhost:3000/llm",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "quarry": `${apiData}`
        })
      })

      const response2 = await res2.json();
      console.log("Data that i am getting from llm -->",response2)
      
      //here i am going to split the data on basis of <Dogra Ai/> tag first halg contain setps
      //seconf half gonna contain code
      
      const actData = response2.message.candidates[0].content.parts[0].text;

      console.log("my new data rfined",actData);

      setRen(actData)
      props.setData(actData);

      setInput("");
    }

    return <>
        <div className="h-full w-[60vw] bg-zinc-800 mt-5 ml-1 rounded-2xl flex flex-col
        justify-center items-end">
            <div className="w-[36vw] h-[65vh] px-3 overflow-auto text-white text-2xl">
                   <div className='break-words whitespace-normal'>
                     {ren ? JSON.stringify(dd) : "Hii from dogra ai how can i help u"}
            </div>
                   </div>
            <div className=" border-t w-full border-white rounded-2xl p-5">
                <input type="text" placeholder="Write Your thought here.."
                 value={input}
                 onChange={ (e)=> change(e) }
                 className="text-white text-2xl p-2 border border-gray-200
                 rounded-2xl outline-none focus:border-gray-400 mr-4"/>
                <button onClick={apiCall}
                className="bg-blue-400 px-3 py-1 text-3xl rounded-full hover:bg-blue-500">Gen</button>
            </div>
        </div>
    </>
}

export default App

