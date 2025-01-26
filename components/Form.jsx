import Link from "next/link"

const Form = ({
  type, post, setPost, submitting, SetSubmitting, handleSubmit,
}) => {
  return (
    <section className="w-full max-w-full flex justify-start items-start flex-col">
      <h1 className="mt-3 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-left">
        <span className="blue_gradient">{type} Post </span>
      </h1>
      <p className="mt-5 text-lg text-gray-600 sm:text-xl text-left max-w-md">
        {type} and share amazing prompts with the world, 
        and let your imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full mx-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-inter font-extrabold text-xl text-gray-700">
            Topic
          </span>
          {(type !== "Edit") ?
            <textarea 
            value={post.topic}
            onChange={(e) => setPost({ ...post,
              topic: e.target.value,
            })}
            placeholder="Prompt's Topic ..."
            required
            spellCheck="false"
            className="w-full resize-none flex rounded-lg h-12 mt-3 p-3 text-sm text-gray-800 outline-0"
          /> :
          <textarea 
            value={post.topic}
            onChange={() => {}}
            placeholder="Prompt's Topic ..."
            required
            spellCheck="false"
            className="w-full resize-none flex rounded-lg h-12 mt-3 p-3 text-sm text-black outline-0 bg-gray-200"
          />
          }
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea 
            value={post.prompt}
            onChange={(e) => setPost({ ...post,
              prompt: e.target.value,
            })}
            placeholder="Write your prompt here ..."
            required
            spellCheck="false"
            className="w-full resize-none flex rounded-lg h-[200px] mt-2 p-5 text-sm text-gray-500 outline-0"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}
            <span className="font-normal text-gray-500">(#product, #webdevelopment, #idea)</span>
          </span>
          <textarea 
            value={post.tag}
            onChange={(e) => setPost({ ...post,
              tag: e.target.value,
            })}
            placeholder="#tag"
            required
            spellCheck="false"
            className="w-full resize-none flex rounded-lg h-12 mt-2 p-3 text-sm text-gray-500 outline-0"
          />
        </label>

        <div className="flex justify-end items-end mx-3 mb-5 gap-4">
            <Link href="/" className="py-1.5 text-sm text-gray-500">
              Cancel
            </Link>
            <button type="submit"
              disabled={submitting}
              className="px-5 py-1.5 text-sm bg-primary-orange rounded-full border border-primary-orange hover:bg-transparent hover:text-primary-orange transition-all hover:font-bold text-white drop-shadow-md"
            >
              {submitting ? ((type === "Create") ? "Creating..." : "Saving..."): type}
            </button>
        </div>
      </form>
    </section>
  )
}

export default Form