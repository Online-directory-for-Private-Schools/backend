import { Router } from "express";
import { requireAuth } from "../../middlewares/auth/requireAuth.middleware";
import getLevelsController from "../../controllers/schoolModules/getLevels.controller";
import getSchoolYearsController from "../../controllers/schoolModules/getSchoolYears.controller";
import getModulesController from "../../controllers/schoolModules/getModules.controller";
import getHighschoolSpecialitiesController from "../../controllers/schoolModules/getHighShoolSpeciaities.controller";

const router = Router();

router.use(requireAuth);

router.get("/levels/", getLevelsController);
router.get("/years/:levelId", getSchoolYearsController);
router.get("/modules/:yearId", getModulesController);
router.get("/hs-specs/", getHighschoolSpecialitiesController);

export { router as SchoolModulesRouter };
