import supabase from './supabase';

export async function getShop() {
  let { data, error } = await supabase.from('shop').select('*');
  if (error) {
    throw new Error('Impossibile caricare il negozio online!');
  }

  return data;
}
