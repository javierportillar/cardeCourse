const { database } = require("../database/database");

class CategoriesService {
  async getAllCategories() {
    return await database.getRows("SELECT * FROM categories");
  }

  async getCategoryById(id) {
    const categorie = await database.getRow(
      `SELECT * FROM categories WHERE id=${id} limit 1`
    );
    return categorie;
  }

  async checkCategories(ids) {
    const SQLids = ids.join(",");
    const result = await database.getRows(
      `SELECT id FROM categories WHERE id IN(${SQLids})`
    );

    return result.length === ids.length; // ESTO ES DE CRACKS, DE PROS.

    // if (result.length === ids.lenght){
    //   return true;
    // }
    // return false;
  }
}

const categoriesService = new CategoriesService();

module.exports = { categoriesService };
