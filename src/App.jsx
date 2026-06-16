import React, { useEffect, useState } from "react";

function App() {
  const [Title, setTitle] = useState("");
  const [Details, setDetails] = useState("");

  const [Task, setTask] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("notes_app_tasks");
      if (raw) setTask(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("notes_app_tasks", JSON.stringify(Task));
    } catch (e) {
      // ignore
    }
  }, [Task]);

  const submitHandle = (e) => {
    e.preventDefault();
    const copyTask = [...Task];
    copyTask.push({ Title, Details });
    setTask(copyTask);

    console.log(copyTask);

    setTitle("");
    setDetails("");
  };

  const deleteNote = (idx) => {
    const copyTask = [...Task];
    copyTask.splice(idx, 1);
    setTask(copyTask);
  };

  return (
    <div className="min-h-screen from-slate-900 via-slate-800 to-slate-900 text-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">Notes</h1>
          <p className="text-sm text-slate-400">
            Quickly capture ideas and todos
          </p>
        </header>

        <form
          onSubmit={(e) => submitHandle(e)}
          className="bg-slate-800/60 backdrop-blur-md p-4 rounded-lg shadow-sm mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              className="md:col-span-1 border border-slate-700 rounded px-4 py-2 bg-slate-900 text-slate-100 placeholder:text-slate-500 w-full"
              type="text"
              placeholder="Title"
              value={Title}
              maxLength={60}
              required
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="md:col-span-3 border border-slate-700 rounded px-4 py-2 bg-slate-900 text-slate-100 placeholder:text-slate-500 w-full resize-none h-24"
              placeholder="Write details..."
              value={Details}
              maxLength={400}
              required
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="text-sm text-slate-400">{Details.length}/400</div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setTitle("");
                  setDetails("");
                }}
                className="px-4 py-2 rounded bg-transparent border border-slate-700 text-slate-300 hover:bg-slate-700/40"
              >
                Clear
              </button>

              <button className="px-4 py-2 rounded bg-amber-400 text-slate-900 font-medium shadow hover:brightness-95">
                Add Note
              </button>
            </div>
          </div>
        </form>

        {Task.length === 0 ? (
          <div className="text-center text-slate-400 p-12 rounded-lg bg-slate-800/50">
            No notes yet — add your first note using the form above.
          </div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Task.map(function (elem, idx) {
              return (
                <article
                  key={idx}
                  className="relative p-4 rounded-lg from-amber-300/20 to-rose-300/10 border border-slate-700 shadow-md hover:scale-[1.01] transition-transform"
                >
                  <h3 className="font-semibold text-lg text-amber-300">
                    {elem.Title}
                  </h3>
                  <p className="mt-2 text-slate-200 text-sm whitespace-pre-wrap">
                    {elem.Details}
                  </p>

                  <button
                    onClick={() => deleteNote(idx)}
                    className="absolute top-3 right-3 text-slate-300 bg-slate-700/30 hover:bg-slate-700/50 rounded px-2 py-1 text-sm"
                    aria-label={`Delete note ${elem.Title}`}
                  >
                    Delete
                  </button>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
