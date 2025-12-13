import { treaty } from '@elysiajs/eden'
import type { app } from '../app/api/[[...slugs]]/route'

// Use the public Vercel URL in production, or localhost in dev
const domain = process.env.NEXT_PUBLIC_APP_URL || 
               (process.env.NODE_ENV === 'production' 
                 ? 'https://www.0trace.dev/' 
                 : 'localhost:3000'); // Eden treats 'localhost:3000' as http://localhost:3000

export const client = treaty<app>(domain).api