import { Router } from "express";
import { requireAuth } from "../../middlewares/auth/requireAuth.middleware";
import getCountriesController from "../../controllers/address/getCountries.controller";
import getProvincesController from "../../controllers/address/getProvinces.controller";
import getCitiesController from "../../controllers/address/getCities.controller";

const router = Router();

router.use(requireAuth);

router.get("/countries", getCountriesController);

router.get("/provinces/:countryId", getProvincesController);

router.get("/cities/:provinceId", getCitiesController);

export { router as AddressesRouter };
