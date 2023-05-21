// React
import { useEffect, useState } from "react"

// API
import { api } from "@/services"

// Type
import { PostType } from "./PostType"

export function usePost() {
  // Hooks
  const [isLoading, setLoading] = useState(false)
  const [isRefetching, setRefetching] = useState(false)
  const [nextPost, setNextPost] = useState<number | null>(null)
  const [post, setPost] = useState<PostType[]>([])

  const getPost = (value: PostType[]) => {
    setPost(value)

    if (value.length > 0) {
      localStorage.setItem('posts-post', JSON.stringify(value))
    } else {
      localStorage.removeItem('posts-post')
    }
  }

  const getNextPost = (value: PostType[]) => {
    // Variables
    const data: PostType[] = [...post]

    data.push(...value)

    setPost(data)
    localStorage.setItem('posts-post', JSON.stringify(data))
  }

  useEffect(() => {
    setLoading(true)

    const promise = new Promise(resolve => {
      // @ts-ignore
      setPost(JSON.parse(localStorage.getItem("posts-post")))
      setTimeout(() => {
        resolve('done')
      }, 100)
    })

    promise.then(() => {
      api.get("/posts", {
        params: {
          limit: 20,
          skip: 0
        }
      }).then(res => {
        // Variables
        const data: PostType[] = res.data.posts
        const page: {
          total: number
          skip: number
          limit: number
        } = res.data
        const resNext: number = (page.skip + page.limit) 

        getPost(data)
        setNextPost(resNext >= page.total ? null : resNext)
      }).catch(() => {
        getPost([])
      }).finally(() => {
        setLoading(false)
      })
    })

  }, [])

  const fetchNextPost = () => {
    setRefetching(true)

    api.get("/posts", {
      params: {
        limit: 20,
        skip: nextPost
      }
    }).then(res => {
      const data: PostType[] = res.data.posts
      const page: {
        total: number
        skip: number
        limit: number
      } = res.data
      const resNext: number = (page.skip + page.limit)

      getNextPost(data)
      setNextPost(resNext >= page.total ? null : resNext)
    }).catch(() => {
      getPost([])
    }).finally(() => {
      setRefetching(false)
    })
  }

  return { isLoading, isRefetching, nextPost, post, fetchNextPost }
}