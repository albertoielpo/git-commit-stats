# Git commit stats

Count commit per user

## Requirements

node > 16

git

## Build

```
npm i && npm run build
```

## Command line usage

```
BASE_DIR=/home/user/<git-source-code> PROJECT_SUBFOLDERS=project1, subdir/project2 node dist/app.js
```

## Env file usage

Edit local.env file placed inside env folder then launch

```
node dist/app.js
```

## Output example

```
// NORMALIZE=true
[
  { name: 'bernicerussell', value: 50 },
  { name: 'geraldinocalabresi', value: 16 },
  { name: 'maximilianvogler', value: 15 },
  { name: 'noelinoavilesolivo', value: 9 },
]

// NORMALIZE=false

[
  { name: 'Bernice Russell', value: 49 },
  { name: 'Geraldino Calabresi', value: 16 },
  { name: 'Maximilian Vogler', value: 15 },
  { name: 'Noelino Aviles Olivo', value: 9 },
  { name: 'Bernice.Russell@gmail.com', value: 1 },
]
```
