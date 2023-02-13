import React, { useState, useRef }  from 'react';
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export const usePrevRoute = () => {
  const location = useLocation();
  const ref = useRef();
  const previousValue = ref.current
  React.useEffect(() => {
    ref.current = location.pathname;
  }, [location]);

  return previousValue;
};
