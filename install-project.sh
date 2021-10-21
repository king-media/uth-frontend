yarn install &
# App level install
yarn --cwd app-packages/react-app install &
yarn --cwd app-packages/vue-app install &
yarn --cwd app-packages/angular-app install &
yarn --cwd app-packages/svelte-app install &
yarn --cwd app-packages/solid-app install
wait
jobs
