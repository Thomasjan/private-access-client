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
    primary: "#e0743f",
    secondary: "#03dac6",
    error: "#ff5722",
  },
};

const customLightTheme = {
  dark: false,
  colors: {
    background: "#eee",
    surface: "#15202b",
    primary: "#e0743f",
    secondary: "#00ccff",
    error: "#ffcc00",
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "customLightTheme",
    themes: {
      customDarkTheme,
      customLightTheme,
    },
  },
});