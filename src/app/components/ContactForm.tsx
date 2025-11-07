import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useState, useRef } from 'react';
import * as React from 'react';
import emailjs from '@emailjs/browser';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState({ message: '', isError: false });
  const [isLoading, setIsLoading] = useState(false);
  const RATE_LIMIT_MS = 180000; // 3 minute cooldown between submissions

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || isLoading) return;

    // Check rate limiting
    const lastSubmitTime = localStorage.getItem('lastContactSubmit');
    if (lastSubmitTime) {
      const timeSinceLastSubmit = Date.now() - parseInt(lastSubmitTime);
      if (timeSinceLastSubmit < RATE_LIMIT_MS) {
        setStatus({
          message: 'You just sent a message. Please wait a bit before sending another one.',
          isError: true,
        });
        return;
      }
    }

    const template = {
      name: (formRef.current.elements.namedItem('name') as HTMLInputElement).value,
      email: (formRef.current.elements.namedItem('email') as HTMLInputElement).value,
      message: (formRef.current.elements.namedItem('message') as HTMLInputElement).value,
    };

    setIsLoading(true);
    setStatus({ message: 'Sending your message...', isError: false });

    emailjs.send('service_tgyqckj', 'template_cqxleva', template, 'WCSPkyN9UqtcCZauc').then(
      (result) => {
        console.log(result);
        setStatus({ message: 'Message sent successfully!', isError: false });
        setIsLoading(false);
        localStorage.setItem('lastContactSubmit', Date.now().toString());

        // Clear the form
        if (formRef.current) {
          formRef.current.reset();
        }
      },
      (error) => {
        console.log(error);
        setStatus({ message: 'Failed to send message. Please try again.', isError: true });
        setIsLoading(false);
      },
    );
  };

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-input': { color: 'white' },
            '& .MuiInputLabel-root': { color: 'white', fontWeight: 'bold' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: '#3874cc' },
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="sm"
        style={{
          marginTop: '2rem',
          backgroundColor: 'var(--background)',
          padding: '2rem',
          borderRadius: '10px',
          color: 'white',
        }}
      >
        <form ref={formRef} onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextField fullWidth label="Name" name="name" required />
          </Box>
          <Box mb={3}>
            <TextField fullWidth label="Email" name="email" type="email" required />
          </Box>
          <Box mb={3}>
            <TextField fullWidth label="Message" name="message" multiline rows={4} required />
          </Box>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Submit'}
          </Button>
        </form>
        {status.message && (
          <Typography
            variant="body1"
            className="text-l m-2 text-center"
            style={{ color: status.isError ? 'red' : '#5bc782' }}
          >
            {status.message}
          </Typography>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default ContactForm;
