## Endpoint `Set Merchant Configuration` 

This endpoint .../api/merchant_config allows a merchant to set up their merchant configuration. 

1. In order to configure, the merchant needs to provide:
    - `minimum_loan_amount`, the minimum amount a user can get a loan for (in cents)
    - `maximum_loan_amount`, the maximum amount a user can get a loan for (in cents)
    - `prequal_enabled`, a boolean indicating if the Prequal feature will be enabled for that merchant

2. Upon success, the configs is saved to a MerchantConfiguration “data table” in the in-memory storage and the endpoint returns a 200.

3. Upon failure, returns a 400 if the given request’s merchant_id does not exist in the in-memory storage.

4. The endpoint returns a 400, if provided data is not complete or valid. 

5. Unit tests for various edge cases provided:
``__tests__/merchant_configuration.js.`` 
To run the tests: ``jest``

6. To implement this endpoint I added some new fields to a MerchantConfiguration Model (minimum_loan_amount, maximum_loan_amount, prequal_enabled). Some input validation is added to the route, but to make this validation more robust I think it whould be useful to use some additional library for validation (like "jsonschema"). 





