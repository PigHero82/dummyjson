// React
import { useEffect, useState } from "react"

// API
import { api } from "@/services"

// Type
import { ProfileType } from "./ProfileType"

export function useProfile() {
  // Hooks
  const [isLoading, setLoading] = useState(false)
  const [profile, setProfile] = useState<ProfileType | null>(null)

  const getProfile = (value: ProfileType | null) => {
    setProfile(value)

    if (value) {
      localStorage.setItem('posts-profile', JSON.stringify(value))
    } else {
      localStorage.removeItem('posts-profile')
    }
  }

  useEffect(() => {
    setLoading(true)

    const promise = new Promise(resolve => {
      // @ts-ignore
      setProfile(JSON.parse(localStorage.getItem("posts-profile")))
      setTimeout(() => {
        resolve('done')
      }, 100)
    })

    promise.then(() => {
      api.get("/users/1").then(res => {
        const data: ProfileType = res.data
  
        getProfile({
          firstName: data.firstName,
          lastName: data.lastName,
          image: data.image,
          followers: 53,
          following: 326,
          university: data.university
        })
      }).catch(() => {
        getProfile(null)
      }).finally(() => {
        setLoading(false)
      })
    })
  }, [])

  return { isLoading, profile }
}