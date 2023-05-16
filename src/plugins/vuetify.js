// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

const customDarkTheme = {
  dark: true,
  colors: {
    background: "#15202b",
    surface: "#15202b",
    primary: "#3f51b5",
    secondary: "#03dac6",
    error: "#ff5722",
  },
};

const customLightTheme = {
  dark: false,
  colors: {
    background: "#eee",
    surface: "#15202b",
    primary: "#3f51b5",
    secondary: "#00ccff",
    error: "#ffcc00",
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      customDarkTheme,
      customLightTheme,
    },
  },
});