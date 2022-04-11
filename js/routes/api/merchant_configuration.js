import express from 'express';

import { MerchantRepo } from '../../repo/index.js';

const router = express.Router();

/* GET Merchant Info */
router.get('/', (req, res, next) => {
  res.send('Get Merchant Info');
});

/* POST Set Merchant Configuration */
router.post('/', async (req, res, next) => {
  const { data } = req.body;
  // cents to dollars
  const min_amount = data.minimum_loan_amount / 100.0;
  const max_amount = data.maximum_loan_amount / 100.0;
  
  let merchant_conf = null;
  if (!data.merchant_id) {
    res.status(400).send({
      field: 'merchant_id',
      message: 'Could not find that merchant.',
    });
  } else {
    merchant_conf = await MerchantRepo.get_merchant_configuration(data.merchant_id);
  }

  if (!merchant_conf) {
    res.status(400).send({
      field: 'merchant_id',
      message: 'Could not find that merchant.',
    });

  } else if (min_amount < 0 || max_amount < 0 || min_amount >= max_amount) {
    res.status(400).send({
      field: ['min_amount', 'max_amount'],
      message: "Input is incorrect"
      });

  } else {

    try {
        await merchant_conf.update({
          minimum_loan_amount: min_amount,
          maximum_loan_amount: max_amount,
          prequal_enabled: data.prequal_enabled,
        });
        res.status(200).send({
          minimum_loan_amount: min_amount,
          maximum_loan_amount: max_amount,
          prequal_enabled: data.prequal_enabled, 
          merchant_id: data.merchant_id         
        });
      }

    catch (err) {
          res.status(400).send({message: `Input is incorrect: ${err}`});
      } 
    } 
    const merchant = await MerchantRepo.get_merchant_configuration(data.merchant_id);
  });


export default router;