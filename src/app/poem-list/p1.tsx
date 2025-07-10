// "use client";

// import { useEffect, useState } from "react";

// type Poem = {
//   id: number;
//   title: string;
//   content: string;
//   author: string;
//   createdAt: string;
// };

// export default function Home() {
//   const [poems, setPoems] = useState<Poem[]>([]);
//   const [form, setForm] = useState({ title: "", content: "", author: "" });

//   useEffect(() => {
//     fetch("/api/poems")
//       .then((res) => res.json())
//       .then(setPoems)
//       .catch((err) => console.error("Error fetching poems:", err));
//   }, []);

//   const handleSubmit = async () => {
//     const res = await fetch("/api/poems", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     if (res.ok) {
//       const newPoem = await res.json();
//       setPoems((prev) => [newPoem, ...prev]);
//       setForm({ title: "", content: "", author: "" });
//     } else {
//       const err = await res.json();
//       alert(err.error || "Failed to submit poem.");
//     }
//   };

//   return (
//     <main className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Post a Poem</h1>

//       <input
//         className="border p-2 w-full mb-2"
//         placeholder="Title"
//         value={form.title}
//         onChange={(e) => setForm({ ...form, title: e.target.value })}
//       />
//       <textarea
//         className="border p-2 w-full mb-2"
//         placeholder="Content"
//         rows={4}
//         value={form.content}
//         onChange={(e) => setForm({ ...form, content: e.target.value })}
//       />
//       <input
//         className="border p-2 w-full mb-4"
//         placeholder="Author"
//         value={form.author}
//         onChange={(e) => setForm({ ...form, author: e.target.value })}
//       />
//       <button
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//         onClick={handleSubmit}
//       >
//         Submit
//       </button>

//       <h2 className="text-xl font-semibold mt-10 mb-2">All Poems</h2>
//       <ul className="space-y-4">
//         {poems.map((poem) => (
//           <li key={poem.id} className="border p-4 rounded bg-gray-100">
//             <h3 className="text-lg font-bold">{poem.title}</h3>
//             <pre className="text-gray-700 whitespace-pre-wrap">{poem.content}</pre>
//             <p className="text-sm text-gray-500">— {poem.author}</p>
//             {/* <p className="text-xs text-gray-400">
//               {new Date(poem.createdAt).toLocaleString()}
//             </p> */}
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";
import Home2 from "./p2"

