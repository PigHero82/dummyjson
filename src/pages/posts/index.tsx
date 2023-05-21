// Component
import { Input, Layout } from "@/components"
import { Follow, PostList } from "@/components/posts"

// Third-Party Library
import { motion } from "framer-motion"

// View Model
import { useProfile } from "@/viewModel/posts"

export default function Posts() {
  // Hooks
  const { isLoading, profile } = useProfile()

  const Profile = (): JSX.Element => {
    if (isLoading && !profile) {
      return (
        <div className="animate-pulse">
          <div className="border-2">
            <div className="relative h-60">
              <div className="bg-slate-200 h-1/2" />
              <div className="absolute inset-0 bg-white w-36 h-36 mx-auto my-auto aspect-square rounded-full" />
              <div className="absolute inset-0 bg-slate-200 w-32 h-32 mx-auto my-auto aspect-square rounded-full" />
            </div>

            <section className="-mt-8 prose text-center">
              <div className="h-6 w-28 mx-auto mb-2 bg-slate-200 rounded" />
              <div className="h-4 w-56 mx-auto mb-2 bg-slate-200 rounded" />

              <Follow isLoading />
              <Follow isLoading />

              <div className="h-6 w-28 mx-auto my-3 bg-slate-200 rounded" />
            </section>
          </div>
        </div>
      )
    } else {
      return (
        <div className="border-2">
          <div className="relative h-60">
            <div className="bg-primary h-1/2" />

            <section>
              <div className="absolute inset-0 bg-white w-36 h-36 mx-auto my-auto aspect-square rounded-full" />
              <img src={profile?.image} alt="Post" className="absolute inset-0 w-32 h-32 mx-auto my-auto aspect-square object-cover rounded-full" />
            </section>
          </div>

          <section className="-mt-8 w-full prose text-center">
            <h2 className="m-0">{profile?.firstName} {profile?.lastName}</h2>
            <p>{profile?.university}</p>

            <Follow label="Following" value={profile?.following} />
            <Follow label="Followers" value={profile?.followers} />

            <button type="button" className="btn btn-link">View Profile</button>
          </section>
        </div>
      )
    }
  }

  const ImagePost = (): JSX.Element => {
    if (isLoading && !profile) {
      return (
        <div className="animate-pulse">
          <div className="bg-slate-200 w-14 h-14 aspect-square rounded-full" />
        </div>
      )
    } else {
      return (
        <img src={profile?.image} alt="Post" className="w-14 h-14 aspect-square object-cover rounded-full" />
      )
    }
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <div className="flex gap-x-3">
            <div className="shrink-0 hidden md:block w-64">
              <Profile />
            </div>
            
            <div className="w-full">
              <section className="mb-3 border-2 border-t-4 border-t-primary p-3">
                <div className="flex items-center gap-x-5">
                  <ImagePost />

                  <div className="w-full">
                    <Input type="textarea" className="border-0 focus:outline-0 p-0" placeholder="Share what's on your mind..." />
                  </div>
                </div>
              </section>

              <PostList />
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  )
}