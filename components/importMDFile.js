import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import Markdown from 'markdown-to-jsx'

export default function ImportMDFile(props) {
  const [content, setContent] = useState('')
  const [filename, setFilename] = useState('')

  useEffect(() => {
    async function updateContentFromFileName(fileName) {
      const res = await fetch(`static/${fileName}`)
      const filename = fileName
      const content = await res.text()
      setContent(content)
      setFilename(filename)
    }
    updateContentFromFileName(props.file)
  }, [props.file])

  return (
    <React.Fragment>
      {filename.includes('.html') ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <Markdown>{content}</Markdown>
      )}
    </React.Fragment>
  )
}
