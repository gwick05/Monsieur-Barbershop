import { useEffect } from 'react';
import { useCheckDateAndTimeAvailability } from '../../hooks/useCheckDateAndTimeAvailability';
import { usePrenotazioneContext } from '../../context/PrenotazioneContext';
import { ONE_YEAR_FROM_NOW } from '../../utils/constants';
import Datepicker from 'react-tailwindcss-datepicker';

function DatepickerComponent() {
  const { selectDate, date, selectedSede, errorAlreadyTakenSlots, catchError } =
    usePrenotazioneContext();
  const { dateChiusura } = useCheckDateAndTimeAvailability(selectedSede);
  //Check if there's an error, in that case use the catchError function from the PrenotazioneContext which basically sets the state.error to true and by doing that the Prenota page is gonna show the error component
  useEffect(() => {
    if (errorAlreadyTakenSlots) {
      catchError();
    }
  }, [errorAlreadyTakenSlots, catchError]);

  if (errorAlreadyTakenSlots) {
    return null;
  } else {
    return (
      <>
        <h2 className="text-xl font-bold">Scegli la data desiderata</h2>
        <div className=" w-56    border-neutral-300 hover:border-neutral-700 ">
          <Datepicker
            value={date}
            onChange={selectDate}
            asSingle={true}
            useRange={false}
            readOnly={true}
            minDate={Date.now()}
            maxDate={ONE_YEAR_FROM_NOW}
            disabledDates={dateChiusura}
            startWeekOn="mon"
            i18n={'it'}
            inputClassName={
              'bg-neutral-50 w-full h-8 rounded-lg px-2 focus:outline-none border-2 border-neutral-300 focus:scale-105 hover:scale-105 transition-transform duration-200 dark:bg-neutral-700 dark:border-neutral-800 dark:text-neutral-50 '
            }
          />
        </div>
      </>
    );
  }
}

export default DatepickerComponent;
