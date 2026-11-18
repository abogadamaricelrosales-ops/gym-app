# GYM 🏋️

App de fitness personal hecha con **React Native (Expo) + TypeScript**. Sin backend ni login: todo se guarda en el teléfono.

## Qué hace

- **Hoy:** te recomienda qué entrenar según tu rutina activa y tu fatiga muscular. Si hiciste fútbol, pádel, running, etc., registralo con "+ Registrar" y la app ajusta el día (cambio de día, deload con -20% de series o descanso).
- **Rutinas:** crear y editar rutinas por días (Push/Pull/Legs, etc.), con series, reps y descanso por ejercicio. Hay un PPL de ejemplo para cargar con un toque.
- **Entrenar:** registra peso y reps de cada serie. Al marcar ✓ arranca solo el descanso y se programa una notificación, así que funciona aunque la app quede en segundo plano. Cada serie se precarga con lo que hiciste la última vez y te sugiere la próxima carga (sobrecarga progresiva). En los básicos hay una guía animada de la técnica.
- **Historial:** entrenamientos pasados, y por ejercicio el 1RM estimado, gráfico y aviso de si estás progresando, estancado o bajando.
- **Librería:** rutinas profesionales filtrables (fuerza, hipertrofia, pérdida de grasa, funcional...) que se copian a tus rutinas con un toque.

## Cómo correrla

Requisitos: Node.js 20 o superior y la app **Expo Go** en tu teléfono.

```bash
git clone https://github.com/abogadamaricelrosales-ops/gym-app.git
cd gym-app
npm install
npx expo start
```

Escaneá el código QR con la cámara (iPhone) o con Expo Go (Android). Para probar en el navegador: `npx expo start --web`.

> Las notificaciones del descanso necesitan un teléfono real (no funcionan en el navegador). Si Expo Go te avisa de alguna limitación, podés generar una build de desarrollo con `npx expo run:android` o `npx expo run:ios`.

## Comandos útiles

| Comando | Para qué |
| --- | --- |
| `npx expo start` | Servidor de desarrollo |
| `npx tsc --noEmit` | Chequeo de tipos |
| `npx expo export --platform android` | Verifica que el bundle compila |

## Stack

Expo (managed) · TypeScript · React Navigation (tabs + stacks) · Zustand + Immer · NativeWind v4 (Tailwind) · AsyncStorage · expo-notifications · react-native-svg + Reanimated · react-native-gifted-charts.

## Estructura

```
src/
  app/          navegación (RootNavigator, stacks, tipos de rutas)
  screens/      pantallas por funcionalidad (home, routines, workout, history, templates)
  components/   ui/ (Button, Card, Input, Chip), workout/ (SetRow, RestTimerBar), visual/ (guía animada)
  store/        stores de Zustand persistidos (rutinas, entrenamiento + historial, readiness)
  services/     notificaciones y motor de recomendación
  hooks/        useRestTimer, useTodayRecommendation
  data/         catálogo de rutinas profesionales y poses de ejercicios (JSON)
  types/        modelos de dominio
  utils/        cálculos de progreso, fatiga, calorías, ids
  constants/    tema, actividades y configuración de readiness
```

## Ajustes

Los umbrales de fatiga, la vida media (36 h) y el factor de deload están en `src/constants/activities.ts` (`READINESS_CONFIG`). Tu peso corporal para el cálculo de calorías se cambia en la pantalla **Hoy**.

Todos los datos viven en el almacenamiento local del dispositivo. Si desinstalás la app, se borran.
