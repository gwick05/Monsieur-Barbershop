import { createContext, useCallback, useContext, useReducer } from 'react';
import { useCreateAppointment } from '../features/prenotazioni/useCreateAppointment';
import { useUser } from '../features/authentication/useUser';

const PrenotazioneContext = createContext();
const initialState = {
  selectedBarber: null,
  selectedServizio: null,
  date: null,
  selectedSlot: null,
  selectedSede: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'prenotazioni/selectBarber':
      return { ...state, selectedBarber: action.payload };
    case 'prenotazioni/selectDate':
      return {
        ...state,
        date: action.payload,
      };
    case 'prenotazioni/selectSlot':
      return { ...state, selectedSlot: action.payload };
    case 'prenotazioni/selectServizio':
      return { ...state, selectedServizio: action.payload };
    case 'prenotazioni/resetState':
      return { ...initialState };
    case 'prenotazioni/selectSede':
      return { ...state, selectedSede: action.payload };
    case 'prenotazioni/resetSede':
      return { ...initialState, selectedSede: action.payload };
    case 'prenotazioni/catchError':
      return {
        ...initialState,
        error: 'Impossibile continuare con la prenotazione',
      };
    default:
      throw new Error('Azione non riconosciuta');
  }
}

function PrenotazioneContextProvider({ children }) {
  const [
    {
      selectedBarber,
      selectedSede,
      selectedServizio,
      date,
      selectedSlot,
      error: errorPrenotazione,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { user } = useUser();
  //Resets the state
  const resetState = useCallback(function resetState() {
    dispatch({ type: 'prenotazioni/resetState' });
  }, []);
  const { createAppointment, isPending: isBooking } =
    useCreateAppointment(resetState);

  function bookAppointment() {
    const newAppointment = {
      data: date.startDate,
      orarioInizio: selectedSlot.inizio,
      orarioFine: selectedSlot.fine,
      id_client: user.id,
      id_servizio: selectedServizio.id,
      id_barber: selectedBarber,
      id_sede: selectedSede.id,
    };
    createAppointment(newAppointment);
  }

  function selectBarber(id) {
    dispatch({ type: 'prenotazioni/selectBarber', payload: id });
  }

  const catchError = useCallback(function () {
    dispatch({ type: 'prenotazioni/catchError' });
  }, []);

  const selectDate = function (newDate) {
    if (!newDate.startDate) return;
    dispatch({
      type: 'prenotazioni/selectDate',
      payload: newDate,
    });
  };

  function selectSlot(slot) {
    const [hours, minutes] = slot.split(':');
    const oraInizio = new Date();
    oraInizio.setHours(hours, minutes, 0, 0);
    const oraFine = new Date(oraInizio);
    oraFine.setMinutes(oraInizio.getMinutes() + selectedServizio.durata);

    dispatch({
      type: 'prenotazioni/selectSlot',
      payload: {
        inizio:
          `${oraInizio.getHours()}`.padStart(2, '0') +
          ':' +
          `${oraInizio.getMinutes()}`.padStart(2, '0'),
        fine:
          `${oraFine.getHours()}`.padStart(2, '0') +
          ':' +
          `${oraFine.getMinutes()}`.padStart(2, '0'),
      },
    });
  }
  function selectServizio(servizio) {
    dispatch({ type: 'prenotazioni/selectServizio', payload: servizio });
  }
  function selectSede(sede) {
    selectedSede
      ? dispatch({ type: 'prenotazioni/resetSede', payload: sede })
      : dispatch({ type: 'prenotazioni/selectSede', payload: sede });
  }
  return (
    <PrenotazioneContext.Provider
      value={{
        catchError,
        resetState,
        selectedBarber,
        selectedServizio,
        selectedSlot,
        date,
        bookAppointment,
        selectBarber,
        selectDate,
        selectServizio,
        selectSlot,
        selectSede,
        selectedSede,
        errorPrenotazione,
        isBooking,
      }}
    >
      {children}
    </PrenotazioneContext.Provider>
  );
}

function usePrenotazioneContext() {
  const context = useContext(PrenotazioneContext);
  if (context === undefined)
    throw new Error('Il context si trova al di fuori del provider');
  return context;
}

export { PrenotazioneContextProvider, usePrenotazioneContext };
