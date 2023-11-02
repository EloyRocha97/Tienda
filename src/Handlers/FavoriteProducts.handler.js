const { User } = require("../db");

const toggleFavorite = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Convierte el array favorite a un conjunto
    const favoriteSet = new Set(user.favorite);
    if (favoriteSet) {
      // Si el producto ya está en favoritos, quítalo
      favoriteSet.add(productId);
    }

    // Convierte el conjunto de vuelta a un array antes de guardar en la base de datos
    user.favorite = Array.from(favoriteSet);

    await user.save();

    res.status(200).json({ message: "Favorite updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeFromFavorites = async (req, res) => {
  try {
    const { productId, userId } = req.params;
    // Busca al usuario por su ID
    const user = await User.findOne({
      where: { id: userId },
    });
    // Verifica si el usuario existe
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    // Elimina el producto favorito del array de productos favoritos del usuario
    const updatedFavorites = user.favorite.filter(
      (favoriteId) => favoriteId !== parseInt(productId)
    );
    // Actualiza la lista de productos favoritos del usuario en la base de datos
    user.favorite = updatedFavorites;
    await user.save();
    res.json({ message: "Producto eliminado de favoritos correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  toggleFavorite,
  removeFromFavorites,
};
