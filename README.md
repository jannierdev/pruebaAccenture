
# App To Do List
## Instalación

Descargamos el repositorio, instalamos dependencias y ejecutamos la app

```bash
  git clone https://github.com/jannierdev/pruebaAccenture.git
```
Entramos a la carpeta del proyecto e instalamos las dependencias

```bash
  cd pruebaAccenture && npm install
```
Ejecutamos la app

```bash
  ionic serve
```

## Generar apk android

Creamos la carpeta android
```bash
  cordova platform add android
```
Luego, construimos la app
```bash
  ionic serve
  cordova build android
```
