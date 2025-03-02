#!/bin/bash
 
if [[ $VERCEL_ENV == "production"  ]] ; then
  npm run vercel-build
else
  npm run vercel-build
fi