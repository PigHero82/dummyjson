// React
import { memo } from "react"

// View Model
import { usePost } from "@/viewModel/posts"
import { Chatbox } from "react-ionicons"

export const PostList = memo(function PostList(): JSX.Element {
  // Hooks
  const { isLoading, isRefetching, nextPost, post, fetchNextPost } = usePost()

  if (isLoading && post.length === 0) {
    return (
      <div className="flex flex-col gap-y-3">
        <div className="animate-pulse">
          {([...Array(3)]).map((_, index) => (
            <div key={index} className="border-2 p-3">
              <div className="h-4 w-32 mb-2 bg-slate-200 rounded" />
              <div className="h-4 w-56 mb-2 bg-slate-200 rounded" />
  
              <section className="mt-10">
                <div className="h-4 mb-2 bg-slate-200 rounded" />
                <div className="h-4 mb-2 bg-slate-200 rounded" />
                <div className="h-4 mb-2 bg-slate-200 rounded" />
                <div className="h-4 w-56 mb-2 bg-slate-200 rounded" />
              </section>
  
              <section className="border-t-2 pt-3">
                <div className="h-4 w-28 bg-slate-200 rounded" />
              </section>
            </div>
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col gap-y-3 mb-3">
        {post.map((val, index) => (
          <div key={index} className="border-2 p-3">
            <div className="font-bold">User: {val.userId}</div>

            <section className="prose">
              <h4>{val.title}</h4>
              <p>{val.body}</p>
            </section>

            <hr className="my-2" />

            <section className=" flex items-end gap-x-1">
              <span><Chatbox /></span> Reaction {val.reactions}
            </section>
          </div>
        ))}

        {nextPost && (
          <div className="text-center">
            <button type="button" className={`btn btn-primary ${isRefetching && "loading"}`} onClick={fetchNextPost}>Load More</button>
          </div>
        )}
      </div>
    )
  }
})