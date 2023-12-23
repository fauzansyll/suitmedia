export async function getIdeas() {
    const apiUrl = 'https://suitmedia-backend.suitdev.com/api/ideas';
  
    const params = new URLSearchParams({
      'page[number]': 1,
      'page[size]': 10,
      append: ['small_image', 'medium_image'],
      sort: '-published_at',
    });
  
    const response = await fetch(`${apiUrl}?${params.toString()}`);
    const data = await response.json();
  
    return data;
  }
  