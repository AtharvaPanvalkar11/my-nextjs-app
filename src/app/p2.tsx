
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";

type Poem = {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

export default function Home2() {
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

  

  return (
    <main className="p-6 max-w-2xl mx-auto ">
      <center>
      
      </center>
      {poems.length > 0 && (
        <div
          className="relative border min-h-fit p-6 rounded shadow-xl bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: "url('/poem-bg.jpg')" }}
        >
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

          {/* Controls */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => {
                flipSound.play();
                setIndex((prev) => Math.max(prev - 1, -1));
              }}
              disabled={index === -1}
              className="bg-gray-500 px-4 py-1 rounded disabled:opacity-50"
            >
              ◀ Prev
            </button>
            <button
              onClick={() => {
                flipSound.play();
                setIndex((prev) => Math.min(prev + 1, poems.length));
              }}
              disabled={index === poems.length}
              className="bg-gray-500 px-4 py-1 rounded disabled:opacity-50"
            >
              Next ▶
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
