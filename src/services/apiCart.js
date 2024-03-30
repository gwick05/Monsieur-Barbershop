import supabase from './supabase';

export async function getCart(userId) {
  const { data: cart, error } = await supabase
    .from('carts')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    throw new Error('Impossibile caricare il carrello!');
  }

  return cart;
}

export async function setCart(cart, userId) {
  const { error } = await supabase
    .from('carts')
    .update({ cart: cart })
    .eq('user_id', userId);

  if (error) {
    throw new Error('Impossibile caricare il carrello!');
  }
}

export async function getSpedizioni() {
  const { data: spedizioni, error } = await supabase
    .from('spedizioni')
    .select('*');

  if (error) {
    throw new Error('Impossibile caricare il carrello!');
  }

  return spedizioni;
}
