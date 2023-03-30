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
    addPostValidateMwr,
    updatePostValidateMwr,
    updateFavoriteValidateMwr,
    authMwr,
} = require('../../middlewars');

router.use(authMwr);


router.get('/', getContactsContr);

router.get('/:contactId', getContactByIdContr);

router.post('/', addPostValidateMwr, addContactContr);

router.delete('/:contactId', deleteContactContr);

router.patch('/:contactId', updatePostValidateMwr, patchContactContr);

router.patch('/:contactId/favorite/', updateFavoriteValidateMwr, updateFavoriteContactContr);

module.exports = router;
