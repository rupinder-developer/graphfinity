import * as EVENT from '@/core/constants/event';

// Extract all the values from constants.ts
type ConstantValues = (typeof EVENT)[keyof typeof EVENT];
