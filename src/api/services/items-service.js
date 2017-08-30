const items = {
  listItems :function () {
    return ("TODO: list all items in database");
  },
  checkItem : function(itemId) {
    return ("TODO: check item with Id=" + itemId + " info in stores and update in database ");
  },
  saveItem : function (item) {
    return ("TODO: save item " + item.name + " in database ");
  },
  getItem : function (item) {
    return ("TODO: get item " + item + " info from database ");
  }
}

module.exports = items;
