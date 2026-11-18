import { TextInput, type TextInputProps } from "react-native";

export function Input({ className = "", ...props }: TextInputProps & { className?: string }) {
  return (
    <TextInput
      placeholderTextColor="#71717a"
      className={`bg-zinc-800 text-white rounded-lg px-3 py-2 ${className}`}
      {...props}
    />
  );
}
