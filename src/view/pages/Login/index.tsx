import { LogoTractian } from "../../../assets/LOGO TRACTIAN";
import { LoginForm } from "../../forms/Login";

export function Login() {
    return (
        <div className="flex flex-col gap-6 items-center justify-center w-full h-screen bg-[#17192D]">
            <LogoTractian />
            <LoginForm />
        </div>
    );
}
