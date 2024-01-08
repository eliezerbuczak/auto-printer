import * as videoController from "../controller/machineController.js";

const router = createRouter();

router.get("/machines", defineEventHandler(videoController.searchMachine));
router.post("/machines", defineEventHandler(videoController.saveMachine));

export default useBase("/api", router.handler);