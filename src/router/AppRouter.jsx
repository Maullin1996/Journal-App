import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";

export const AppRouter = () => {
    
    return (
        <Routes>
            {/* Login y Registro */}
            <Route path="/auth/*" element={ <AuthRoutes /> }/>

            {/* JournalApp */}
            <Route path="/*" element={ <JournalRoutes /> } />

        </Routes>
    );
}
// al tener separados el journal y login nos va a permitir 
// tener rutas directamente en cada componete
