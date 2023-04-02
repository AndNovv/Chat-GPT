import React from 'react'

const InputPanel = () => {
  return (
    <form onSubmit={handleSubmit}>
        <input
        type="text"
        id="message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit">Submit</button>
    </form>
  )
}

export default InputPanel

