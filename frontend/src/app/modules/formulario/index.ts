import Loadable from "@common/ui-component/Loadable";
import { lazy } from "react";

const FormularioModule = Loadable(lazy(() => import("./formulario-routing.tsx")));

export default FormularioModule;