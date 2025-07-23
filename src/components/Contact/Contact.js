import { contact, about } from '../../portfolio'
import './Contact.css'

const Contact = () => {
  if (!contact.email) return null

  return (
    <section className='section contact center' id='contact'>
      <p className='contact__text'>
        You can reach me on{' '}
        <a 
          href={about.social?.linkedin} 
          className='contact__link'
          target='_blank'
          rel='noopener noreferrer'
        >
          LinkedIn
        </a>
        , or email me at{' '}
        <a 
          href={`mailto:${contact.email}`} 
          className='contact__link'
        >
          {contact.email}
        </a>
        .
      </p>
    </section>
  )
}

export default Contact
