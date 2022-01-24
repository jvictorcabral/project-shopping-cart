const fetchProducts = async () => {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  try {
    const retorno = await fetch(url);
    const resposta = await retorno.json();
    return resposta;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
