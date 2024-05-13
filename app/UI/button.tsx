interface ButtonProps {
  children: React.ReactNode;
  type: "button" | "submit";
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type,
  onClick,
  className,
}) => {
  return (
    <button type={type} onClick={onClick} className={`${className}`}>
      {children}
    </button>
  );
};