type Poem = {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

export default function Home() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [form, setForm] = useState({ title: "", content: "", author: "" });
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    fetch("/api/poems")
      .then((res) => res.json())
      .then(setPoems)
      .catch((err) => console.error("Error fetching poems:", err));
  }, []);

  const flipSound = new Howl({ src: ["/flip.mp3"] });

  const handleSubmit = async () => {
    const res = await fetch("/api/poems", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const newPoem = await res.json();
      setPoems((prev) => [newPoem, ...prev]);
      setForm({ title: "", content: "", author: "" });
      setIndex(0);
    } else {
      const err = await res.json();
      alert(err.error || "Failed to submit poem.");
    }
  };

  const nextPoem = () => {
    if (index < poems.length - 1) {
      flipSound.play();
      setIndex(index + 1);
    }
  };

  const prevPoem = () => {
    if (index > 0) {
      flipSound.play();
      setIndex(index - 1);
    }
  };

  return (
    <main
      className="p-6 max-w-2xl mx-auto min-h-screen bg-gradient-to-r from-pink-100 via-rose-100 to-pink-100"
      // style={{ backgroundImage: "url('/poem-bg.jpg')" }}
    >
      <Home2></Home2>
      <center>
        <h1 className="text-2xl text-black font-bold mb-4">Post a Poem</h1>
      </center>

      <input
        className="border border-black text-black p-2 w-full mb-2"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        className="border border-black text-black p-2 w-full mb-2"
        placeholder="Content"
        rows={4}
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />
      <input
        className="border border-black text-black p-2 w-full mb-4"
        placeholder="Author"
        value={form.author}
        onChange={(e) => setForm({ ...form, author: e.target.value })}
      />
      <button
        className="bg-pink-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {/* 
      <h2 className="text-xl font-semibold mt-10 mb-4">Your Poem Book</h2> */}

      {/* {poems.length > 0 && (
          <div className="min-h-fit relative border p-6 rounded bg-white shadow-xl ">
            <AnimatePresence mode="wait">
              <motion.div
                key={poems[index].id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 p-4"
              >
                <h3 className="text-lg font-bold mb-2 text-black">
                  {poems[index].title}
                </h3>
                <pre className="whitespace-pre-wrap text-gray-700">
                  {poems[index].content}
                </pre>
                <p className="text-sm text-gray-500 mt-2">
                  — {poems[index].author}
                </p>
              </motion.div>
            </AnimatePresence>

          
            <div className="absolute bottom-4 left-0 right-0 flex justify-between px-6">
              <button
                onClick={prevPoem}
                disabled={index === 0}
                className="bg-gray-300 px-4 py-1 rounded disabled:opacity-50"
              >
                ◀ Prev
              </button>
              <button
                onClick={nextPoem}
                disabled={index === poems.length - 1}
                className="bg-gray-300 px-4 py-1 rounded disabled:opacity-50"
              >
                Next ▶
              </button>
            </div>
          </div>
        )}
         */}

      {/* {poems.length > 0 && (
        <div className="relative border min-h-fit p-6 rounded bg-white shadow-xl ">
          <AnimatePresence mode="wait">
            <motion.div
              key={poems[index].id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="p-4"
            >
              <h3 className="text-lg font-bold mb-2 text-black">
                {poems[index].title}
              </h3>
              <pre className="whitespace-pre-wrap text-gray-700">
                {poems[index].content}
              </pre>
              <br />
              
            
              <p className="text-sm text-gray-500 mt-2">
                — {poems[index].author}
              </p>
            </motion.div>
          </AnimatePresence>

          
          <div className="mt-6 flex justify-between">
            <button
              onClick={prevPoem}
              disabled={index === 0}
              className="bg-gray-500 px-4 py-1 rounded disabled:opacity-50"
            >
              ◀ Prev
            </button>
            <button
              onClick={nextPoem}
              disabled={index === poems.length - 1}
              className="bg-gray-500 px-4 py-1 rounded disabled:opacity-50"
            >
              Next ▶
            </button>
          </div>
        </div>
      )} */}

      {/* {poems.length > 0 && (
        <div className="relative border min-h-fit p-6 rounded bg-white shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="p-4"
            >
              {index === -1 ? (
                <img
                  src="/front-cover.jpg"
                  alt="Front Cover"
                  className="w-full rounded shadow-md"
                />
              ) : index === poems.length ? (
                <img
                  src="/back-cover.jpg"
                  alt="Back Cover"
                  className="w-full rounded shadow-md"
                />
              ) : (
                <>
                  <h3 className="text-lg font-bold mb-2 text-black">
                    {poems[index].title}
                  </h3>
                  <pre className="whitespace-pre-wrap text-gray-700">
                    {poems[index].content}
                  </pre>
                  <p className="text-sm text-gray-500 mt-2">
                    — {poems[index].author}
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => {flipSound.play();
                setIndex((prev) => Math.max(prev - 1, -1))}}
              disabled={index === -1}
              className="bg-gray-500 px-4 py-1 rounded disabled:opacity-50"
            >
              ◀ Prev
            </button>
            <button
              onClick={() =>{flipSound.play();
                    setIndex((prev) => Math.min(prev + 1, poems.length))}
              
              }
              disabled={index === poems.length}
              className="bg-gray-500 px-4 py-1 rounded disabled:opacity-50"
            >
              Next ▶
            </button>
          </div>
        </div>
      )} */}
    </main>
  );
}
