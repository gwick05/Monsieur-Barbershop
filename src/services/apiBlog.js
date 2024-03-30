import supabase from './supabase';

export async function getPosts() {
  const { data: posts, error } = await supabase
    .from('blog-posts')
    .select('*,autori (*)');
  if (error) {
    throw new Error('Impossibile caricare gli articoli!');
  }

  return posts;
}
