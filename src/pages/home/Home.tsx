import CircleIcon from '@mui/icons-material/Circle'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

const Home = (): JSX.Element => {
  return (
    <div>
      <Box maxWidth={320}>
        <ListItem component="div">
          <CircleIcon sx={{ mr: 2 }} fontSize="inherit" />
          <ListItemText primary="To do" />
        </ListItem>
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          {[1, 2, 3].map((number) => (
            <ListItem key={number} disablePadding>
              <Card sx={{ width: '100%' }}>
                <CardActionArea>
                  <CardContent>
                    <ListItemText primary="todo" secondary="0 of 3 tasks completed" />
                  </CardContent>
                </CardActionArea>
              </Card>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  )
}

export default Home
