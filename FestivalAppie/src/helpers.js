// // helpers.js

// export const isMarkerInFavorites = (marker, favorites) => {
//   return favorites.some((favMarker) => favMarker.title === marker.title);
// };

// const addToFavorites = (marker) => {
//   if (!isMarkerInFavorites(marker)) {
//     setFavorites([...favorites, marker]);
//   }
// };

// const removeFromFavorites = (marker) => {
//   setFavorites(
//     favorites.filter((favMarker) => favMarker.title !== marker.title)
//   );
// };

export const isMarkerInFavorites = (marker, favorites) => {
  console.log(marker.title, "is in de favorieten");
  return favorites.includes(marker.title);
};

export const addToFavorites = (favorites, marker) => {
  const updatedFavorites = [...favorites, marker];
  console.log("hij word gepusht");
  favorites.push(marker);
  console.log("hij is gepusht");

  console.log("New Favorites:", updatedFavorites); // Add this line
  return updatedFavorites;
};

// export const removeFromFavorites = (favorites, marker) => {
//   const updatedFavorites = favorites.filter(
//     (favMarker) => favMarker.title !== marker.title
//   );
//   //   console.log("New Favorites:", updatedFavorites); // Add this line
//   return updatedFavorites;
// };

export const removeFromFavorites = (favorites, marker) => {
  const index = favorites.findIndex(
    (favMarker) => favMarker.title === marker.title
  );

  if (index > -1) {
    const updatedFavorites = [...favorites];
    updatedFavorites.splice(index, 1);
    return updatedFavorites;
  }

  return favorites;
};
