import { useState, useEffect, useRef } from 'react';

export const useUser = () => {
  const [state, setState] = useState({});

  useEffect(() => {}, []);

  return [state, setState];
};
