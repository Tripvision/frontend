import React, { useState, createContext, useMemo } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import App from "../App";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function ToggleColorMode() {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  // const black = {
  //   main : '#1C1C1C',
  //   eightyPercent :  'rgba(0, 0, 0, 0.8)',
  //   fortyPercent : 'rgba(0,0,0,0.4)',
  //   twentyPercent : 'rgba(0, 0, 0, 0.2)',
  //   tenPercent : 'rgba(0, 0, 0, 0.1);',
  //   fivePercent : 'rgba(0, 0, 0, 0.05)',
  // }
  // const white = {
  //   main : '#FFFFFF',
  //   eightPercent : 'rgba(255, 255, 255, 0.8)',
  //   fortyPercent : 'rgba(255, 255, 255, 0.4)',
  //   twentyPercent : 'rgba(255, 255, 255, 0.2)',
  //   tenPercent : 'rgba(255, 255, 255, 0.1)',
  //   fivePercent : 'rgba(255, 255, 255, 0.05)',
  // }

  // const primary = {
  //   light : ' #F7F9FB',
  //   blue : '#E3F5FF',
  //   purple : '#E5ECF6',
  //   purpleFiftyPercent : 'rgba(229, 236, 246, 0.5)',
  //   // figma color name : #333
  //   blur : ' #333333',
  //   fivePercent : '#1C1C1C',
  // }

  // const secondary = {
  //   purpleA : '#95A4FC',
  //   purpleB : '#C6C7F8',
  //   blueA : '#A8C5DA',
  //   blueB : '#B1E3FF',
  //   greenA : '#A1E3CB',
  //   greenB : '#BAEDBD',
  //   yellow : '#FFE999',
  //   red : '#FF4747',
  // }

  // const layerShadow = {
  //   main : '#FFFFFF',
  // }

  // figma Foundations Typography
  // 컬러는 다크모드 때문에 적용하지 않습니다.
  //
  const typography = {
    h1: {
      [`@media screen and (min-width: ${600}px)`]: {
        // 컬러는 다크모드 때문에 깨질 수 있기 때문에 우선 적용하지 않습니다.
        fontWeight: 600,
        fontSize: 48,
        //lineHeight : 72
      },
      [`@media screen and (min-width: ${1200}px)`]: {
        // 컬러는 다크모드 때문에 깨질 수 있기 때문에 우선 적용하지 않습니다.
        fontWeight: 400,
        fontSize: 50,
        //lineHeight : 18
      },
    },
    h2: {
      [`@media screen and (min-width: ${600}px)`]: {
        // 컬러는 다크모드 때문에 깨질 수 있기 때문에 우선 적용하지 않습니다.
        fontWeight: 600,
        fontSize: 24,
        //lineHeight : 36
      },
      [`@media screen and (min-width: ${1200}px)`]: {
        // 컬러는 다크모드 때문에 깨질 수 있기 때문에 우선 적용하지 않습니다.
        fontWeight: 400,
        fontSize: 16,
        //lineHeight : 18
      },
    },
    h3: {
      [`@media screen and (min-width: ${600}px)`]: {
        // 컬러는 다크모드 때문에 깨질 수 있기 때문에 우선 적용하지 않습니다.
        fontWeight: 600,
        fontSize: 18,
        //lineHeight : 28
      },
      [`@media screen and (min-width: ${1200}px)`]: {
        // 컬러는 다크모드 때문에 깨질 수 있기 때문에 우선 적용하지 않습니다.
        fontWeight: 400,
        fontSize: 20,
        //lineHeight : 18
      },
    },
    // figma -> foundations -> Typography -> Body-Text -> 1번째 Semibold
    body1: {
      [`@media screen and (min-width: ${600}px)`]: {
        // 컬러는 다크모드 때문에 깨질 수 있기 때문에 우선 적용하지 않습니다.
        fontWeight: 600,
        fontSize: 14,
        //lineHeight : 20
      },
      [`@media screen and (min-width: ${1200}px)`]: {
        // 컬러는 다크모드 때문에 깨질 수 있기 때문에 우선 적용하지 않습니다.
        fontWeight: 400,
        fontSize: 16,
        //lineHeight : 18
      },
    },
    // figma -> foundations -> Typography -> Body-Text -> 2번째 Semibold
    body2: {
      [`@media screen and (min-width: ${600}px)`]: {
        // 컬러는 다크모드 때문에 깨질 수 있기 때문에 우선 적용하지 않습니다.
        fontWeight: 600,
        fontSize: 12,
        //lineHeight : 18
      },
      [`@media screen and (min-width: ${1200}px)`]: {
        // 컬러는 다크모드 때문에 깨질 수 있기 때문에 우선 적용하지 않습니다.
        fontWeight: 400,
        fontSize: 14,
        //lineHeight : 18
      },
    },

    // custom body Text Regular
    body1Regular: {
      [`@media screen and (min-width: ${600}px)`]: {
        // 컬러는 다크모드 때문에 깨질 수 있기 때문에 우선 적용하지 않습니다.
        fontWeight: 400,
        fontSize: 14,
        //lineHeight : 20
      },
      [`@media screen and (min-width: ${1200}px)`]: {
        // 컬러는 다크모드 때문에 깨질 수 있기 때문에 우선 적용하지 않습니다.
        fontWeight: 400,
        fontSize: 16,
        //lineHeight : 18
      },
    },
    // custom body Text Regular
    body2Regular: {
      [`@media screen and (min-width: ${600}px)`]: {
        // 컬러는 다크모드 때문에 깨질 수 있기 때문에 우선 적용하지 않습니다.
        fontWeight: 400,
        fontSize: 12,
        //lineHeight : 18
      },
      [`@media screen and (min-width: ${1200}px)`]: {
        // 컬러는 다크모드 때문에 깨질 수 있기 때문에 우선 적용하지 않습니다.
        fontWeight: 400,
        fontSize: 14,
        //lineHeight : 18
      },
    },
  };

  const theme = useMemo(
    () =>
      createTheme({
        // typography custom
        typography,

        // color custom
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // palette values for light mode
                background: {
                  main: "#fff",
                },
                lightDarkText: {
                  main: "rgba(0, 0, 0, 0.4)",
                },
              }
            : // palette values for dark mode
              {
                background: {
                  main: "#121212",
                },
                lightDarkText: {
                  main: "rgba(255, 255, 255, 0.4)",
                },
              }),
        },
      }),
    [mode, typography]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <App />
        </CssBaseline>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
