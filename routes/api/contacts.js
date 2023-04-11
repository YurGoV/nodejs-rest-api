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

// /**
//  * @swagger
//  * components:
//  *   securitySchemes:
//  *     bearerAuth:            # arbitrary name for the security scheme
//  *       type: http
//  *       scheme: bearer
//  *       bearerFormat: JWT   
//  */

/**
 * @swagger:
 * components:
 *   securitySchemes:
 *     bearerAuth:            # arbitrary name for the security scheme
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT 
 */

/**
 * @swagger
 * /api/contacts/:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     description: Get contacts
 * 
 *     responses:
 *       200:
 *         description: Returns contacts with default per/pages.
 */
router.get('/', getContactsContr);

router.use('/:contactId', checkContactIdMwr);

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
