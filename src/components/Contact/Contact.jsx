import React, { useRef } from 'react'
import emailjs from '@emailjs/browser'
import './Contact.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import mail_icon from '../../assets/mail_icon.svg'
import location_icon from '../../assets/location_icon.svg'
import call_icon from '../../assets/call_icon.svg'

const Contact = () => {

  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault()
    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(
      () => {
        alert('Message sent successfully! ✅')
        e.target.reset()
      },
      (error) => {
        console.log(error)
        alert('Failed to send message ❌')
      }
    )
  }

  return (
    <div id='contactt' className='contact'>

      <div className="contact-title">
        <h1>Get in Touch</h1>
        <img src={theme_pattern} alt="" />
      </div>

      <div className="contact_section">

        <div className="contact_left">
          <h1>Lets Talk</h1>

          <p>
            I'm currently available to take on new projects, feel free to reach me
          </p>

          <div className="contact_details">

            <div className="contact_detail">
              <img src={mail_icon} alt="" />
              <p>sachingupta00134@gmail.com</p>
            </div>

            <div className="contact_detail">
              <img src={call_icon} alt="" />
              <p>+91 9913629460</p>
            </div>

            <div className="contact_detail">
              <img src={location_icon} alt="" />
              <p>Gujarat, India</p>
            </div>

          </div>
        </div>

        <form
          ref={form}
          className='contact_right'
          onSubmit={sendEmail}
        >

          <label>Your Name</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            name="name"
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            name="email"
            required
          />

          <label>Enter your Message</label>
          <textarea
            name="message"
            rows={5}
            placeholder="Enter your message"
            required
          ></textarea>

          <button
            className='contact_submit'
            type='submit'
          >
            Submit Now
          </button>

        </form>

      </div>
    </div>
  )
}

export default Contact