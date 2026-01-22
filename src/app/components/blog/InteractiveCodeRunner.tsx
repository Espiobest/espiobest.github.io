'use client';

import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface InteractiveCodeRunnerProps {
  title?: string;
  code: string;
  language?: string;
  initialVariables?: Record<string, string | number>;
  executeCode: (variables: Record<string, string | number>) => string;
  explanation?: string;
}

const InteractiveCodeRunner: React.FC<InteractiveCodeRunnerProps> = ({
  title = 'Interactive Code Demo',
  code,
  language = 'c',
  initialVariables = {},
  executeCode,
  explanation,
}) => {
  const [variables, setVariables] = useState(initialVariables);
  const [output, setOutput] = useState('');
  const [hasRun, setHasRun] = useState(false);

  const handleVariableChange = (key: string, value: string) => {
    setVariables((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRun = () => {
    try {
      const result = executeCode(variables);
      setOutput(result);
      setHasRun(true);
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setHasRun(true);
    }
  };

  return (
    <Box
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        marginTop: '2rem',
        marginBottom: '2rem',
      }}
    >
      <Typography
        variant="h6"
        style={{ marginBottom: '1rem', color: '#60a5fa', fontWeight: 600 }}
      >
        {title}
      </Typography>

      {explanation && (
        <Typography
          variant="body2"
          style={{ marginBottom: '1rem', color: '#bdbdbd', fontStyle: 'italic' }}
        >
          {explanation}
        </Typography>
      )}

      {/* Code Display */}
      <Box
        component="pre"
        style={{
          backgroundColor: 'rgb(28, 28, 34)',
          padding: '1rem',
          borderRadius: '0.5rem',
          overflow: 'auto',
          marginBottom: '1rem',
        }}
      >
        <code
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.9rem',
            color: '#e5e7eb',
          }}
        >
          {code}
        </code>
      </Box>

      {/* Variable Controls */}
      {Object.keys(initialVariables).length > 0 && (
        <Box style={{ marginBottom: '1rem' }}>
          <Typography
            variant="subtitle2"
            style={{ marginBottom: '0.5rem', color: '#60a5fa' }}
          >
            Modify Variables:
          </Typography>
          <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {Object.entries(initialVariables).map(([key, defaultValue]) => (
              <TextField
                key={key}
                label={key}
                variant="outlined"
                size="small"
                defaultValue={defaultValue}
                onChange={(e) => handleVariableChange(key, e.target.value)}
                style={{ minWidth: '200px' }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#e5e7eb',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#0070f3',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#bdbdbd',
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Run Button */}
      <Button
        variant="contained"
        startIcon={<PlayArrowIcon />}
        onClick={handleRun}
        style={{
          backgroundColor: '#0070f3',
          color: 'white',
          textTransform: 'none',
          marginBottom: '1rem',
        }}
      >
        Run Code
      </Button>

      {/* Output Display */}
      {hasRun && (
        <Box>
          <Typography
            variant="subtitle2"
            style={{ marginBottom: '0.5rem', color: '#60a5fa' }}
          >
            Output:
          </Typography>
          <Box
            component="pre"
            style={{
              backgroundColor: 'rgb(28, 28, 34)',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflow: 'auto',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <code
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '0.9rem',
                color: output.startsWith('Error') ? '#ff6b6b' : '#4ade80',
                whiteSpace: 'pre-wrap',
              }}
            >
              {output}
            </code>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default InteractiveCodeRunner;
