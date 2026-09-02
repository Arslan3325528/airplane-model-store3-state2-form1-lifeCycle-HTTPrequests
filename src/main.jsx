import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react'; //! Emotion Theme
import { theme } from '@/constants'; //! Emotion Theme

import './index.css';

//! Aбсолютний шлях + Реекспорт
import {
  App,
  AppColorBox,
  AppSearchDebounce, //! Пошук елементів + Debounce
  AppSearchDebounceTextBacklight, //! Пошук елементів + Debounce + Підсвічування тексту
  AppUncontrolledElementsForm, //! 4.4.1.Неконтрольовані елементи форм
  AppControlledElementsForm, //! 4.4.2.Контрольовані елементи форм
  AppComplexForms, //! 4.4.3.Складні форми

  AppHTTPRequestBasics, //! 6.1.Основи HTTP-запитів у React
  AppHTTPRequestAdvanced, //! 6.2.Архітектура компонентів та станів з HTTP-запитами
} from '@/components/App';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/airplane-model-store3-state2-form1-lifeCycle-HTTPrequests">
      <ThemeProvider theme={theme}>
        {/* <App /> */}
        {/* <AppColorBox />  */}
        {/* //! Debounce */}
        {/* <AppSearchDebounce /> */}
        {/* <AppSearchDebounceTextBacklight /> */}
        {/* //! Forms */}
        {/* <AppUncontrolledElementsForm onSubmit={values => console.log(values)} /> */}
        {/* <AppControlledElementsForm /> */}
        {/* <AppComplexForms onSubmit={values => console.log(values)} /> */}
        {/* //! Life Cycle*/}
        {/* <AppComplexForms /> */}
        {/* //! HTTPRequest */}
        {/* <AppHTTPRequestBasics /> */}
        <AppHTTPRequestAdvanced />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
