'use client';

import { Container, Typography } from '@mui/material';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  const getEmail = () => {
    const parts = ['ayushravichandran', 'gmail', 'com'];
    return `${parts[0]}@${parts[1]}.${parts[2]}`;
  };

  return (
    <Container>
      <Typography variant="h4" color="primary" style={{ textAlign: 'center' }} gutterBottom>
        Contact Me
      </Typography>
      <Typography variant="body1" style={{ textAlign: 'center', color: 'white' }}>
        Feel free to reach out via the form below or email me directly at{' '}
        <a
          href={`mailto:${getEmail()}`}
          style={{ color: '#3874cc', textDecoration: 'none' }}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `mailto:${getEmail()}`;
          }}
        >
          {getEmail()}
        </a>
      </Typography>
      <ContactForm></ContactForm>
    </Container>
  );
};

export default Contact;
