import supabase from './supabase';

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}
export async function signup(newUser) {
  const { error } = await supabase.auth.signUp({
    email: newUser.email,
    password: newUser.password,
    options: {
      data: {
        nome: newUser.nome,
        cognome: newUser.cognome,
        numero: newUser.telefono,
      },
    },
  });
  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updatePassword(newPassword) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw new Error(error.message);
}

export async function updateUser(updatedUser) {
  const { error } = await supabase.auth.updateUser({
    data: {
      nome: updatedUser.nome,
      cognome: updatedUser.cognome,
      numero: updatedUser.numero,
    },
  });
  if (error) throw new Error(error.message);
}
