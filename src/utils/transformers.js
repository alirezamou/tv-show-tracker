export const mergeShowData = function (dataToMerge, showsFromApi) {
  showsFromApi.forEach((show) => {
    let id = show.show.id;
    let showImage = show.show?.image?.medium;
    let showName = show.show.name;
    let showNetwork = show.show?.network;
    dataToMerge.push({ id, showImage, showName, showNetwork });
  });
};
