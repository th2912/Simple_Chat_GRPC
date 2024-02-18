import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { ChatRoom } from './modules/ChatRoom/containers';
import { BrowserRouter as Router, Routes, Switch } from 'react-router-dom';
import { appRoutes } from './routes';
import PrivateRoute from './common/appRoutes/PrivateRoute';
import PublicRoute from './common/appRoutes/PublicRoute';
import { Context } from './common/context/Context';

function App() {
  const [user, setUser] = useState(localStorage.getItem('user') || '');

  const privateRoutes = [];
  const publicRoutes = [];
  for (const route of appRoutes) {
    if (route.private) {
      privateRoutes.push(route);
    } else {
      publicRoutes.push(route);
    }
  }
  return (
    <ChakraProvider
      theme={theme}
      toastOptions={{
        defaultOptions: { position: 'bottom', isClosable: true },
      }}
    >
      <Context.Provider value={[user, setUser]}>
        <Box fontSize="xl">
          <Grid minH="100vh" p={3} align="center" justify="center">
            <ColorModeSwitcher justifySelf="flex-end" />
            {/* <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>
              Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
          </VStack> */}
            <Router>
              <Switch>
                <>
                  {privateRoutes.map(route => (
                    <PrivateRoute
                      key={route.key}
                      path={route.path}
                      component={route.component}
                      exact
                    />
                  ))}
                  {publicRoutes.map(route => (
                    <PublicRoute
                      key={route.key}
                      path={route.path}
                      component={route.component}
                      exact
                    />
                  ))}
                </>
              </Switch>
            </Router>
          </Grid>
        </Box>
      </Context.Provider>
    </ChakraProvider>
  );
}

export default App;
