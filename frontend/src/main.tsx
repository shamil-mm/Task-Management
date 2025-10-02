
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { persistor, store } from './store/store.ts'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'react-hot-toast'


createRoot(document.getElementById('root')!).render(
  
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster/>
      </PersistGate>
    </Provider>
  
)
