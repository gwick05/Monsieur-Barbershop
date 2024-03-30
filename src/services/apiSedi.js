import supabase from './supabase';
export async function getSedi() {
  const { data: sedi, error } = await supabase.from('sedi').select('*');
  if (error) throw new Error('Impossibile caricare le sedi!');
  return sedi;
}
