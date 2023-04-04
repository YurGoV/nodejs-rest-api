const { Contacts } = require('../db/contactsModel');

const countContactsServ = async (owner, favoriteArr) => {
  try {
    return await Contacts.countDocuments({ owner, favorite: favoriteArr });
  } catch (err) {
    return err.message;
  }
};

const listContactsServ = async (owner, favoriteArr, { skip, limit }) => {
  try {
    const data = await Contacts.find({ owner, favorite: favoriteArr })
      .select({ __v: 0, owner: 0 })
      .skip(skip)
      .limit(limit);
    return data;
  } catch (err) {
    return err.message;
  }
};

const listContactByIdServ = async (contactId, owner) => {
  try {
    const data = await Contacts.findOne({ _id: contactId, owner });
    return data;
  } catch (err) {
    return err.message;
  }
};

const postContactServ = (body) => {
  try {
    return Contacts.create(body);
  } catch (err) {
    return err.message;
  }
};

const removeContactServ = async (contactId, owner) => {
  try {
    const contact = await Contacts.findOneAndRemove({ _id: contactId, owner });
    if (!contact) {
      return { statusCode: 404, message: 'Not found' };
    }
    return { statusCode: 200, message: 'contact deleted' };
  } catch (err) {
    return err.message;
  }
};

const updateContactServ = (contactId, owner, body) => {
  try {
    return Contacts.updateOne({ _id: contactId, owner }, body);
  } catch (err) {
    return err.message;
  }
};

const updateFavoriteServ = (contactId, owner, body) => {
  try {
    return Contacts.updateOne({ _id: contactId, owner }, body);
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  listContactsServ,
  listContactByIdServ,
  postContactServ,
  removeContactServ,
  updateContactServ,
  updateFavoriteServ,
  countContactsServ,
};
