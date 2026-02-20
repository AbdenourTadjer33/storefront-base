"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"
import { useQueryParams } from "@lib/hooks/use-query-params"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const { queryParams } = useQueryParams()
  const [currentView, setCurrentView] = useState(() => {
    if (queryParams.has("register") && queryParams.get("register") == "1") {
      return "register"
    }

    return "sign-in"
  })

  return (
    <div className="w-full flex justify-start px-8 py-8">
      {currentView === "sign-in" ? (
        <Login setCurrentView={setCurrentView} />
      ) : (
        <Register setCurrentView={setCurrentView} />
      )}
    </div>
  )
}

export default LoginTemplate
