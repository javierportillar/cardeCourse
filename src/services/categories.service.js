const {database} = require('../database/database');

class CategoriesService {

  async checkCategories(ids){
    const SQLids = ids.join(',')
    const result = await database.getRows(`SELECT id FROM categories WHERE id IN(${SQLids})`);
    
    return result.length === ids.length; // ESTO ES DE CRACKS, DE PROS.

    // if (result.length === ids.lenght){
    //   return true;
    // }
    // return false;
  }
}

const categoriesService = new CategoriesService();

module.exports = {categoriesService};