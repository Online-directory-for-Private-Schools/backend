import { Router } from "express";
import getCountriesController from "../../controllers/address/getCountries.controller";
import getProvincesController from "../../controllers/address/getProvinces.controller";
import getCitiesController from "../../controllers/address/getCities.controller";

const router = Router();

router.get("/countries", getCountriesController);

router.get("/provinces/:countryId", getProvincesController);

router.get("/cities/:provinceId", getCitiesController);

export { router as AddressesRouter };
