# GYM 🏋️

App de gimnasio personal, simple y pensada para usar con una mano entre series. Hecha con **React Native (Expo) + TypeScript**. Sin cuentas ni internet: todo se guarda en el teléfono.

## Qué hace

- **Frase motivacional** distinta cada vez que abrís o recargás la app (nunca repite la anterior).
- **Inicio:** semana actual, el entreno que te toca hoy en una tarjeta grande, meta semanal y tus rutinas filtrables por grupo muscular.
- **Rutinas:** creás rutinas (ej. "Pecho y tríceps"), elegís qué días de la semana las hacés y agregás ejercicios con un toque.
- **Entrenando:** cronómetro grande, el ejercicio actual con kg y reps gigantes (botones − / +) y un botón **Serie hecha**. El descanso arranca solo, con aviso aunque bloquees el teléfono, y pasa al siguiente ejercicio cuando terminás uno. Cada serie se precarga con lo que hiciste la última vez.
- **Progreso:** gráfico de los últimos 7 días (volumen, series o minutos), récords personales y entrenos recientes.
- **Perfil:** tu nombre para el saludo, cargar rutinas de ejemplo o borrar todo.

## Cómo correrla

Requisitos: Node.js 20 o superior y la app **Expo Go** en el teléfono.

```bash
git clone https://github.com/abogadamaricelrosales-ops/gym-app.git
cd gym-app
npm install
npx expo start
```

Escaneá el QR con la cámara (iPhone) o con Expo Go (Android). En la compu: `npx expo start --web` y abrí http://localhost:8081.

## Stack

Expo · TypeScript · React Navigation · Zustand + Immer · NativeWind v4 · AsyncStorage · expo-notifications · react-native-svg.

## Estructura

```
src/
  app/          navegación (tabs con barra flotante + pantallas completas)
  screens/      Inicio, Rutinas, Editor, Entrenando, Progreso, Perfil
  components/   barra flotante, semana, stepper, anillo, frase de inicio, ui/
  store/        Zustand persistido: rutinas, entrenos, ajustes
  constants/    colores, ejercicios sugeridos, frases
  utils/ hooks/ services/ types/
```

Los colores están en `tailwind.config.js` (`ink`, `card`, `lime`…) y las frases en `src/constants/quotes.ts`.
