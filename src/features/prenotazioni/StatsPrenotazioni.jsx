import { usePrenotazioniPassate } from './usePrenotazioniPassate';
import PieChartComponent from '../../ui/PieChartComponent';
import Error from '../../ui/Error';
import Spinner from '../../ui/Spinner';
import calculateMedianDistanceBetweenDates from '../../utils/helpers/calculateMedianDistanceBetweenDates';
import { findItemWithMostOccurrences } from '../../utils/helpers/findItemWithMostOccurrences';
import Stat from './Stat';

function StatsPrenotazioni() {
  const { prenotazioniPassate, error, isLoading, sedi, barbieri, servizi } =
    usePrenotazioniPassate();

  const { itemWithMostOccurences: preferredBarber } =
    findItemWithMostOccurrences(prenotazioniPassate, barbieri, 'id_barber');
  const { itemWithMostOccurences: preferredBarbershop } =
    findItemWithMostOccurrences(prenotazioniPassate, sedi, 'id_sede');

  const { occurances: occurencesServizi } = findItemWithMostOccurrences(
    prenotazioniPassate,
    servizi,
    'id_servizio',
  );
  if (isLoading) {
    return (
      <div className="flex h-[400px] w-full flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  } else if (error) {
    return (
      <div className="flex h-[500px]  w-[1100px] flex-col items-center justify-center">
        <Error error={'Impossibile caricare le statistiche!'} />;
      </div>
    );
  } else {
    return prenotazioniPassate.length !== 0 ? (
      <div className="grid w-full grid-cols-[30%_auto_25%] grid-rows-[80px_80px_250px] justify-items-center gap-2">
        <Stat label="Barbiere preferito" className={'col-span-1 row-span-full'}>
          <img
            src={preferredBarber?.image}
            alt="Logo"
            className="h-[350px] rounded-lg"
          />
          <span className="font-semibold capitalize">
            {preferredBarber.nome} {preferredBarber.cognome}
          </span>
        </Stat>
        <Stat
          className=" col-span-1 row-span-3"
          label="Servizi piu' utilizzati"
        >
          <PieChartComponent
            data={servizi
              .map((servizio) => ({
                name: servizio.nome,
                value: occurencesServizi.get(servizio.id),
                colore: servizio.colore,
              }))
              .filter((servizio) => servizio.value !== 0)}
          />
        </Stat>
        <Stat
          label="Distanza media tra appuntamenti"
          className={'col-span-1 row-span-1 justify-items-center '}
        >
          <span>
            {prenotazioniPassate.length > 1
              ? Math.round(
                  calculateMedianDistanceBetweenDates(
                    prenotazioniPassate.map(
                      (prenotazione) => prenotazione.data,
                    ),
                  ),
                ) + ' giorni'
              : 'Non hai abbastanza prenotazioni passate per il calcolo.'}
          </span>
        </Stat>
        <Stat label="Prezzo medio pagato" className={'col-span-1 row-span-1'}>
          <span>
            €
            {(
              prenotazioniPassate
                .map(
                  (prenotazione) =>
                    servizi[prenotazione.id_servizio - 1].prezzo,
                )
                .reduce((total, curr) => (total += curr), 0) /
              prenotazioniPassate.length
            ).toFixed(2)}
          </span>
        </Stat>
        <Stat label="Sede preferita" className={'flex flex-col items-center'}>
          <img
            src={preferredBarbershop.foto}
            alt="sedePreferita"
            className="h-53 rounded-lg"
          />
        </Stat>
      </div>
    ) : (
      <div className="flex h-full w-full flex-col items-center py-4">
        <h1 className="text-2xl">
          Non hai abbastanza prenotazioni per il calcolo delle statistiche 😓
        </h1>
      </div>
    );
  }
}

export default StatsPrenotazioni;
