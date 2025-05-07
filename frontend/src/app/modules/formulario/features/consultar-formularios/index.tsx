import Loadable from "@common/ui-component/Loadable";
import { lazy } from "react";

const ConsultarFormularios = Loadable(lazy(() => import("./pagina.tsx")));

export default ConsultarFormularios;