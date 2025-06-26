import { useDispatch } from 'react-redux';

import type { AppDispatch } from '../models/state.ts';

export const useAppDispatch = () => useDispatch<AppDispatch>();
