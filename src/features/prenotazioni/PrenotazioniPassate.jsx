import { useState } from 'react';
import { usePrenotazioniPassate } from './usePrenotazioniPassate';
import PrenotazionePassata from './PrenotazionePassata';
import Filter from '../../ui/Filter';
import Sort from '../../ui/Sort';
import Error from '../../ui/Error';
import Spinner from '../../ui/Spinner';

function PrenotazioniPassate() {
  const [currOpen, setCurrOpen] = useState(null);
  function open(id) {
    if (currOpen === id) setCurrOpen(null);
    else setCurrOpen(id);
  }
  const { isLoading, error, noPastAppointments, sedi, prenotazioniPassate } =
    usePrenotazioniPassate();

  if (isLoading) {
    return (
      <div className="flex h-[400px] w-full flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  } else if (error) {
    return (
      <div className="flex h-[500px]  w-[1100px] flex-col items-center justify-center">
        <Error error={'Impossibile caricare prenotazioni passate!'} />;
      </div>
    );
  } else if (noPastAppointments) {
    return <h1 className="text-2xl">Non hai prenotazione passate 😓</h1>;
  } else {
    return (
      <div className="w-full">
        <div className="flex h-10 w-full items-center justify-end gap-4">
          <Filter
            options={sedi.map((sede) => {
              return {
                filter: sede.id,
                option: sede.nome,
              };
            })}
            filterBy={'filterSedi'}
          />

          <Sort
            options={[
              { value: 'recenti', label: "prenotazioni piu' recenti" },
              { value: 'meno-recenti', label: 'prenotazioni meno recenti' },
            ]}
          />
        </div>
        <ul className=" flex h-full w-full flex-col gap-8">
          {prenotazioniPassate.map((prenotazione, i) => (
            <PrenotazionePassata
              prenotazione={prenotazione}
              key={prenotazione.data}
              onOpen={open}
              currOpen={currOpen}
              index={i}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default PrenotazioniPassate;
