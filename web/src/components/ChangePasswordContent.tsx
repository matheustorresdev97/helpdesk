import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

type ChangePasswordContentProps = {
  onBack: () => void;
};

export function ChangePasswordContent({ onBack }: ChangePasswordContentProps) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <div>
      <h2 className="font-bold text-lg mb-4 flex items-center gap-4">
        <svg
          onClick={onBack}
          width="18"
          height="18"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer text-gray-300 hover:text-gray-100"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.9428 5.72378C17.4635 6.24448 17.4635 7.0887 16.9428 7.60939L9.8856 14.6666H25.3333C26.0697 14.6666 26.6666 15.2635 26.6666 15.9999C26.6666 16.7363 26.0697 17.3333 25.3333 17.3333H9.8856L16.9428 24.3904C17.4635 24.9111 17.4635 25.7554 16.9428 26.2761C16.4221 26.7968 15.5779 26.7968 15.0572 26.2761L5.72384 16.9427C5.20314 16.422 5.20314 15.5778 5.72384 15.0571L15.0572 5.72378C15.5779 5.20308 16.4221 5.20308 16.9428 5.72378Z"
            fill="currentColor"
          />
        </svg>
        Alterar Senha
      </h2>

      <div className="border-b border-gray-500 w-[calc(100%+48px)] -ml-6 mb-5"></div>

      <form>
        <div className="mb-10 flex flex-col gap-4">
          <Input
            legend="Senha Atual"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            required
            legend="Nova Senha"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label className="text-gray-400 font-lato text-xs italic -mt-3">
            Mínimo de 6 dígitos
          </label>
        </div>

        <div className="border-b border-gray-500 w-[calc(100%+48px)] -ml-6 mt-6 mb-5"></div>

        <div className="flex justify-end mt-4 gap-2">
          <Button type="submit" className="mx-auto block mt-4">
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
}
