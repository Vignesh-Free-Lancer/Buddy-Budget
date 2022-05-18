import _ from "lodash";

export const Paginate = (listItems, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(listItems).slice(startIndex).take(pageSize).value();
};
