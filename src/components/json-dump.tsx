"use client"

import dynamic from "next/dynamic"
import { ReactJsonViewProps } from "react-json-view"

const ReactJsonView = dynamic(() => import("react-json-view"), {
  ssr: false,
})

interface JsonDumpProps extends ReactJsonViewProps {}

export function JsonDump({ ...props }: JsonDumpProps) {
  return <ReactJsonView {...props} />
}
