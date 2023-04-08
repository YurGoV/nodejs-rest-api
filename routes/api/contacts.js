const express = require('express');

const router = express.Router();

const {
  getContactsContr,
  getContactByIdContr,
  addContactContr,
  deleteContactContr,
  patchContactContr,
  updateFavoriteContactContr,
} = require('../../Controllers');

const {
  addContactValidateMwr,
  updateContactValidateMwr,
  updateFavoriteValidateMwr,
  authMwr,
  checkContactIdMwr,
} = require('../../middlewars');

router.use(authMwr);

router.use('/:contactId', checkContactIdMwr);

router.get('/', getContactsContr);

router.get('/:contactId', getContactByIdContr);

router.post('/', addContactValidateMwr, addContactContr);

router.delete('/:contactId', deleteContactContr);

router.patch('/:contactId', updateContactValidateMwr, patchContactContr);

router.patch(
  '/:contactId/favorite/',
  updateFavoriteValidateMwr,
  updateFavoriteContactContr
);

module.exports = router;
