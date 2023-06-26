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
    primary: "#EB6F2A",
    secondary: "#03dac6",
    error: "#ff5722",
  },
};

const customLightTheme = {
  dark: false,
  colors: {
    background: "#eee",
    surface: "#15202b",
    primary: "#EB6F2A",
    secondary: "#00ccff",
    error: "#ff0000",
  },
};

export default createVuetify({
  theme: {
    defaultTheme: 'customDarkTheme',
    themes: {
      customLightTheme,
      customDarkTheme,
    },
  },
});