'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const Picture = () => {
  return (
    <div className="flex items-center justify-center">
      <div style={{ position: 'relative', width: '200px', height: '200px' }}>
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, #0070f3, #ff00ff, #0070f3)',
            padding: '4 px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
            }}
          ></div>
        </motion.div>
        <div
          style={{
            position: 'absolute',
            top: '4px',
            left: '4px',
            width: '192px',
            height: '192px',
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        >
          <Image
            className="profile-img"
            src="/images/profile.jpg"
            alt="Profile Picture"
            width={194}
            height={194}
            quality={100}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Picture;
