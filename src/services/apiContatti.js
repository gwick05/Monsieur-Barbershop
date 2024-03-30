import supabase from './supabase';

export async function getContatti() {
  const { data: contatti, error } = await supabase.from('contatti').select('*');
  if (error) throw new Error('Impossibile caricare i contatti!');

  return contatti;
}
