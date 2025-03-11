'use client';

import { Container, Typography } from '@mui/material';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <Container>
      <Typography variant="h4" color="primary" style={{ textAlign: 'center' }} gutterBottom>
        Contact Me
      </Typography>
      <ContactForm></ContactForm>
    </Container>
  );
};

export default Contact;
