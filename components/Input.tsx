import { FC, ChangeEvent } from "react";

interface InputProps {
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  type?: string;
}

const Input: FC<InputProps> = ({ id, onChange, type, value, label }) => {
  return (
    <div className="relative">
      <input
        id={id}
        value={value}
        type={type}
        onChange={onChange}
        className="text-md text-md peer block w-full appearance-none rounded-md bg-neutral-700 px-6 pb-1 pt-6 text-white focus:border-transparent focus:outline-none focus:ring-0"
        placeholder=" "
      />
      <label
        className="text-md absolute left-6 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-zinc-500 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
