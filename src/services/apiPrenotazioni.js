import supabase from './supabase';

const currentDate = new Date();
const isoCurrentDate = currentDate.toISOString();
const currentFormattedTime = currentDate.toTimeString().slice(0, 8);

export async function getBarbers() {
  const { data: barbers, error } = await supabase.from('barbers').select('*');
  if (error) {
    throw new Error('Impossibile caricare barbieri!');
  }

  return barbers;
}

export async function getAlreadyTakenSlotsForDate(barberId, date) {
  const { data: alreadyTakenSlots, error } = await supabase
    .from('prenotazioni')
    .select('*')
    .eq('data', date)
    .eq('id_barber', barberId);
  if (error) {
    throw new Error('Impossibile caricare resto appuntamenti!');
  }
  return alreadyTakenSlots;
}

export async function getServizi() {
  const { data: servizi, error } = await supabase.from('servizi').select('*');
  if (error) {
    throw new Error('Impossibile caricare servizi!');
  }
  return servizi;
}

export async function getPrenotazioneAttuale(idUser) {
  const { data, error } = await supabase
    .from('prenotazioni')
    .select('*,servizi (nome), sedi (nome,via), barbers (nome,cognome,image)')
    .eq('id_client', idUser)
    .gte('data', isoCurrentDate);

  if (error) {
    throw new Error('Impossibile caricare la appuntamento attuale!');
  }
  return data;
}

export async function getPrenotazioniPassate(idUser) {
  const { data, error } = await supabase
    .from('prenotazioni')
    .select('*,servizi (*), sedi (*), barbers (*)')
    .eq('id_client', idUser)
    .lte('data', isoCurrentDate);

  if (error) throw new Error('Impossibile caricare appuntamenti passati!');

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const isCurrentDatePresent = data.some((prenotazione) => {
    const dataPrenotazione = new Date(prenotazione.data);
    dataPrenotazione.setHours(0, 0, 0, 0);
    return now.getTime() === dataPrenotazione.getTime();
  });

  if (isCurrentDatePresent) {
    const prenotazioneOggi = data.find((prenotazione) => {
      const dataPrenotazione = new Date(prenotazione.data);
      dataPrenotazione.setHours(0, 0, 0, 0);
      return now.getTime() === dataPrenotazione.getTime();
    });

    const ePassata = prenotazioneOggi.orarioFine < currentFormattedTime;
    return ePassata
      ? data
      : data.filter((prenotazione) => prenotazione.id !== prenotazioneOggi.id);
  } else {
    return data;
  }
}

export async function deletePrenotazione(userId, prenotazioneId) {
  const { error } = await supabase
    .from('prenotazioni')
    .delete()
    .eq('id_client', userId)
    .eq('id', prenotazioneId);
  if (error) {
    throw new Error('Impossibile cancellare appuntamento attuale!');
  }
}

export async function createNewAppointment(newAppointment) {
  const { error } = await supabase
    .from('prenotazioni')
    .insert([{ ...newAppointment }])
    .select();

  if (error) {
    throw new Error('Impossibile prenotare!');
  }
}
