'use client';

import React from 'react';
import InteractiveCodeRunner from './InteractiveCodeRunner';

const BufferOverflowDemo: React.FC = () => {
  const code = `int main() {
  char myBuffer[10]; // A buffer with an allocated size of 10 bytes
  int mySecretValue = 123;

  strcpy(myBuffer, "AAAAAAAAAAA"); // Copying 11 A's into our buffer

  printf("%s\\n", myBuffer);
  printf("%d", mySecretValue);
}`;

  const executeBufferOverflow = (variables: Record<string, string | number>) => {
    const input = String(variables.inputString || '');
    const bufferSize = Number(variables.bufferSize || 10);
    const secretValue = Number(variables.secretValue || 123);

    let output = '';

    // Simulate the buffer overflow
    if (input.length <= bufferSize) {
      // No overflow
      output += `✅ No overflow detected\n\n`;
      output += `Buffer contents: "${input}"\n`;
      output += `Secret value: ${secretValue}\n\n`;
      output += `Memory layout:\n`;
      output += `┌${'─'.repeat(bufferSize * 2)}┐\n`;
      output += `│ ${input.padEnd(bufferSize, ' ')} │ myBuffer[${bufferSize}]\n`;
      output += `└${'─'.repeat(bufferSize * 2)}┘\n`;
      output += `┌────┐\n`;
      output += `│${secretValue.toString().padEnd(4, ' ')}│ mySecretValue\n`;
      output += `└────┘`;
    } else {
      // Overflow occurs
      const overflow = input.length - bufferSize;
      output += `⚠️  BUFFER OVERFLOW DETECTED!\n\n`;
      output += `Input length: ${input.length} bytes\n`;
      output += `Buffer size: ${bufferSize} bytes\n`;
      output += `Overflow: ${overflow} bytes\n\n`;

      // Simulate memory corruption
      // In a real overflow, the extra bytes would overwrite adjacent memory
      const overflowData = input.slice(bufferSize);
      const corrupted = overflowData.split('').reduce((acc, char, idx) => {
        if (idx < 4) {
          // First 4 bytes corrupt the integer
          acc += char.charCodeAt(0);
        }
        return acc;
      }, 0);

      output += `Buffer contents: "${input.slice(0, bufferSize)}${input.slice(bufferSize)}"\n`;
      output += `Secret value corrupted: ${secretValue} → ${corrupted}\n\n`;
      output += `Memory layout:\n`;
      output += `┌${'─'.repeat(bufferSize * 2)}┐\n`;
      output += `│ ${input.slice(0, bufferSize)} │ myBuffer[${bufferSize}] ✓\n`;
      output += `└${'─'.repeat(bufferSize * 2)}┘\n`;
      output += `┌────┐\n`;
      output += `│${overflowData.slice(0, 4).padEnd(4, '?')}│ mySecretValue OVERWRITTEN!\n`;
      output += `└────┘\n\n`;
      output += `The overflow corrupted adjacent memory!\n`;
      output += `This is how attackers can hijack program execution.`;
    }

    return output;
  };

  return (
    <InteractiveCodeRunner
      title="Buffer Overflow Demo"
      code={code}
      language="c"
      initialVariables={{
        inputString: 'AAAAAAAAAAA',
        bufferSize: 10,
        secretValue: 123,
      }}
      executeCode={executeBufferOverflow}
      explanation="Try changing the input string length to see what happens when it exceeds the buffer size. Watch how it corrupts adjacent memory!"
    />
  );
};

export default BufferOverflowDemo;
