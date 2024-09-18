import { LogoTractian } from "../../../assets/LOGO TRACTIAN";
import { LoginForm } from "../../forms/Login";

export function Login() {
    return (
        <div className="flex flex-col gap-6 items-center justify-center w-full h-screen bg-[#17192D]">
            <div className="bg-slate-50 p-8 flex flex-col gap-3 rounded-md items-center">
                <LogoTractian color="#17192D" />
                <LoginForm />
            </div>
        </div>
    );
}
