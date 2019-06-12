import React from 'react'

export default function Robot(props) {
  const { encarat, rastre } = props
  return (
    <span className={`robot ${encarat} ${rastre ? 'rastre' : ''} `}>🤖</span>
  )
}
