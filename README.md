# GYM 🏋️

App de gimnasio personal, simple y pensada para usar con una mano entre series. Hecha con **React Native (Expo) + TypeScript**. Sin cuentas ni internet: todo se guarda en el teléfono.

## Qué hace

- **Frase motivacional** distinta cada vez que abrís o recargás la app (nunca repite la anterior).
- **Inicio:** semana actual, el entreno que te toca hoy en una tarjeta grande, meta semanal y tus rutinas filtrables por grupo muscular.
- **Rutinas:** creás rutinas, elegís su **objetivo** (masa muscular, hipertrofia, quemar grasa o cardio, que ajusta series, reps y descanso), el **grupo muscular** (pecho, espalda, piernas, bíceps, tríceps, hombros, full body o cardio), qué días la hacés y agregás ejercicios con un toque.
- **Entrenando:** cronómetro grande, el ejercicio actual con kg y reps gigantes (botones − / +) y un botón **Serie hecha**. El descanso arranca solo, con aviso aunque bloquees el teléfono, y pasa al siguiente ejercicio cuando terminás uno. Cada serie se precarga con lo que hiciste la última vez.
- **Progreso:** gráfico de los últimos 7 días (volumen, series o minutos), récords personales y entrenos recientes.
- **Perfil:** tus datos (nombre, edad y peso; el peso se usa para estimar calorías), cargar rutinas de ejemplo o borrar todo.

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

## Fotos

Las fotos de fondo son de [Unsplash](https://unsplash.com) y se usan bajo la [licencia de Unsplash](https://unsplash.com/license) (uso libre y gratuito). Están dentro de la app (`assets/photos/`) para que funcione sin conexión. Fotos originales:

| Archivo | Foto en Unsplash |
| --- | --- |
| splash.jpg | https://unsplash.com/photos/photo-1526506118085-60ce8714f8c5 |
| pecho.jpg | https://unsplash.com/photos/photo-1583454110551-21f2fa2afe61 |
| espalda.jpg | https://unsplash.com/photos/photo-1541534741688-6078c6bfb5c5 |
| piernas.jpg | https://unsplash.com/photos/photo-1517836357463-d25dfeac3438 |
| hombros.jpg | https://unsplash.com/photos/photo-1550345332-09e3ac987658 |
| biceps.jpg | https://unsplash.com/photos/photo-1581009146145-b5ef050c2e1e |
| triceps.jpg | https://unsplash.com/photos/photo-1594737625785-a6cbdabd333c |
| fullbody.jpg | https://unsplash.com/photos/photo-1599058917212-d750089bc07e |
| cardio.jpg | https://unsplash.com/photos/photo-1571902943202-507ec2618e8f |
| gym.jpg | https://unsplash.com/photos/photo-1534438327276-14e5300c3a48 |
| rack.jpg | https://unsplash.com/photos/photo-1576678927484-cc907957088c |
| perfil.jpg | https://unsplash.com/photos/photo-1533681904393-9ab6eee7e408 |

Para cambiar una foto, reemplazá el archivo en `assets/photos/` con el mismo nombre.
