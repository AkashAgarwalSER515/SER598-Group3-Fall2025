import React from 'react'
import { Card, CardContent, Typography, CardActions } from '@mui/material'

export default function PerfCard({title, content, footer}){
  return (
    <Card sx={{my:2}}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" sx={{whiteSpace:'pre-wrap'}}>{content}</Typography>
      </CardContent>
      {footer && (
        <CardActions>
          <Typography variant="caption" sx={{mr:2}}>{footer}</Typography>
        </CardActions>
      )}
    </Card>
  )
}
