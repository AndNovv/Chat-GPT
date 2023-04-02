import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Message from '@/components/Message'

export default function Home() {

  const [message, setMessage] = useState('')
  const [waiting, setWaiting] = useState(false)
  const [dialog, setDialog] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!waiting) {
      setDialog([...dialog, {role: 'user', content: message}])
      let messages = [...dialog, {role: 'user', content: message}]
      setMessage('')
      setWaiting(true)
      // console.log("Starting proccessing " + message)

      axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.3
      }, {
        headers: {
          'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_API_KEY,
          'OpenAI-Organization': 'org-1VnMvKDACihBwcqGD0CWhGhe'
        }
      }
    ).then(function (response) {
      //console.log(response);
      console.log(response.data.choices[0].message.content)
      setDialog([...dialog, {role: 'user', content: message}, {role: 'assistant', content: response.data.choices[0].message.content}])
      setWaiting(false)
    })
    .catch(function (error) {
      // console.log(error);
      setDialog([...dialog, {role: 'user', content: message}, {role: 'assistant', content: 'Something went wrong'}])
      setWaiting(false)
    });

    }

  }

  useEffect(() => {
    let chatHistory = document.getElementById("messages")
    chatHistory.scrollTop = chatHistory.scrollHeight
  }, [dialog]);


  return (
    <>
      <div className={styles.content}>

        <div className={styles.messages} id='messages'>
          {dialog.map((mes, index) => <Message index={index} author={mes.role} message={mes.content}/>)}
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            id="message"
            placeholder='Ваш запрос...'
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button className={styles.submitbtn} type="submit">Отправить</button>
        </form>
      </div>
    </>
  )
}
