import React, { useState, useEffect } from 'react';

const TypewriterEffect = () => {
  const phrases = [
    "Building experiences",
    "Creating solutions",
    "Driven by excellence"
  ];

  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[phraseIndex];
      
      if (!isDeleting) {
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    };

    const speed = isDeleting ? 50 : 75;
    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [displayText, phraseIndex, isDeleting]);

  return (
    <div className="text-2xl font-bold text-center">
      <span style={{color: '#4B9EA3'}}>{displayText.split(" ")[0]} </span>{displayText.split(" ").slice(1).join(" ")}
      <span className="animate-pulse">|</span>
    </div>
  );
};

export default TypewriterEffect;